import React from 'react'
import { Link } from 'react-router-dom'
import Img from '../Ui/Image'
import classes from './Product.module.css'

const Product = ({ product, order }) => {
    return (
        <div className={classes.rowProduct}>
            <div className={classes.Pdetaile}>
                <span>
                    {order}
                </span>
                <Img src={product.images[0].url} />
                <p>{product.name}</p>
            </div>
            <Link to={`/products/${product._id}`}>
                عرض المنتح
            </Link>
        </div>
    )
}

export default Product