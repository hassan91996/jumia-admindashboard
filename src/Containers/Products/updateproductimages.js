import React, { useEffect, useState } from 'react'
import classes from './updateproductimages.module.css'
import useForm from '../../hooks/form-hooks';
import ImageUpload from '../../components/Ui/FormElement/imageUpload/ImageUpload';
import axios from '../../axios'
import { useHistory, useLocation } from 'react-router';
import { useAxios } from '../../hooks/Http-hook';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ErrorLine from '../../components/Errormodel/errorLine'
import ErrorModal from '../../components/Errormodel/ErrorModal'
import Spinner from '../../components/Spinner/Spinner'
import SmallSpinner from '../../components/Spinner/Smallspinner'




const UpdateProductImages = () => {

    const location = useLocation()
    const [files, setfiles] = useState()
    const [fetchError, setFetchError] = useState(false)
    const [fetchLoading, setfetchLoading] = useState(false)
    const history = useHistory()

    const { response, error, fetchData, loading } = useAxios()
    const [formState, inputHandler, setFormData] = useForm();

    const fetchImages = async (images) => {
        try {
            setfetchLoading(true)

            let PImages = []
            for (let img of images) {
                const { data } = await axios.get(`${img.url}`, {
                    responseType: 'blob'
                })
                PImages.push(data)
            }
            setfetchLoading(false)

            setfiles([...PImages])
            setFetchError(false)
            setFormData(
                {
                    images: {
                        value: PImages,
                        isValid: true
                    },
                },
                true);
        } catch (error) {
            setfetchLoading(false)
            setFetchError(true)
        }
    }
    useEffect(() => {
        if (location.state.product) {
            fetchImages(location.state.product.images)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.state.product])


    useEffect(() => {
        if (response) {
            history.push(`/products/${location.state.product._id}`)
            return () => {

            }

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [response])

    const submitForm = (e) => {
        e.preventDefault()
        var formData = new FormData();
        for (let i in formState.inputs.images.value) {
            formData.append('images', formState.inputs.images.value[i]);
        }
        fetchData(`/products/updateimages/${location.state.product._id}`, 'post', formData)

    }


    return (

        <div className={classes.ImageUpdate}>
            {
                fetchError ? <ErrorModal Reload={() => fetchImages(location.state.product.images)} /> :
                    fetchLoading ? <Spinner /> :
                        <>
                            <div className={classes.secHeader}>
                                <div className={classes.Hcontainer}>
                                    <AddAPhotoIcon style={{ fontSize: "35px" }} />
                                </div>
                                <p> تعديل صور المنتج </p>
                            </div>
                            {files && <form onSubmit={submitForm} className={classes.ImagesForm}>
                                <ImageUpload
                                    files={files}
                                    name="images"
                                    onInput={inputHandler} />
                                {error ? <ErrorLine error={'حدث خطا ما '} /> :
                                    loading ? <SmallSpinner /> :
                                        <button disabled={!formState.isValid} type="submit" className={classes.submButton}> حفظ</button>}
                            </form>}</>
            }

        </div>
    )
}

export default UpdateProductImages