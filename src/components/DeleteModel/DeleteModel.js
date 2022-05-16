import { useEffect } from 'react'
import Model from '../Ui/Model/Model'
import { useAxios } from '../../hooks/Http-hook'
import Spinner from '../Spinner/Spinner'
import ErrorModel from '../Errormodel/ErrorModal'
import { useHistory } from 'react-router'
import classes from './DeleteModel.module.css'

const DeleteModel = ({ show, closeModel, url, historyPush }) => {

    const history = useHistory()

    const { response, error, fetchData, loading } = useAxios()

    const Delete = () => {
        fetchData(url, 'delete')
    }

    useEffect(() => {
        if (response) {
            const timer = setTimeout(() => {
                closeModel()
                history.push(historyPush)
            }
                , 2000)
            return () => clearTimeout(timer)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [response])
    return (
        <Model show={show} closeModel={closeModel}>
            <div className={classes.DeleteModel}>
                {error ? <ErrorModel Reload={Delete} /> :
                    loading ? <Spinner /> :
                        response ? <p> {response}</p> :
                            <>
                                <p>هل أنت متأكد من الحذف؟</p>
                                <div className={classes.DeletButtons}>
                                    <button className={classes.cancle} onClick={closeModel}>الغاء</button>
                                    <button className={classes.Delete} onClick={Delete} > تأكيد</button>
                                </div>
                            </>

                }
            </div>
        </Model>
    )
}

export default DeleteModel

