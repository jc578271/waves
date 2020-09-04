import React, {useEffect} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import { getProductBySell, getProductByArrival } from '../../actions/product_action'

import HomeSlider from './home_slider'
import HomePromotion from './home_promotion'
import CardBlock from '../utils/card_block'

const Home = (props) => {
    useEffect(() => {
        // ?sortBy=sold&order=desc&limit=100
        props.dispatch(getProductBySell())
        props.dispatch(getProductByArrival())
    }, [])

    return (
        <div>
            <HomeSlider/>
            <CardBlock
                list={props.products.bySell}
                title="Best Selling guitars"
            />
            <HomePromotion/>
            <CardBlock
                list={props.products.byArrival}
                title="New arrivals"
            />
        </div>
    )
}

const mapStateToProps = (state) => ({
    products: state.products
})

export default connect(mapStateToProps)(Home)
