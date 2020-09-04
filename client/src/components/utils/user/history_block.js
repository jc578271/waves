import React from 'react'
import moment from 'moment'

const UserHistoryBlock = (props) => {

    const renderBlock = () => (
        props.products ?
            props.products.map((product, i) => (
                <tr key={i}>
                    <td>{moment(product.dateofPurchase).format("MM-DD-YYYY")}</td>
                    <td>{product.brand} - {product.name}</td>
                    <td>$ {product.price}</td>
                    <td>{product.quantity}</td>
                </tr>
            ))
        :null
    )

    return (
        <div className="history_blocks">
            <table>
                <thead>
                    <tr>
                        <th>Date of purchase</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {renderBlock()}
                </tbody>
            </table>
        </div>
    )
}

export default UserHistoryBlock
