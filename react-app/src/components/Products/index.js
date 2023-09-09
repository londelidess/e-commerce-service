import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from "../../store/product";
import ProductItem from "./ProductItem";
import CategoryNavigation from './CategoryNavigation';
import './products.css';

function ProductLandingPage() {
  const dispatch = useDispatch();

  const productsObject = useSelector((state) => state.products.allProducts);
  const productsArray = Object.values(productsObject);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);


  return (
      <section className="landing-page">
      <h1 className="landing-page-centered-title">Unbox Together Play Forever</h1>
      <p className="landing-page-centered-description">Find your toys!</p>
      <CategoryNavigation />
         <ul className="product-grid">
      {productsArray.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </ul>
  </section>
);
}

export default ProductLandingPage;
