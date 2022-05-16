import * as actions from '../actions/actionsTypes'


const intialsatete = {
    products: [],
    totalcount: null,
    error: null,
    loading: false
}

const fetchProductsStart = (state, action) => {
    return {
        ...state,
        loading: true,
        error: null
    }
}
const fetchProductsSuccess = (state, action) => {
    return {
        ...state,
        products: action.isMore ? [...state.products, ...action.data.products] : action.data.products,
        totalcount: action.data.count,
        loading: false,
        error: null
    }
}
const fetchProductsFailed = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.error
    }
}




const ProductsReducer = (state = intialsatete, action) => {
    switch (action.type) {
        case actions.FETCH_PRODUCTS_STARTS: return fetchProductsStart(state, action)
        case actions.FETCH_PRODUCTS_SUCCESS: return fetchProductsSuccess(state, action)
        case actions.FETCH_PRODUCTS_FAILED: return fetchProductsFailed(state, action)
        default:
            return state
    }

}
export default ProductsReducer

