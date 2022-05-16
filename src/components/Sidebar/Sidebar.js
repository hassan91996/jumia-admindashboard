import React from 'react'
import classes from './Sidebar.module.css'
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import HomeIcon from '@mui/icons-material/Home';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className={classes.Sidebar}>
            <div className={classes.MenuHeader}>
                <ManageAccountsIcon />
                <p>لوحة التحكم</p>
            </div>
            <ul className={classes.ControleItems}>
                <li> <NavLink to="/" exact activeClassName={classes.active} ><HomeIcon className={classes.Icon} />الصفحة الرئيسية</NavLink></li>
                <li> <NavLink to="/products" activeClassName={classes.active} ><StorefrontOutlinedIcon className={classes.Icon} />المنتجات</NavLink></li>
                <li> <NavLink to="/categories" activeClassName={classes.active} ><BorderAllIcon className={classes.Icon} />الأقسام</NavLink></li>
                <li> <NavLink to="/orders" activeClassName={classes.active} ><ShoppingBagIcon className={classes.Icon} />الطلبات</NavLink></li>
            </ul>
            <div>
            </div>
        </div>
    )
}

export default Sidebar
 