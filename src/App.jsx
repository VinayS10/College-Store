import {BrowserRouter,Routes,Route} from "react-router-dom";
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import HomePage from './Pages/HomePage';
import SellItemPage from './Pages/SellItemPage';
import CartPage from './Pages/CartPage';
import ProductDetailPage from './Pages/ProductDetailPage';
import MyProductsPage from './Pages/MyProductsPage';
import MyProfilePage from "./Pages/MyProfilePage";
import EditProfilePage from "./Pages/EditProfilePage";
import EditProductPage from "./Pages/EditProductPage";

function App() {

  return (
    <>

      <BrowserRouter>
        <Routes>
        <Route  path="/" element={<HomePage/>}></Route>
        <Route  path="/login" element={<LoginPage/>}></Route>
        <Route  path="/signup" element={<RegisterPage/>}></Route>
        <Route  path="/sell" element={<SellItemPage/>}></Route>
        <Route  path="/cart" element={<CartPage/>}></Route>
        <Route  path="/myproducts" element={<MyProductsPage/>}></Route>
        <Route  path="/profile" element={<MyProfilePage/>}></Route>
        <Route  path="/editprofile/:userId" element={<EditProfilePage/>}></Route>
        <Route  path="/editproduct/:productId" element={<EditProductPage/>}></Route>
        <Route  path="/product/:productId" element={<ProductDetailPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
