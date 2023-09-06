import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from "../../store/product";
import ProductItem from "./ProductItem";
import { NavLink } from 'react-router-dom';
import './products.css';

function ProductLandingPage() {
  const dispatch = useDispatch();

  const productsObject = useSelector((state) => state.products.allProducts);
  const productsArray = Object.values(productsObject);
// console.log(productsArray)
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);


  return (
    <section className="landing-page">
      <h1>Unbox Together Play Forever</h1>

      <nav className="product-navigation">
        <NavLink to="/products/all" activeClassName="active">All</NavLink>
        <NavLink to="/products/games" activeClassName="active">Games</NavLink>
        <NavLink to="/products/puzzles" activeClassName="active">Puzzles</NavLink>
        <NavLink to="/products/model-kits" activeClassName="active">Model Kits</NavLink>
      </nav>

      <ul className="product-grid">
        {productsArray.map((product) => (
          <ProductItem product={product} key={product.id} />
        ))}
      </ul>
    </section>
  );
}
export default ProductLandingPage;
