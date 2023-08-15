import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchAllProducts } from "../../store/product";
import ProductItem from "./ProductItem";
import ProductManageItem from "./ProductManageItem"
import { Redirect } from "react-router-dom";
import './products.css';

const ProductManage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const sessionUser = useSelector((state) => state.session.user);

  const productsObject = useSelector((state) => state.products.allProducts);
  const productsArray = Object.values(productsObject);

    // console.log(productsArray)
    console.log(sessionUser?.role)

    useEffect(() => {
        dispatch(fetchAllProducts()).then(() => {
          setIsLoading(false);
        });
    }, [dispatch]);

    if (!sessionUser || (sessionUser?.role !== 'editor' && sessionUser?.role !== 'admin')) {
        return <Redirect to="/" />;
      }

  if (isLoading) {
    return <div className="centered">Loading...</div>;
  }

  return (
    <section className="manage-section">
      <div className="manage-products">
        <h1>Manage Products</h1>

          <NavLink to="/products/new" style={{

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
        {productsArray.map((product) => (
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
