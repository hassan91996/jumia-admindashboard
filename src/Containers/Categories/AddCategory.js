import { useState, useEffect } from 'react';
import classes from "./AddCategory.module.css"
import { useHistory, useLocation } from "react-router-dom";
import { useAxios } from '../../hooks/Http-hook';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import CategorySelect from '../../components/CategorySelect/CategorySelect';
import Spinner from '../../components/Spinner/Smallspinner';
import ErrorModal from '../../components/Errormodel/ErrorModal';
import { fechCategories } from '../../store/actions/index'
import { useDispatch } from 'react-redux';



const AddCategory = () => {

    const history = useHistory()
    const location = useLocation()
    const dispatch = useDispatch()
    const getCategories = () => dispatch(fechCategories())
    const [parent, setparent] = useState({})
    const [Catname, setCatname] = useState('')


    const { error, loading, response, fetchData } = useAxios()

    useEffect(() => {
        if (location.state.parent) {
            setparent(location.state.parent)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.state.parent])

    useEffect(() => {
        if (response) {
            getCategories()
            history.push('/categories')

            return () => {
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [response])



    const onSubmitHamdler = async (e) => {
        e.preventDefault()
        const categoryData = {
            name: Catname,
            parent: parent._id
        }
        fetchData('categories/addcategory', 'post', categoryData)
    }

    const setCategoryParent = (cat) => {
        setparent(cat)
    }

    return (
        <div className={classes.AddCategory}>
            <div className={classes.secHeader}>
                <div className={classes.Hcontainer}>
                    <NoteAltIcon style={{ fontSize: "35px" }} />
                </div>
                <p> اضاقة قسم جديد</p>
            </div>
            <form className={classes.AddCategoryForm} onSubmit={onSubmitHamdler} >
                <CategorySelect
                    placeholder={'اختار الأب'}
                    lable={'اختار الأب'}
                    handleClick={setCategoryParent}
                    setselected={() => setparent({})}
                    selected={parent} />
                <input
                    value={Catname}
                    onChange={(e) => setCatname(e.target.value)}
                    placeholder='اسم القسم' />
                {loading ? <Spinner /> :
                    error ? <ErrorModal Reload={onSubmitHamdler} />
                        : <button type="submit" disabled={!Catname}> اضافة</button>}
            </form>
        </div>
    )
}
export default AddCategory
