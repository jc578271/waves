import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { logoutUser } from '../../actions/user_action'

const Header = (props) => {
    const [state, setState] = useState({
        page: [
            {
                name: 'Home',
                linkTo: '/',
                public: true
            },
            {
                name: 'Guitars',
                linkTo: '/shop',
                public: true
            }
        ],
        user: [
            {
                name: 'My Cart',
                linkTo: '/user/cart',
                public: false
            },
            {
                name: 'My Account',
                linkTo: '/user/dashboard',
                public: false
            },
            {
                name: 'Log in',
                linkTo: '/register_login',
                public: true
            },
            {
                name: 'Log out',
                linkTo: '/user/logout',
                public: false
            }
        ]
    })

    const logoutHandler = () => {
        props.dispatch(logoutUser()).then(response => {
            if(response.payload.success) {
                props.history.push('/')
            }
        })
    }
    
    const cartLink = (item, i) => {
        const user = props.user.userData
        
        return (
            <div className="cart_link" key={i}>
                <span>{user.cart ? user.cart.length : 0}</span>
                <Link to={item.linkTo}>
                    {item.name}
                </Link>
            </div>
        )
    }

    const defaultLink = (item, i) => (
        item.name === 'Log out'?
            <div className="log_out_link"
                key={i}
                onClick={() => logoutHandler()}
            >
                {item.name}
            </div>
        :
        <Link to={item.linkTo} key={i}>
            {item.name}
        </Link>
    )

    const showLinks = (type) => {
        let list = []

        if(props.user.userData){
            type.forEach(item => {
                if(!props.user.userData.isAuth) {
                    if(item.public) {
                        list.push(item)
                    }
                } else {
                    if(item.name !== 'Log in') {
                        list.push(item)
                    }
                }
            })
        }

        return list.map((item, i) => {
            if(item.name !== 'My Cart') {
                return defaultLink(item, i)
            } else {
                return cartLink(item, i)
            }
            
        })
    }

    return (
        <header className="bck_b_light">
            <div className="container">
                <div className="left">
                    <div className="logo">WAVES</div>
                </div>
                <div className="right">
                    <div className="top">{showLinks(state.user)}</div>
                    <div className="bottom">{showLinks(state.page)}</div>
                </div>
            </div>
        </header>
    )
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(withRouter(Header))
