import React, { useState } from 'react'
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import classes from './Auth.module.css'
import Input from '../../components/Ui/FormElement/Input'
import useForm from '../../hooks/form-hooks';
import { Redirect } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../../store/actions';
import ErrorLine from '../../components/Errormodel/errorLine'
import Spinner from '../../components/Spinner/Smallspinner';

const Auth = () => {
    const dispatch = useDispatch()
    const Login = (userdata) => dispatch(auth(userdata))
    const IsAuth = useSelector(state => state.auth.token !== null)
    const error = useSelector(state => state.auth.error)
    const loading = useSelector(state => state.auth.loading)
    const [showPassword, setshowPassword] = useState(false)
    const [formState, inputHandler] = useForm(
        {
            email: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            }
        },
        false
    );



    const submitForm = (e) => {
        e.preventDefault()
        const userData = {
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
        }
        Login(userData)
    }





    return (
        <div className={classes.Auth}>
            {IsAuth && <Redirect to="/" />}
            <div className={classes.notes}>
                <h3>Important</h3>
                <p>the app is not responsive</p>
                <p>email : hassan@yahoo.com</p>
                <p>password : hassan22</p>
            </div>
            <div className={classes.AuthContanier}>
                <div className={classes.IconContainer}>
                    <LockIcon style={{ fontSize: '40px' }} />
                </div>
                <p> تسجيل الدخول</p>
                <form onSubmit={submitForm} className={classes.form}>
                    {error && <ErrorLine error={error} />}
                    <Input
                        elementType='input'
                        name="email"
                        type="email"
                        placeholder="البريد الإلكتروني"
                        validators={{ isEmail: true, required: true }}
                        onInput={inputHandler} />
                    <Input
                        elementType='input'
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="كلمة السر "
                        validators={{ minLength: 8, required: true }}
                        onInput={inputHandler}
                        icon={showPassword ? <VisibilityOffIcon className={classes.icon} onClick={() => setshowPassword(false)} /> :
                            <VisibilityIcon className={classes.icon} onClick={() => setshowPassword(true)} />} />
                    {loading ? <Spinner /> :
                        <button disabled={!formState.isValid} >تسجيل الدخول</button>
                    }

                </form>
            </div>
        </div>
    )
}

export default Auth