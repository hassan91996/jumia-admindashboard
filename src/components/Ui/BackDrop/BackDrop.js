import React from 'react'
import classes from './BackDrop.module.css';


const BackDrop = (props) => {
    return (
    props.show?<div className={classes.BackDrop} onClick={props.closeModel}></div>:null
    )
}

export default BackDrop
