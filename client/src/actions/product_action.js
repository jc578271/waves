import axios from 'axios'
import {
    GET_PRODUCT_BY_SELL,
    GET_PRODUCT_BY_ARRIVAL,
    GET_BRANDS,
    ADD_BRAND,
    GET_WOODS,
    ADD_WOOD,
    GET_PRODUCTS_TO_SHOP,
    ADD_PRODUCT,
    CLEAR_PRODUCT,
    GET_PRODUCT_DETAIL,
    CLEAR_PRODUCT_DETAIL
} from './types'

import { PRODUCT_SERVER } from '../components/utils/misc'

export const getProductDetail = (id) => {

    const request = axios.get(`${PRODUCT_SERVER}/articles_by_id?id=${id}&type=single`)
    .then(response=>{
        return response.data[0]
    });

    return {
        type: GET_PRODUCT_DETAIL,
        payload: request
    }

}


export const clearProductDetail = () => {
    return {
        type: CLEAR_PRODUCT_DETAIL,
        payload:''
    }
}

export const getProductBySell = () => {
    // ?sortBy=sold&order=desc&limit=100
    const request = axios.get(`${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4`)
        .then(response => response.data)

    return {
        type: GET_PRODUCT_BY_SELL,
        payload: request
    }
}

export const getProductByArrival = () => {
    // ?sortBy=sold&order=desc&limit=100
    const request = axios.get(`${PRODUCT_SERVER}/articles?createdAt=sold&order=desc&limit=4`)
        .then(response => response.data)

    return {
        type: GET_PRODUCT_BY_ARRIVAL,
        payload: request
    }
}

export const getProductsToShop = (skip, limit, filters = [], previousState = []) => {
    const data = {
        skip,
        limit,
        filters
    }

    const request = axios.post(`${PRODUCT_SERVER}/shop`, data)
        .then(response => {
            let newState = [
                ...previousState,
                ...response.data.articles
            ]

            return {
                size: response.data.size,
                articles: newState
            }
        })

    return {
        type: GET_PRODUCTS_TO_SHOP,
        payload: request
    }
}

export const addProduct = (datatoSubmit) => {

    const request = axios.post(`${PRODUCT_SERVER}/articles`, datatoSubmit)
        .then(response => response.data);

    return {
        type: ADD_PRODUCT,
        payload: request
    }
}

export const clearProduct = () => {
    return {
        type: CLEAR_PRODUCT,
        payload: ''
    }
}

/////////////////////////////
/////      CATEGORIES
/////////////////////////////

export const addBrand = (dataToSubmit, existingBrands) => {
    const request = axios.post(`${PRODUCT_SERVER}/brand`, dataToSubmit)
        .then(response => {
            let brands = [
                ...existingBrands,
                response.data.brand
            ];
            return {
                success: response.data.success,
                brands
            }
        });
    return {
        type: ADD_BRAND,
        payload: request
    }
}


export const addWood = (dataToSubmit, existingWoods) => {
    const request = axios.post(`${PRODUCT_SERVER}/wood`, dataToSubmit)
        .then(response => {
            let woods = [
                ...existingWoods,
                response.data.wood
            ];
            return {
                success: response.data.success,
                woods
            }
        });
    return {
        type: ADD_WOOD,
        payload: request
    }
}

export const getBrands = () => {
    const request = axios.get(`${PRODUCT_SERVER}/brand`)
        .then(response => response.data)

    return {
        type: GET_BRANDS,
        payload: request
    }
}

export const getWoods = () => {
    const request = axios.get(`${PRODUCT_SERVER}/wood`)
        .then(response => response.data)

    return {
        type: GET_WOODS,
        payload: request
    }
}