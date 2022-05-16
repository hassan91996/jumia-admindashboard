import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { fetchProducts } from '../../store/actions/index'
import classes from './Products.module.css'
import CategoriesTree from "../../components/categories/CategoriesTree";
import Add from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import Product from "../../components/Product/Product";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Spinner from '../../components/Spinner/Spinner'
import ErrorModal from '../../components/Errormodel/ErrorModal'
import SearchOffIcon from '@mui/icons-material/SearchOff';

const ProductList = () => {


  const [showSearchCategories, setSearchCategories] = useState(false)
  const [search, setsearch] = useState('')
  const [searchCategory, setsearchCategory] = useState({})
  const [page, setpage] = useState(1)

  const dispatch = useDispatch();
  const getProducts = (params, isMore) => dispatch(fetchProducts(params, isMore))
  const products = useSelector(state => state.products.products);
  const loading = useSelector(state => state.products.loading);
  const error = useSelector(state => state.products.error);
  const count = useSelector(state => state.products.totalcount);



  useEffect(() => {
    if (page > 1) {
      getProducts({
        category: searchCategory._id,
        productname: search,
        page: page,
        pagesize: 50
      }, true)
    } else {
      getProducts({
        category: searchCategory._id,
        productname: search,
        page: 1,
        pagesize: 50
      })

    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchCategory, search, page])


  const handlCatSearch = (cat) => {
    setSearchCategories(false)
    setsearchCategory(cat)
    setpage(1)


  }


  const Filterbutton = () => {
    setSearchCategories(!showSearchCategories)
  }

  const handlesearch = (e) => {
    setsearch(e.target.value)
    setpage(1)
  }
  const setCategory = () => {
    setsearchCategory({})
    setpage(1)
  }

  const moreCompent = products.length < count &&
    <>
      {error ? <ErrorModal
        Reload={() => getProducts({
          category: searchCategory._id,
          productname: search,
          page: page,
          pagesize: 50
        }, page > 1 && true)} /> : loading ?
        <Spinner /> :
        <button className={classes.loadMore}
          onClick={() => setpage(page + 1)}>عرض المزيد</button>}
    </>


  return (
    <div className={classes.Products}>
      <div className={classes.ProductsHeader}>
        <div className={classes.PFilter}>
          <div className={classes.searchContainer} >
            {search.length < 1 && <SearchIcon className={classes.searchIcon} />}
            <input value={search}
              type='text'
              onChange={(e) => handlesearch(e)}
              placeholder=" ابحث هنا عن المنتجات" />
            {search.length > 0 && <ClearIcon className={classes.clearIcon} onClick={() => setsearch('')} />}
          </div>
          <div className={classes.CSelect} >
            <p className={showSearchCategories ? classes.Pactive : ''} onClick={Filterbutton}>{searchCategory._id ? `تم اختيار : ${searchCategory.name}` : 'اختيار قسم'}
              {showSearchCategories ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</p>
            {searchCategory._id && <button onClick={setCategory}>
              إعادة تعيين
            </button>}
          </div>
        </div>
        <Link className={classes.addbutton} to={"/products/addproduct"}>
          <Add />
          اضافة منتج جديد</Link >
      </div>

      <div className={classes.CategorySelect} style={{ display: showSearchCategories ? "flex" : "none" }}>
        <CategoriesTree handleClick={handlCatSearch}
          selected={searchCategory}
          groupName={'CategoryFilter'} />
      </div>


      <div>

        {
          page === 1 ? <>
            {
              loading ? <Spinner /> :
                error ? <ErrorModal
                  Reload={() => getProducts({
                    category: searchCategory._id,
                    productname: search,
                    page: page,
                    pagesize: 50
                  })} />
                  : products.length > 0 ?
                    <>
                      {products.map((prod, i) => <Product key={i} product={prod} order={i + 1} />)}
                      {moreCompent}</>
                    : <div className={classes.NoProducts}>
                      <SearchOffIcon className={classes.xIcon} />
                      <h2>لاتوجد نتائح لعملية البحث</h2>
                    </div>
            }
          </> :
            <>
              {products.map((prod, i) => <Product key={i} product={prod} order={i + 1} />)}
              {moreCompent}</>

        }
      </div>


    </div >
  );
}


export default ProductList

