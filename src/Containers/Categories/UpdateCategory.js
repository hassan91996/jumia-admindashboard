import { useEffect, useState } from 'react'
import classes from "./updateCategory.module.css"
import { useHistory, useLocation } from "react-router-dom";
import { useAxios } from '../../hooks/Http-hook';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import CategorySelect from '../../components/CategorySelect/CategorySelect';
import Spinner from '../../components/Spinner/Smallspinner';
import ErrorModal from '../../components/Errormodel/ErrorModal';
import { fechCategories } from '../../store/actions/index'
import { useDispatch } from 'react-redux';


const UpdateCategory = () => {
    const history = useHistory()
    const location = useLocation()
    const dispatch = useDispatch()
    const [category, setcategory] = useState({})
    const getCategories = () => dispatch(fechCategories())


    const { error, loading, response, fetchData } = useAxios()


    useEffect(() => {
        if (location.state.category._id) {
            setcategory(location.state.category)
        }
        else {
            setcategory({})
            history.push('/categories')

        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.state.category])


    const updatecategorSubmit = async (e) => {
        e.preventDefault()
        const categoryData = {
            name: category.name,
            parent: category.parent ? category.parent._id : ''
        }
        fetchData(`categories/updatecategory/${category._id}`, 'put', categoryData)
    }

    const setCategoryParent = (cat) => {
        setcategory({ ...category, parent: cat })
    }
    useEffect(() => {
        if (response) {
            getCategories()
            history.push('/categories')
            
            return () => {
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [response])


    return (
        <div className={classes.UpdateCategory}>
            <div className={classes.secHeader}>
                <div className={classes.Hcontainer}>
                    <NoteAltIcon style={{ fontSize: "35px" }} />
                </div>
                <p> تعديل قسم </p>
            </div>
            <form className={classes.UpdateCategoryForm} onSubmit={updatecategorSubmit} >
                <CategorySelect
                    placeholder={'اختار الأب'}
                    lable={'الأب'}
                    setselected={() => setcategory({ ...category, parent: {} })}
                    handleClick={setCategoryParent}
                    selected={category.parent ? category.parent : {}} />
                <span>
                    اسم القسم
                </span>
                <input
                    value={category.name ? category.name : ''}
                    onChange={(e) => setcategory({ ...category, name: e.target.value })}
                    placeholder='اسم القسم' />
                {loading ? <Spinner /> :
                    error ? <ErrorModal Reload={updatecategorSubmit} />
                        : <button type="submit" disabled={!category.name}> اضافة</button>}
            </form>
        </div >

    )
}

export default UpdateCategory


