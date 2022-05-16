import React from 'react'
import classes from './Header.module.css'
import { Link } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout';
const Header = () => {
    return (
        <div className={classes.Header}>
            <Link to="/logout">تسجيل الخروج
                <LogoutIcon  className={classes.outIcon}/></Link>
        </div>
    )
}

export default Header
