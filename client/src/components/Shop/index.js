import React, { useState, useEffect } from 'react'
import PageTop from '../utils/page_top'

import { frets, price } from '../utils/form/fixed_categories'

import { connect } from 'react-redux'
import { getProductsToShop ,getBrands, getWoods } from '../../actions/product_action'

import CollapseCheckbox from '../utils/collapseCheckbox'
import CollapseRadio from '../utils/collapseRadio'

import LoadmoreCard from './loadMoreCards'

const Shop = (props) => {
    const [state, setState] = useState({
        grid: '',
        limit: 6,
        skip: 0,
        filters: {
            brand: [],
            frets: [],
            wood: [],
            price: []
        }
    })

    useEffect(() => {
        props.dispatch(getBrands())
        props.dispatch(getWoods())

        props.dispatch(getProductsToShop(state.skip, state.limit, state.filters))
    }, [])

    const handlePrice = (value) => {
        const data = price
        let array = []

        for(let key in data) {
            if(data[key]._id === parseInt(value, 10)) {
                array = data[key].array
            }
        }

        return array
    }

    const showFilteredResults = (filters) => {
        props.dispatch(getProductsToShop(0, state.limit, filters))
        .then(() => {
            setState({
                skip: 0
            })
        })

    }

    const handleFilters = (filters, category) => {
        const newFilters = { ...state.filters }
        newFilters[category] = filters

        if(category === 'price') {
            let priceValues = handlePrice(filters)
            newFilters[category] = priceValues
        }

        showFilteredResults(newFilters)
        setState({
            filters: newFilters
        })
    }

    const loadMoreCards = () => {
        let skip = state.skip + state.limit

        props.dispatch(getProductsToShop(skip, state.limit, state.filters, props.products.toShop))
        .then(() => {
            setState({
                skip
            })
        })
    }

    return (
        <div>
            <PageTop
                title="Browse Products"
            />
            <div className="container">
                <div className="shop_wrapper">
                    <div className="left">
                        <CollapseCheckbox
                            initState={true}
                            title="Brands"
                            list={props.products.brands}
                            handleFilters={(filters) => handleFilters(filters, 'brand')}
                        />
                        <CollapseCheckbox
                            initState={false}
                            title="Frets"
                            list={frets}
                            handleFilters={(filters) => handleFilters(filters, 'frets')}
                        />
                        <CollapseCheckbox
                            initState={true}
                            title="Woods"
                            list={props.products.woods}
                            handleFilters={(filters) => handleFilters(filters, 'wood')}
                        />
                        <CollapseRadio
                            initState={true}
                            title="Price"
                            list={price}
                            handleFilters={(filters) => handleFilters(filters, 'price')}
                        />
                    </div>
                    <div className="right">
                        <div className="shop_options">
                            <div className="shop_grids clear">
                                grids
                            </div>
                        </div>
                        <div>
                            <LoadmoreCard
                                grid={state.grid}
                                limit={state.limit}
                                size={props.products.toShopSize}
                                products={props.products.toShop}
                                loadMore={() => {loadMoreCards()}}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    products: state.products
})

export default connect(mapStateToProps)(Shop)
