import { useEffect, useState } from 'react'
import { useAxios } from '../../hooks/Http-hook'
import classes from './Oldorders.module.css'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import Spinner from '../../components/Spinner/Spinner'
import ErrorModal from '../../components/Errormodel/ErrorModal'

const OldOrders = ({ active, codeFilter }) => {
    const [activeOrders, setactiveOrders] = useState([])
    const { error, response, loading, fetchData } = useAxios()

    useEffect(() => {
        if (!active) {
            fetchData(`/orders?closed=true&code=${codeFilter}`, 'get')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active, codeFilter])

    useEffect(() => {
        if (response) {
            setactiveOrders(response.orders)
        }

    }, [response])


    return (
        <>
            {loading ? <Spinner /> :
                error ? <ErrorModal Reload={() => fetchData(`/orders?closed=true&code=${codeFilter}`, 'get')} /> :

                    <div className={classes.Oldorders}>
                        {activeOrders.length < 1 ? <div className={classes.noOrders}>
                            <h1>
                                لا يوجد طلبات مغلقة بعد

                            </h1>
                        </div> :
                            <table className={classes.OrdersTable}>
                                <thead>
                                    <tr>
                                        <th>كود الطلب</th>
                                        <th>تاريخ الطلب</th>
                                        <th>اسم العميل</th>
                                        <th>تاريخ الدفع</th>
                                        <th>مكان التوصيل </th>
                                        <th>تاريخ التوصيل </th>
                                        <th>إجمالي المنتجات </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {activeOrders.map((order, i) =>
                                        <tr key={order._id}>
                                            <td><Link
                                                to={{
                                                    pathname: "/orders/order",
                                                    state: {
                                                        order: order
                                                    }
                                                }}
                                            >
                                                {order.code}
                                            </Link></td>
                                            <td>   <Moment format="YYYY-MM-DD">
                                                {order.createdAt}
                                            </Moment></td>
                                            <td>{order.CustomerInfo.name}</td>
                                            <td>
                                                <Moment format="YYYY-MM-DD">
                                                    {order.paidAt}
                                                </Moment>
                                            </td>
                                            <td >{order.CustomerInfo.city}</td>
                                            <td>
                                                <Moment format="YYYY-MM-DD">
                                                    {order.deliveredAt}
                                                </Moment>
                                            </td>
                                            <td>{order.itemsPrice.toFixed(2)}</td>
                                        </tr>)}
                                </tbody>
                            </table >}
                    </div>
            }
        </>

    )
}

export default OldOrders