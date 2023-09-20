import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from 'react-router-dom';
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from './components/HomePage';
import Contact from "./components/HomePage/Contact";
import About from "./components/HomePage/About";
import Footer from "./components/Navigation/Footer"
import ShoppingCart from "./components/ShoppingCarts"
import OrderHistory from "./components/OrderHistory"
import Products from "./components/Products"
import ProductCategoryPage from "./components/Products/ProductCategoryPage";
import CreateProductForm from "./components/Products/CreateProductForm";
import UpdateProductForm from "./components/Products/UpdateProductForm";
import ProductManage from "./components/Products/ProductManage"
import ProductShow from "./components/Products/ProductShow";
import Favorite from "./components/Favorite";
import Reviews from "./components/Reviews";
import ChatBot from "./components/ChatBot";


// import PrivateRoute from "./PrivateRoute"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />

      {isLoaded && (
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/history" element={<OrderHistory />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/shoppingcarts" element={<ShoppingCart />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/products/new" element={<CreateProductForm />} />
          <Route path="/products/manage" element={<ProductManage />} />
          <Route path="/products/id/:productId" element={<ProductShow />} />
          <Route path="/products/category/:categoryName" element={<ProductCategoryPage />} />
          <Route path="/products/:productId/edit" element={<UpdateProductForm />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<LoginFormPage />} />
          <Route path="/signup" element={<SignupFormPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      )}

      <Footer />
      <ChatBot />
    </>
  );
}
export default App;
