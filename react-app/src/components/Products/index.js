import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from "../../store/product";
import ProductItem from "./ProductItem";
import './products.css';

function ProductLandingPage() {
  const dispatch = useDispatch();

  const productsObject = useSelector((state) => state.products.allProducts);
  const productsArray = Object.values(productsObject);
console.log(productsArray)
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <section>
      <ul className="product-grid">
        {productsArray.map((product) => (
          <ProductItem product={product} key={product.id} />
        ))}
      </ul>
    </section>
  );
}
export default ProductLandingPage;
