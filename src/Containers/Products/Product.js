import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAxios } from '../../hooks/Http-hook'
import classes from './Product.module.css'
import ProductImages from '../../components/ProductImages/ProductImages'
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import EditIcon from '@mui/icons-material/Edit';
import DeleteModel from '../../components/DeleteModel/DeleteModel'
import OfferModel from '../../components/OfferModel/OfferModel'
import Spinner from '../../components/Spinner/Spinner'
import ErrorModal from '../../components/Errormodel/ErrorModal'

const Product = () => {
    const params = useParams()

    const [deleteModel, setdeleteModel] = useState(false)
    const [offerModel, setofferModel] = useState(false)
    const [newoffer, setnewoffer] = useState()

    const { response, error, fetchData, loading } = useAxios()

    useEffect(() => {
        fetchData(`/products/admin/${params.product}`, 'get')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params, newoffer])

    const setoffer = (offer) => {
        setnewoffer(offer)
    }
    return (
        <div>
            {loading ? <Spinner /> :
                error ? <ErrorModal Reload={() => fetchData(`/products/admin/${params.product}`, 'get')} /> :
                    response &&
                    <div className={classes.Product}>
                        <div className={classes.ProHeader}>
                            <h3>
                                تفاصيل المنتح
                            </h3>
                            <div>
                                <button onClick={() => setofferModel(true)}
                                    className={classes.offerB}>
                                    اضافة تخفيض
                                </button>
                                <button onClick={() => setdeleteModel(true)}
                                    className={classes.deleteB}>
                                    حذف المنتح
                                </button>
                            </div>
                        </div>
                        <DeleteModel show={deleteModel}
                            historyPush={'/products'}
                            closeModel={() => setdeleteModel(false)}
                            url={`/products/deleteproduct/${params.product}`} />
                        <OfferModel
                            show={offerModel}
                            price={response.product.price}
                            offer={response.product.offer}
                            closeModel={() => setofferModel(false)}
                            url={`/products/addoffer/${params.product}`}
                            offerchange={setoffer}
                        />

                        <div className={classes.ProductData}>
                            <div className={classes.ProInfo} >
                                <div className={classes.secHeader}>
                                    <div className={classes.Hcontainer}>
                                        <NoteAltIcon style={{ fontSize: "35px" }} />
                                    </div>
                                    <p>المعلومات الأساسية</p>
                                </div>
                                <p> <span>الإسم :</span> {response.product.name}</p>
                                <p> <span>السعر :</span> {response.product.price} ج.م</p>
                                {response.product.offer > 0 &&<p> <span>قيمة العرض الحالي :</span> {response.product.offer} %</p>}
                                <p> <span>الماركة : </span>{response.product.brand ? response.product.brand : 'لم يتم تعيين الماركة'}</p>
                                <p> <span>القسم : </span>{response.product.category.name}</p>
                                <p> <span>اللون </span>{response.product.color ? response.product.color : 'لم يتم تعيين اللون'}</p>
                                {response.product.sizes.length > 0 ?
                                    <table>
                                        <thead>
                                            <tr>
                                                <th> المقاس</th>
                                                <th> الكمية</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {response.product.sizes.map((size, i) => <tr key={i}>
                                                <td>{size.size}</td>
                                                <td>{size.quantity}</td>
                                            </tr>)}
                                        </tbody>
                                    </table>
                                    : <p> <span>الكمية:</span>  {response.product.quantity}</p>}
                                <Link to={{
                                    state: {
                                        product: response.product
                                    },
                                    pathname: '/products/updateproduct'
                                }} >تعديل البيانات   <EditIcon className={classes.EditIcon} /></Link>
                            </div>
                            <div className={classes.Imagescontainer}>
                                <div className={classes.secHeader}>
                                    <div className={classes.Hcontainer}>
                                        <AddAPhotoIcon style={{ fontSize: "35px" }} />
                                    </div>
                                    <p>صور المنتج</p>
                                </div>
                                <ProductImages Images={response.product.images} />
                                <Link to={{
                                    state: {
                                        product: response.product
                                    },
                                    pathname: '/products/updateproductimages'
                                }} >تعديل  <EditIcon className={classes.EditIcon} /></Link>
                            </div>
                        </div>

                    </div>

            }</div>
    )
}

export default Product