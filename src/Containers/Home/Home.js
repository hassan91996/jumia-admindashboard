import { useEffect, useState } from 'react'
import Chart from '../../components/Chart/Chart'
import { Link, } from "react-router-dom"
import { useAxios } from '../../hooks/Http-hook'
import Spinner from '../../components/Spinner/Spinner'
import ErrorModel from '../../components/Errormodel/ErrorModal'
import Img from '../../components/Ui/Image'

import classes from './Home.module.css'
const Home = () => {

    const [YearIncome, setYearIncome] = useState()
    const [DayIncome, setDayIncome] = useState(0)
    const [lastweekIncom, setlastweekIncom] = useState(0)
    const [lastMonthIncom, setlastMonthIncom] = useState(0)
    const [emptyProducts, setemptyProducts] = useState()
    const [topSalled, settopSalled] = useState()


    const { error, response, fetchData, loading } = useAxios()
    useEffect(() => {
        fetchData('/orders/bestseller', 'get')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (response) {
            if (response.totalIncom.length > 0) {
                const month = new Date().getMonth() + 1
                setYearIncome(response.totalIncom)
                const MI = response.totalIncom.filter(mon => mon._id === month)
                MI.length > 0 && setlastMonthIncom(MI[0].totalIncom)
            }
            if (response.topSellproducts.length > 0) {
                settopSalled(response.topSellproducts)
            }
            if (response.emptyProducts.length > 0) {
                setemptyProducts(response.emptyProducts)
            }
            if (response.dailyIncom.length > 0) {
                setDayIncome(response.dailyIncom[0].totalIncom)
            }
            if (response.weekIncom.length > 0) {
                setlastweekIncom(response.weekIncom[0].totalIncom)
            }
        }
    }, [response])

    return (

        <div>
            {loading ? <Spinner /> :
                error ? <ErrorModel Reload={() => fetchData('/orders/bestseller', 'get')} /> :
                    <div className={classes.Home}>
                        <div className={classes.IncomDetailes}>
                            <div>
                                <p>إجمالي الدخل اليومي</p>
                                <h2>{DayIncome.toFixed(2)}
                                    <span>جنيه مصري</span> </h2>
                            </div>
                            <div>
                                <p>إجمالي الدخل اخر سبعة أيام</p>
                                <h2>{lastweekIncom.toFixed(2)}
                                    <span>جنيه مصري</span>
                                </h2>
                            </div>
                            <div>
                                <p>إجمالي الدخل الشهري</p>
                                <h2>{lastMonthIncom.toFixed(2)}
                                    <span>جنيه مصري</span> </h2>
                            </div>
                        </div>
                        <div className={classes.PrdouctsArea}>
                            {topSalled && <div>
                                <h3>المنتجات الأكثر مبيعا</h3>
                                {topSalled.map((prod, i) =>
                                    <Link key={i} className={classes.HomeProduct}
                                        to={`/products/${prod.product._id}`}>
                                        <Img src={prod.product.images[0].url} alt='topImg' />
                                        <p>{prod.product.name}</p>
                                        <span>
                                            {prod.sellerCount}
                                        </span>
                                    </Link>)}
                            </div>}

                            {emptyProducts && <div>
                                <h3>منتجات نفذت الكمية</h3>
                                {emptyProducts.map((prod, i) =>
                                    <Link key={i} className={classes.HomeProduct}
                                        to={`/products/${prod._id}`}>
                                        <Img src={prod.images[0].url} alt='topImg' />
                                        <p>{prod.name}</p>
                                    </Link>)}
                            </div>}
                        </div>
                        {YearIncome && <Chart data={YearIncome} />}

                    </div>
            }



        </div>
    )
}

export default Home
