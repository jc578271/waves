import React, { Component } from 'react'
import PaypalExpressBtn from 'react-paypal-express-checkout'

export class Paypal extends Component {
    render() {

        const onSuccess = (payment) => {
            this.props.onSuccess(payment)
        }

        const onCancel = (data) => {
            console.log(JSON.stringify(data))
        }

        const onError = (err) => {
            console.log(JSON.stringify(err))
        }

        let env = 'sandbox'
        let currency = 'USD'
        let total = this.props.toPay

        const client = {
            sandbox: 'AQJu18ayE_t-P5mDs1R-J-5S9lzz2DTtTYZod5rQXT9GOYw65qoDn1wlWkjFyqG3r7Q0i3ZL_L0RqrpG',
            production: ''
        }

        return (
            <div>
                <PaypalExpressBtn
                    env={env}
                    client={client}
                    currency={currency}
                    total={total}
                    onError={onError}
                    onSuccess={onSuccess}
                    onCancel={onCancel}
                    style={{
                        size: 'large',
                        color: 'blue',
                        shape: 'rect',
                        label: 'checkout'
                    }}
                />
            </div>
        )
    }
}

export default Paypal
