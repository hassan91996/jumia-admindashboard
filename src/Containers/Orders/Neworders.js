import { useEffect, useState } from 'react'
import { useAxios } from '../../hooks/Http-hook'
import Switch from '../../components/Ui/Switch/Switch'
import axios from '../../axios'
import classes from './Neworders.module.css'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import Spinner from '../../components/Spinner/Spinner'
import ErrorModal from '../../components/Errormodel/ErrorModal'

const NewOrders = ({ active, codeFilter }) => {

    const [activeOrders, setactiveOrders] = useState([])
    const { error, response, loading, fetchData } = useAxios()

    useEffect(() => {
        if (active) {
            fetchData(`/orders?code=${codeFilter}`, 'get')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active, codeFilter])

    useEffect(() => {
        if (response) {
            setactiveOrders(response.orders)
        }

    }, [response])


    const setOrderDelivered = async (id, i) => {

        try {
            const neworder = (await axios.post(`/orders/orderdeliverd/${id}`)).data.order
            const neworders = activeOrders
            neworders.splice(i, 1, neworder)
            setactiveOrders([...neworders])
        } catch (error) {
            console.log(error)
        }
    }
    const setOrderPaid = async (id, i) => {
        try {
            const neworder = (await axios.post(`/orders/orderpaid/${id}`)).data.order
            const neworders = activeOrders
            neworders.splice(i, 1, neworder)
            setactiveOrders([...neworders])
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            {loading ? <Spinner /> :
                error ? <ErrorModal Reload={() => fetchData(`/orders?code=${codeFilter}`, 'get')} /> :
                    <div className={classes.Neworders}>
                        {
                            activeOrders.length < 1 ? <div className={classes.noOrders}>
                                <h1>
                                    لا يوجد طلبات جديدة

                                </h1>
                            </div> :
                                <table className={classes.OrdersTable}>
                                    <thead>
                                        <tr>
                                            <th>كود الطلب</th>
                                            <th>تاريخ الطلب</th>
                                            <th>اسم العميل</th>
                                            <th>حالة الدفع </th>
                                            <th>مكان التوصيل </th>
                                            <th>حالة التوصيل </th>
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
                                                <td>   <Moment format="YYYY-MM-DD hh">
                                                    {order.createdAt}
                                                </Moment></td>
                                                <td>{order.CustomerInfo.name}</td>
                                                <td>
                                                    <Switch checked={order.isPaid}
                                                        handlechange={() => setOrderPaid(order._id, i)} />
                                                </td>
                                                <td >{order.CustomerInfo.city}</td>
                                                <td>
                                                    <Switch checked={order.isDelivered}
                                                        handlechange={() => setOrderDelivered(order._id, i)} />
                                                </td>
                                                <td>{order.itemsPrice.toFixed(2)}</td>
                                            </tr>)}
                                    </tbody>
                                </table >
                        }

                    </div>}
        </>


    )
}

export default NewOrders