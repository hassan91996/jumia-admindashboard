import { useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import classes from './Order.module.css'
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import Moment from 'react-moment'
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import OrderPdf from './OrderPdf';



const Order = () => {
    const location = useLocation()
    const history = useHistory()
    const [order, setorder] = useState('')

    useEffect(() => {
        if (location.state.order) {
            setorder(location.state.order)
        } else {
            history.push('/orders')
        }
    }, [location.state, history])



    return (
        <div className={classes.OrderDetailes}>
            <div className={classes.secHeader}>
                <div className={classes.Hcontainer}>
                    <NoteAltIcon style={{ fontSize: "35px" }} />
                </div>
                <p>تفاصيل الطلب</p>
            </div>
            {order &&
                <div className={classes.OrderInfo} id="dd">
                    <h3>
                        معلومات العميل
                    </h3>
                    <p><span>الإسم : </span>{order.CustomerInfo.name}</p>
                    <p><span>العنوان : </span>{order.CustomerInfo.address}</p>
                    <p><span>المدينة : </span>{order.CustomerInfo.city}</p>
                    <p><span>المحافظة : </span>{order.CustomerInfo.Governorate}</p>
                    <p><span>رقم الموبايل : </span>{order.CustomerInfo.phoneNumber}</p>
                    <p><span></span></p>
                    <h3>
                        معلومات الطلب
                    </h3>
                    <p><span>كود الطلب : </span>{order.code}</p>
                    <p><span>تاريخ الطلب : </span>
                        <Moment format="HH:MM YYYY-MM-DD ">
                            {order.createdAt}
                        </Moment></p>
                    <table className={classes.orderproductsTable}>
                        <thead>
                            <tr>
                                <th className={classes.nameHeader}>المنتج</th>
                                <th>الكمية</th>
                                <th>سعر الوحدة</th>
                                <th>المقاس</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                order.orderItems.map((item) =>
                                    <tr key={item._id}>
                                        <td >{item.product.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.price}</td>
                                        <td>{item.size}</td>
                                    </tr>

                                )
                            }
                        </tbody>
                    </table>
                    <p><span>إجمالي سعر المنتجات : </span><b> {order.itemsPrice} </b> ج.م </p>
                    <p><span>رسوم التوصيل : </span>{order.deliveryPrice} ج.م </p>
                    <p><span>السعر الكلي : </span><b>{order.totalPrice}</b> ج.م </p>
                    <p><span>حالة الدفع : </span>{order.isPaid ? <CheckIcon className={classes.CheckIcon} /> : <ClearIcon className={classes.clearIcon} />}</p>
                    {order.paidAt && < p > <span>تاريخ الدفع : </span><Moment format="HH:MM YYYY-MM-DD ">
                        {order.paidAt}
                    </Moment></p>}
                    <p><span>حالة الوصول : </span>{order.isDelivered ? <CheckIcon className={classes.CheckIcon} /> : <ClearIcon className={classes.clearIcon} />}</p>
                    {order.deliveredAt &&
                        <p> <span> تاريخ الوصول : </span><Moment format="HH:MM YYYY-MM-DD ">
                            {order.deliveredAt}
                        </Moment></p>}

                    <OrderPdf order={order} />
                </div>


            }

        </div >
    )
}

export default Order