import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
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
import ChatBot from './components/ChatBot';


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
        <Switch>
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/history" component={OrderHistory} />
          <Route exact path="/favorite" component={Favorite} />
          <Route exact path="/shoppingcarts" component={ShoppingCart} />
          <Route exact path="/reviews" component={Reviews} />
          <Route exact path="/products/new" component={CreateProductForm} />
          <Route exact path="/products/manage" component={ProductManage} />
          <Route exact path="/products/id/:productId" component={ProductShow} />
          <Route exact path="/products/category/:categoryName" component={ProductCategoryPage} />
          <Route exact path="/products/:productId/edit" component={UpdateProductForm} />
          <Route exact path="/products" component={Products} />

          <Route exact path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/" component={HomePage} />
        </Switch>
      )}
      <ChatBot />
      <Footer />
    </>
  );
}

export default App;
