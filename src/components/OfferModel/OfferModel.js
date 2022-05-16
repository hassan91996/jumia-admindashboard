import { useEffect, useState } from 'react'
import Model from '../Ui/Model/Model'
import { useAxios } from '../../hooks/Http-hook'
import classes from './OfferModel.module.css'
import Spinner from '../Spinner/Spinner'
import ErrorModel from '../Errormodel/ErrorModal'

const OfferModel = ({ show, closeModel, url, price, offer, offerchange }) => {


    const [offerPercent, setofferPercent] = useState()
    const [edit, setEdit] = useState()

    const { response, error, fetchData, loading } = useAxios()

    useEffect(() => {
        if (response) {
            closeModel()
            setEdit(false)
            offerchange(response.offer)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [response])



    const submitForm = () => {
        const offerData = {
            value: offerPercent
        }
        fetchData(url, 'post', offerData)
    }

    useEffect(() => {
        if (edit) {
            setofferPercent(offer)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [edit])


    const DeleteOffer = () => {
        setofferPercent()
        const offerData = {
            value: 0
        }
        fetchData(url, 'post', offerData)
    }



    return (
        <Model show={show} closeModel={closeModel}>
            <div className={classes.offerModel}>
                {(offer && !edit) ?
                    <div className={classes.OfferInfo}>
                        <div className={classes.offerH}>
                            <p>العرض الحالي</p>
                            <div className={classes.OfferCon}>
                                <button className={classes.offerE} onClick={() => setEdit(true)}>تعديل </button>
                                <button className={classes.offerD} onClick={DeleteOffer}> حذف</button>
                            </div>
                        </div>
                        <div className={classes.offerDes}>
                            {loading ? <Spinner /> :
                                error ? <ErrorModel Reload={DeleteOffer} /> :
                                    <>
                                        <p><span>قيمة العرض : </span>{offer} % </p>
                                        <p><span>سعر المنتح في العرض : </span>{(price - ((offer * price) / 100)).toFixed(2)} ج.م </p>
                                        <p><span>سعر المنتح الأصلي : </span>{price.toFixed(2)} ج.م </p>
                                    </>}
                        </div>
                    </div> :
                    <div className={classes.offerForm}>
                        <div className={classes.offerH}>
                            <p>{edit ? " تعديل قيمة العرض" : "اضافة عرض جديد"}</p>
                        </div>
                        <div className={classes.offerData}>
                            <div>
                                <span>  قيمة العرض بالنسبة المئوية  :  </span>
                                <input id='offer' type="number" max={100} min={0} value={offerPercent} onChange={(e) => setofferPercent(e.target.value)} />
                            </div>
                            <p><span>سعر المنتح الأصلي : </span>{price.toFixed(2)} ج.م </p>
                            {(offerPercent && offerPercent < 100 && offerPercent >= 0) ? <p><span>سعر المنتح في العرض : </span>{(price - ((offerPercent * price) / 100)).toFixed(2)} ج.م </p>
                                : offerPercent > 100 ?
                                    <p style={{ color: '#883737' }}>يجب ان تتراوح قيمة العرض بين 0 : 100</p>
                                    : ''}
                            {loading ? <Spinner /> :
                                error ? <ErrorModel Reload={submitForm} /> :
                                    <button onClick={submitForm} type="submit" disabled={!(offerPercent && offerPercent < 100 && offerPercent >= 0)} className={classes.button}>{edit ? "حفظ" : " اضافة"}</button>}
                        </div>

                    </div>
                }
            </div>
        </Model >
    )
}

export default OfferModel

