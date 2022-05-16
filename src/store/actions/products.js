import axios from '../../axios';
import * as actionsTypes from './actionsTypes';

const fetchProductsStart = () => {
    return {
        type: actionsTypes.FETCH_PRODUCTS_STARTS
    }
}
const fetchProductsSuccess = (data,isMore) => {
    return {
        type: actionsTypes.FETCH_PRODUCTS_SUCCESS,
        data:data,
        isMore:isMore

    }
}
const fetchProductsFailed = (error) => {
    return {
        type: actionsTypes.FETCH_PRODUCTS_FAILED,
        error: error
    }
}


export const fetchProducts = (params,isMore) => {
    return async dispatch => {
        dispatch(fetchProductsStart())
        try {
            let res = await axios.get("/products",{
                params:{...params}
            })
            dispatch(fetchProductsSuccess(res.data,isMore))
        }
        catch (error) {
            dispatch(fetchProductsFailed(error))
        }
    }

}