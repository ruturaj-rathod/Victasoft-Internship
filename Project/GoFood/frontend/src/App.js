import './App.css';
import Home from './screens/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './screens/Login';
import Signup from './screens/Signup';
import { cartContext, reducer } from './components/ContextReducer';
import { useReducer } from 'react';
import Cart from './screens/Cart';
import MyOrder from './screens/MyOrder';
import Dashboard from './Admin/Dashboard';
import AdminLogin from './Admin/AdminLogin';
import Users from './Admin/Users';
import FoodItems from './Admin/FoodItems';
import AddFoodItem from './Admin/AddFoodItem';
import UserOrders from './Admin/UserOrders';
// import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
// import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
// import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  const [cart, dispatch] = useReducer(reducer, []);
  return (
    // <>
      // <CartProvider>
      <cartContext.Provider value={{cart, dispatch}}>
        <Router>
          <div>
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/login' element={<Login />} />
              <Route exact path='/signup' element={<Signup />} />
              <Route exact path='/cart' element={<Cart />} />
              <Route exact path='/myorders' element={<MyOrder />} />
            </Routes>
            <Routes >
                <Route exact path='/admin' element={<Dashboard />} />
                <Route exact path='/admin/login' element={<AdminLogin />} />
                <Route exact path='/admin/users' element={<Users />} />
                <Route exact path='/admin/food-items' element={<FoodItems />} />
                <Route exact path='/admin/food-item/new' element={<AddFoodItem />} />
                <Route exact path='/admin/user/orders/:email' element={<UserOrders />} />
            </Routes>
          </div>
        </Router>
      </cartContext.Provider>
      // </CartProvider>
    // </>
  );
}

export default App;
