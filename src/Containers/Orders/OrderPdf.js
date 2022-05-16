import React from 'react'
import classes from './OrderPdf.module.css'
import Moment from 'react-moment'
import html2pdf from 'html2pdf.js'

const OrderPdf = ({ order }) => {

    const gen = () => {
        const element = document.getElementById('orderPdf');
        element.style.display = 'block'
        const Print = {
            filename: `${order.code}.pdf`,
            html2canvas: { scale: 2 },
            jsPDF: { format: 'a4', orientation: 'portrait' }
        };
        html2pdf().from(element).set(Print).save().then(p =>
            element.style.display = 'none'
        );

    }
    return (
        <div className={classes.PrintOrder}>
            <button onClick={() => gen()}>استخراج فاتورة</button>
            <div className={classes.Pdforder} id={'orderPdf'} >
                <div className={classes.pdfContent}>
                    <h1>فاتورة شراء</h1>
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
                    <p><span>حالة الدفع : </span>{order.isPaid ? <b>تم الدفع</b> : <b> لم  يتم الدفع</b>}</p>
                    {order.paidAt && < p > <span>تاريخ الدفع : </span><Moment format="HH:MM YYYY-MM-DD ">
                        {order.paidAt}
                    </Moment></p>}
                </div >
            </div>


        </div>

    )
}

export default OrderPdf