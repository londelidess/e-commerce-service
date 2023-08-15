import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from './components/HomePage';
import Footer from "./components/Navigation/Footer"
import Products from "./components/Products"
import CreateProductForm from "./components/Products/CreateProductForm";
import UpdateProductForm from "./components/Products/UpdateProductForm";
import ProductManage from "./components/Products/ProductManage"
import ProductShow from "./components/Products/ProductShow";

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
          <Route exact path="/products/new" component={CreateProductForm} />
          <Route exact path="/products/manage" component={ProductManage} />
          <Route exact path= "/products/product:id/edit" component={UpdateProductForm} />
          <Route exact path="/products/:productId" component={ProductShow} />
          <Route exact path="/products" component={Products} />
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/" component={HomePage} />
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
