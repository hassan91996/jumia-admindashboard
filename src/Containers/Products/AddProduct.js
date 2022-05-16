import React, { useEffect, useState } from 'react'
import classes from './AddProduct.module.css'
import Input from '../../components/Ui/FormElement/Input'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import useForm from '../../hooks/form-hooks';
import ImageUpload from '../../components/Ui/FormElement/imageUpload/ImageUpload';
import axios from '../../axios'
import { useHistory } from 'react-router-dom';
import Size from '../../components/Sizes/sizes'
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ErrorLine from '../../components/Errormodel/errorLine'
import CategorySelect from '../../components/CategorySelect/CategorySelect'
import Spinner from '../../components/Spinner/Smallspinner'



const AddProduct = () => {


    const history = useHistory()
    const [variant, setvariant] = useState(true);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [category, setcategory] = useState({})
    const [formState, inputHandler, setFormData] = useForm(
        {
            name: {
                value: "",
                isValid: false
            },
            price: {
                value: "",
                isValid: false
            },
            brand: {
                value: "",
                isValid: true
            },
            quantity: {
                value: "",
                isValid: false
            },
            color: {
                value: "",
                isValid: false
            },
            images: {
                value: [],
                isValid: false
            }
        },
        false
    );

    useEffect(() => {
        if (variant) {
            setFormData(
                {
                    name: {
                        value: "",
                        isValid: false
                    },
                    price: {
                        value: "",
                        isValid: false
                    },
                    brand: {
                        value: "",
                        isValid: true
                    },
                    color: {
                        value: "",
                        isValid: false
                    },
                    images: {
                        value: [],
                        isValid: false
                    },
                    sizes: {
                        value: null,
                        isValid: false
                    }
                },
                false
            )
        } else {
            setFormData({
                name: {
                    value: "",
                    isValid: false
                },
                price: {
                    value: "",
                    isValid: false
                },
                brand: {
                    value: "",
                    isValid: true
                },
                quantity: {
                    value: "",
                    isValid: false
                },
                color: {
                    value: "",
                    isValid: false
                },
                images: {
                    value: [],
                    isValid: false
                },
            },
                false
            );

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [variant]);

    const SetProductCategory = (cat) => {
        setcategory(cat)
    }
    const submitForm = async (e) => {
        e.preventDefault()
        const color = formState.inputs.color.value && formState.inputs.color.value.charAt(0).toUpperCase() + formState.inputs.color.value.slice(1).toLowerCase()
        const brand = formState.inputs.brand.value && formState.inputs.brand.value.charAt(0).toUpperCase() + formState.inputs.brand.value.slice(1).toLowerCase()
        var formData = new FormData();
        for (let i in formState.inputs.images.value) {
            formData.append('images', formState.inputs.images.value[i]);
        }
        formData.append('name', formState.inputs.name.value);
        formData.append('price', formState.inputs.price.value);
        formData.append('brand', brand);
        formData.append('category', category._id);
        formData.append('color', color);
        if (variant) {
            formData.append('sizes', JSON.stringify(formState.inputs.sizes.value))
        }
        !variant && formData.append('quantity', formState.inputs.quantity.value)
        try {
            setLoading(true)
            await axios.post('/products/addproduct', formData)
            setError()
            setLoading(false)
            history.push("/products")

        } catch (e) {
            setLoading(false)

            setError(e.response.data)
        }


    }

    return (
        <div className={classes.AddProduct}>
            <div className={classes.IconContainer}>
                <AddShoppingCartIcon style={{ fontSize: "33px" }} />
            </div>
            <h2>اضافة منتج جديد</h2>
            <div className={classes.prodtype}>
                <span onClick={() => setvariant(false)} className={!variant ? classes.active : ""}> غير متعدد المقاسات </span>
                <span onClick={() => setvariant(true)} className={variant ? classes.active : ""}> متعدد المقاسات </span>
            </div>

            <form onSubmit={submitForm} className={classes.form}>
                <div className={classes.Pdata}>
                    <div className={classes.PInfo}>
                        <div className={classes.secHeader}>
                            <div className={classes.Hcontainer}>
                                <NoteAltIcon style={{ fontSize: "35px" }} />
                            </div>
                            <p>بيانات المنتج</p>
                        </div>
                        {error && <ErrorLine error={error} />}
                        <Input
                            elementType="input"
                            className={classes.Input}
                            name="name"
                            FormFactor={variant}
                            type="text"
                            placeholder="اسم المنتج"
                            validators={{ required: true }}
                            onInput={inputHandler}
                        />
                        <CategorySelect
                            groupName={'AddPrdoductCategory'}
                            selected={category}
                            placeholder={'القسم'}
                            handleClick={SetProductCategory}
                        />
                        <Input className={classes.Input}
                            elementType="input"
                            name="brand"
                            type="text"
                            placeholder="اسم الماركة"
                            onInput={inputHandler}
                            FormFactor={variant}

                        />
                        <Input className={classes.Input}
                            elementType="input"
                            name="color"
                            type="text"
                            placeholder="اللون"
                            FormFactor={variant}
                            onInput={inputHandler}
                        />
                        <Input
                            elementType="input"
                            name="price"
                            type="number"
                            placeholder="السعر بالجنيه المصري"
                            FormFactor={variant}
                            validators={{ required: true, isNumeric: true }}
                            onInput={inputHandler}

                        />
                        {!variant && <Input
                            elementType="input"
                            name="quantity"
                            type="number"
                            placeholder="الكمية"
                            validators={{ required: true, isNumeric: true }}
                            onInput={inputHandler}
                            FormFactor={variant}
                        />}{variant && <Size
                            name="sizes"
                            onInput={inputHandler} />}
                    </div>
                    <div className={classes.PImages}>
                        <div className={classes.secHeader}>
                            <div className={classes.Hcontainer}>
                                <AddAPhotoIcon style={{ fontSize: "35px" }} />
                            </div>
                            <p>صور المنتج</p>
                        </div>
                        <ImageUpload
                            name="images"
                            FormFactor={variant}
                            onInput={inputHandler} />
                    </div>
                </div>
                {loading ? <Spinner /> :
                    <button disabled={!formState.isValid || !category._id} type="submit" className={classes.submButton}> اضافة</button>
                }
            </form>
        </div>
    )
}

export default AddProduct