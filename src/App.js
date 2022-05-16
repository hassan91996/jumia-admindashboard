import './App.css'
import { useEffect } from 'react'
import Categories from './Containers/Categories/Categories';
import Home from './Containers/Home/Home';
import { Redirect, Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import Order from './Containers/Orders/Order'
import Products from './Containers/Products/Products'
import AddProduct from './Containers/Products/AddProduct'
import Updateproduct from './Containers/Products/updateproduct'
import AddCategory from './Containers/Categories/AddCategory'
import UpdateCategory from './Containers/Categories/UpdateCategory'
import Product from './Containers/Products/Product';
import Auth from './Containers/Auth/Auth'
import Logout from './Containers/Auth/Logout'
import { authCheck, fechCategories } from './store/actions/index'
import UpdateImage from './Containers/Products/updateproductimages'
import Layout from './components/Hoc/Layout/Layout';
import Orders from './Containers/Orders/Orders'


function App() {
  const dispatch = useDispatch()
  const checkauth = () => dispatch(authCheck());
  const getCategories = () => dispatch(fechCategories())
  const IsAuth = useSelector(state => state.auth.token !== null)

  useEffect(() => {
    checkauth();
    if (IsAuth) {
      getCategories()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [IsAuth])




  return (
    <div className='App'>

      {IsAuth ?
        <Layout>
          <Switch>
            <Route  path='/categories/addcategory' exact  component={AddCategory} />
            <Route path='/categories/updatecategory' exact  component={UpdateCategory} />
            <Route path='/categories'  exact  component={Categories} />
            <Route path='/products' exact  component={Products} />
            <Route path='/orders'  exact  component={Orders} />
            <Route path='/orders/order' exact component={Order} />
            <Route path='/products/addproduct' exact component={AddProduct} />
            <Route path='/products/updateproduct' exact component={Updateproduct} />
            <Route path='/products/updateproductimages' exact component={UpdateImage} />
            <Route path='/products/:product' exact component={Product} />
            <Route path='/login' exact component={Auth} />
            <Route path='/logout' exact component={Logout} />
            <Route exact path='/' component={Home} />
            <Redirect to="/" />
          </Switch>
        </Layout>
        : <Auth />
      }

    </div>
  );
}

export default App;
