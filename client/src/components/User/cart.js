import React, { Component } from 'react'
import UserLayout from '../../Hoc/User'
import UserProductBlock from '../utils/user/product_block'
import Paypal from '../utils/paypal'

import { connect } from 'react-redux'
import { getCartItems, removeCartItem, onSuccessBuy } from '../../actions/user_action'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown'
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile'

class UserCart extends Component {
    state = {
        loading: true,
        total: 0,
        showTotal: false,
        showSuccess: false
    }

    componentDidMount(){
        let cartItems = []
        let user = this.props.user

        if(user.userData.cart) {
            if(user.userData.cart.length > 0) {

                user.userData.cart.forEach(item => {
                    cartItems.push(item.id)
                })

                this.props.dispatch(getCartItems(cartItems, user.userData.cart))
                .then(() => {
                    if(this.props.user.cartDetail.length > 0) {
                        this.caculateTotal(this.props.user.cartDetail)
                    }
                })
            }
        }
    }

    caculateTotal = (cartDetail) => {
        let total = 0

        cartDetail.forEach(item => {
            total += parseInt(item.price) * item.quantity
        })

        this.setState({
            total,
            showTotal: true
        })
    }

    removeFromCart = (id) => {
        this.props.dispatch(removeCartItem(id))
        .then(() => {
            if(this.props.user.cartDetail.length <= 0) {
                this.setState({ showTotal: false })
            } else {
                this.caculateTotal(this.props.user.cartDetail)
            }
        })
    }

    showNoItemMessage = () => (
        <div className="cart_no_items">
            <FontAwesomeIcon icon={faFrown}/>
            <div>
                You no have items
            </div>
        </div>
    )

    transactionError = () => {
        console.log('Paypal error')
    }

    transactionCanceled = () => {
        console.log('Transaction canceled')
    }

    transactionSuccess = (data) => {
        this.props.dispatch(onSuccessBuy({
            cartDetail: this.props.user.cartDetail,
            paymentData: data
        })).then(() => {
            if(this.props.user.successBuy) {
                this.setState({
                    showTotal: false,
                    showSuccess: true
                })
            }
        })        
    }

    render() {
        return (
            <UserLayout>
                <h1>Cart</h1>
                <div className="user_cart">
                    <UserProductBlock
                        products={this.props.user}
                        type="cart"
                        removeItem={(id) => this.removeFromCart(id)}
                    />
                    { 
                        this.state.showTotal ?
                            <div className="user_cart_sum">
                                <div>
                                    Total amount: $ {this.state.total}
                                </div>
                            </div>
                        :   
                            this.state.showSuccess ?
                                <div className="cart_success">
                                    <FontAwesomeIcon icon={faSmile}/>
                                    <div>
                                        THANK YOU
                                    </div>
                                    <div>
                                        YOUR ORDER IS NOW COMPLETE
                                    </div>
                                </div>
                            :
                                this.showNoItemMessage()
                    }
                </div>
                {
                    this.state.showTotal ?
                        <div className="paypal_button_container">
                            <Paypal
                                toPay={this.state.total}
                                transactionError={(data) => this.transactionError(data)}
                                transactionCanceled={(data) => this.transactionCanceled(data)}
                                onSuccess={(data) => this.transactionSuccess(data)}
                            />
                        </div>
                    :null
                }
            </UserLayout>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(UserCart)
