import * as actions from './actionsTypes';
import axios from '../../axios';

const authstart = () => {
    return {
        type: actions.AUTH_START
    }
}
const authsucess = (userId, token) => {
    return {
        type: actions.AUTH_SUCCESS,
        userId: userId,
        token: token
    }
} 
const authfaild = (error) => {
    return {
        type: actions.AUTH_FAILED,
        error: error
    }
}

export const Logout = () => {
    localStorage.clear();
    return {
        type: actions.LOGOUT
    }
}
const checkTimeout = (exp) => {
    return dispatch => setTimeout(() => {
        dispatch(Logout)
    }, exp * 1000);
}

export const auth = (userData) => {
    return dispatch => {
        dispatch(authstart());
        axios.post('users/adminlogin',userData).then(res => {
            const expirationDate = new Date(new Date().getTime() + res.data.expirIn * 1000)
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('userId', res.data.user._id)
            localStorage.setItem('expireDate', expirationDate)
            dispatch(authsucess(res.data.user._id, res.data.token))
            dispatch(checkTimeout(res.data.expirIn))
        }).catch(error => {
            dispatch(authfaild(error.response.data))
        })
    }
}

export const authCheck = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(Logout());
        } else {
            const expiredate = new Date(localStorage.getItem('expireDate'))
            if (new Date() >= expiredate) {
                dispatch(Logout());
            }
            else {
                const userId = localStorage.getItem("userId")
                dispatch(authsucess(userId, token))
                dispatch(checkTimeout(((expiredate.getTime()-new Date().getTime())/1000)))
            }
        }
    }
}