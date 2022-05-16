import React, { useEffect, useState } from 'react'
import classes from './UpdateProduct.module.css'
import Input from '../../components/Ui/FormElement/Input'
import useForm from '../../hooks/form-hooks';
import { useHistory, useLocation } from 'react-router-dom';
import axios from '../../axios'
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import Size from '../../components/Sizes/sizes'
import ErrorLine from '../../components/Errormodel/errorLine'
import CategorySelect from '../../components/CategorySelect/CategorySelect';

const UpdateProduct = () => {

    const location = useLocation()
    const history = useHistory()
    const [error, setError] = useState();
    const [category, setcategory] = useState({})


    const [formState, inputHandler, setFormData] = useForm()


    useEffect(() => {
        if (location.state.product) {
            setcategory(location.state.product.category)
            if (location.state.product.sizes.length > 0) {
                setFormData(
                    {
                        name: {
                            value: location.state.product.name,
                            isValid: true
                        },
                        price: {
                            value: location.state.product.price,
                            isValid: true
                        },
                        brand: {
                            value: location.state.product.brand,
                            isValid: true
                        },
                        color: {
                            value: location.state.product.color,
                            isValid: true
                        },
                        sizes: {
                            value: location.state.product.sizes,
                            isValid: true
                        },
                    },
                    true
                );
            } else {
                setFormData(
                    {
                        name: {
                            value: location.state.product.name,
                            isValid: true
                        },
                        price: {
                            value: location.state.product.price,
                            isValid: true
                        },
                        brand: {
                            value: location.state.product.brand,
                            isValid: true
                        },
                        color: {
                            value: location.state.product.color,
                            isValid: true
                        },
                        quantity: {
                            value: location.state.product.quantity,
                            isValid: true
                        }

                    },
                    true
                );
            }

        }
        else {
            history.push('/products')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.state.product])

    const submitForm = async (e) => {
        const color = formState.inputs.color.value && formState.inputs.color.value.charAt(0).toUpperCase() + formState.inputs.color.value.slice(1).toLowerCase()
        const brand = formState.inputs.brand.value && formState.inputs.brand.value.charAt(0).toUpperCase() + formState.inputs.brand.value.slice(1).toLowerCase()
        const quantity = formState.inputs.quantity && formState.inputs.quantity.value
        try {
            e.preventDefault()
            const productData = {
                name: formState.inputs.name.value,
                price: formState.inputs.price.value,
                brand: brand,
                quantity:quantity,
                category: category._id,
                color: color,
                sizes: formState.inputs.sizes ? formState.inputs.sizes.value : [],
            }

            await axios.put(`/products/updateproduct/${location.state.product._id}`, productData)
            setError()
            history.push(`/products/${location.state.product._id}`)

        } catch (e) {
            setError(e.response.data)
        }


    }

    const SetProductCategory = (cat) => {
        setcategory(cat)
    }


    return (

        <div className={classes.UpdateProduct}>
            <div className={classes.secHeader}>
                <div className={classes.Hcontainer}>
                    <NoteAltIcon style={{ fontSize: "35px" }} />
                </div>
                <p> تعديل بيانات المنتج</p>
            </div>
            {error && <ErrorLine error={error} />}
            {location.state.product
                && <form onSubmit={submitForm} className={classes.form}>
                    <Input
                        elementType="input"
                        className={classes.Input}
                        name="name"
                        type="text"
                        placeholder="اسم المنتج"
                        validators={{ required: true }}
                        onInput={inputHandler}
                        isvalid={true}
                        initvalue={location.state.product.name}
                        lable={'الإسم'}
                    />
                    <CategorySelect
                        groupName={'updatePrdoductCategory'}
                        selected={category}
                        lable={'القسم'}
                        handleClick={SetProductCategory}
                    />
                    <Input className={classes.Input}
                        elementType="input"
                        name="brand"
                        type="text"
                        placeholder="اسم الماركة"
                        onInput={inputHandler}
                        isvalid={true}
                        initvalue={location.state.product.brand}
                        lable={'اسم الماركة'}


                    />
                    <Input className={classes.Input}
                        lable={'اللون'}
                        elementType="input"
                        name="color"
                        type="text"
                        placeholder="اللون"
                        onInput={inputHandler}
                        isvalid={true}
                        initvalue={location.state.product.color}
                    />
                    <Input
                        elementType="input"
                        name="price"
                        type="number"
                        placeholder="السعر بالجنيه المصري"
                        validators={{ required: true, isNumeric: true }}
                        onInput={inputHandler}
                        lable={'السعر'}
                        isvalid={true}
                        initvalue={location.state.product.price}

                    />
                    {location.state.product.sizes.length < 1 ? <Input
                        elementType="input"
                        name="quantity"
                        type="number"
                        placeholder="الكمية"
                        validators={{ required: true, isNumeric: true }}
                        onInput={inputHandler}
                        isvalid={true}
                        initvalue={location.state.product.quantity}
                        lable={'الكمية'}
                    /> :
                        <Size
                            name="sizes"
                            initvalue={location.state.product.sizes}
                            onInput={inputHandler} />
                    }
                    <button disabled={!formState.isValid || !category._id} type="submit" className={classes.submButton}> حفظ</button>

                </form>}

        </div >
    )
}

export default UpdateProduct