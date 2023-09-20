import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchAllProducts, fetchUserProducts } from "../../store/product";
// import ProductItem from "./ProductItem";
import ProductManageItem from "./ProductManageItem"
import { useNavigate, Routes, Route } from 'react-router-dom';
import {PacmanLoading} from "../Loading";
import './products.css';

const ProductManage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const sessionUser = useSelector((state) => state.session?.user);
  // const productsObject = useSelector((state) => state.products.allProducts);
  // const productsArray = Object.values(productsObject);
  // const userProducts = sessionUser ? productsArray.filter(product => product?.added_by_user_id === sessionUser.id) : [];
  const userProducts = useSelector((state) => state.products.userProducts || []);

useEffect(() => {
  const fetchProducts = async () => {
    await dispatch(fetchAllProducts());
    if (sessionUser) {
      await dispatch(fetchUserProducts());
    }
    setIsLoading(false);
  };
  fetchProducts();
}, [dispatch, sessionUser]);

    // if (!sessionUser || (sessionUser?.role !== 'editor' && sessionUser?.role !== 'admin')) {
    //     return <Redirect to="/" />;
    //   }

    if (!sessionUser) {
      navigate("/");
      return null;
  }
  if (isLoading) return <PacmanLoading />;

  return (
    <section className="manage-section">
      <div className="manage-products">
        <h1>Manage Your Products</h1>

          <NavLink to="/products/new" style={{
          borderRadius: '5px',
          border: "1px solid #000",
          backgroundColor: "grey",
          color: "white",
          padding: "5px",
          boxShadow: "5px 5px 5px",
          width: "fit-content",
          textDecoration: "none",
          cursor: "pointer" }}>
            Create a New Product
          </NavLink>
      </div>
      <section>
        <ul className="product-grid">
          {Array.isArray(userProducts) && userProducts.map(product => (
            <ProductManageItem
              product={product}
              key={product.id}
              sessionUser={sessionUser}
            />
          ))}
        </ul>
      </section>
    </section>
  );
};

export default ProductManage;
