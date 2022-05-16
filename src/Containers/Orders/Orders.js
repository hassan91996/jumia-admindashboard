import { useState } from 'react'
import OldOrders from './Oldorders'
import NewOrders from './Neworders'
import Radio from '../../components/Ui/radiobuttom/Radio'

import classes from './Orders.module.css'

const Orders = () => {
    const [active, setactive] = useState('active')
    const [codeFilter, setCodeFilter] = useState('')


    const handleActive = (state) => {
        if (state === 'active') {
            setactive('active')
            setCodeFilter('')
        } else if (state === 'closed') {
            setactive('closed')
            setCodeFilter('')
        }
    }
    return (
        <div className={classes.orders}>
            <div className={classes.OrdersHeader}>
                <div className={classes.stateSelect}>
                    <Radio
                        name='state'
                        display='الطلبات الحالية'
                        checked={active}
                        element={'active'}
                        handlechange={()=>handleActive('active')} />
                    <Radio
                        name='state'
                        display='الطلبات المغلقة'
                        checked={active}
                        element={'closed'}
                        handlechange={()=>handleActive('closed')} />
                </div>
                <div className={classes.OrdersFilters}>
                    <span>بحث بإستخدام الكود</span>
                    <input
                        value={codeFilter}
                        onChange={(e) => setCodeFilter(e.target.value)} />
                </div>
            </div>
            {active==='active' ? <NewOrders active={true} codeFilter={codeFilter} /> :
                <OldOrders active={false} codeFilter={codeFilter} />}

        </div>

    )
}

export default Orders