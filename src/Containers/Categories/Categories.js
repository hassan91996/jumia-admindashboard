import { useState } from 'react'
import { useDispatch } from 'react-redux'
import classes from './Categories.module.css'
import { fechCategories } from '../../store/actions/index'
import Add from '@mui/icons-material/Add';
import Model from '../../components/Ui/Model/Model'
import { Link } from 'react-router-dom';
import CategoriesTree from '../../components/categories/CategoriesTree'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ErrorLine from '../../components/Errormodel/errorLine';
import axios from '../../axios';




const Categories = () => {

    const [selected, setselected] = useState({})
    const [showDeleteModel, setshowDeleteModel] = useState(false)
    const [deleteError, setdeleteError] = useState()

    const dispatch = useDispatch()
    const getCategories = () => dispatch(fechCategories())

        const Delete = async () => {
            try {
                await axios.delete(`/categories/deletecategory/${selected._id}`)
                setselected({})
                getCategories()
                setdeleteError()
                setshowDeleteModel(false)
            } catch (e) {
                setdeleteError(e.response.data)
            }
        }
    const handleSelect = (cat) => {
        setselected(cat)
    }
    const setshowModel = () => {
        setshowDeleteModel(false)
        setdeleteError()
    }
    return (
        <div className={classes.AllCategories}>
            <div className={classes.CategoriesHeader}>
                <h3>
                    قائمة الأقسام
                </h3>
                <div className={classes.CatButtons}>

                    <Link className={classes.CatAdd}
                        to={{
                            pathname: "/categories/addcategory",
                            state: {
                                parent: selected
                            }
                        }}>
                        اضافة
                        <Add className={classes.ButtonIcon} />
                    </Link >
                    <Link className={selected._id ? classes.CatUpdate : classes.disabled}
                        to={{
                            pathname: "/categories/updatecategory",
                            state: {
                                category: selected
                            }
                        }}>
                        تعديل
                        <EditIcon className={classes.ButtonIcon} />
                    </Link >
                    <button className={classes.CatDelete}
                        disabled={!selected._id}
                        onClick={() => setshowDeleteModel(true)}>
                        حذف
                        <DeleteForeverIcon className={classes.ButtonIcon} />
                    </button >
                </div>

            </div>
            <CategoriesTree
                selected={selected}
                handleClick={handleSelect}
                groupName={'AllCategories'} />

            <Model show={showDeleteModel} closeModel={setshowModel}>
                <div className={classes.DeletCategory}>
                    {deleteError ? <ErrorLine error={deleteError} /> :
                        <>
                            <p>هل أنت متأكد من الحذف؟</p>
                            <div className={classes.DeletButtons}>
                                <button className={classes.cancle} onClick={setshowModel}>الغاء</button>
                                <button className={classes.Delete} onClick={Delete} > تأكيد</button>
                            </div>
                        </>
                    }
                </div>
            </Model>
        </div>

    )
}

export default Categories
