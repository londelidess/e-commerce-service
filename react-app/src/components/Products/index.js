import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../store/product";
import ProductItem from "./ProductItem";
import CategoryNavigation from "./CategoryNavigation";
import PacmanLoading from "../Loading";
import { useLoading } from './LoadingContextLanding';
import "./products.css";

function ProductLandingPage() {
  const dispatch = useDispatch();
  const { isLoading, setIsLoading, areCategoriesLoading, categories } = useLoading();
  const productsObject = useSelector((state) => state.products.allProducts);
  const productsArray = Object.values(productsObject);

  useEffect(() => {
    dispatch(fetchAllProducts()).then(() => setIsLoading(false));
  }, [dispatch]);

  if (isLoading ) return <PacmanLoading />;

  return (
    <section className="landing-page">
      <h1 className="landing-page-centered-title">Unbox Together Play Forever</h1>
      <p className="landing-page-centered-description">
        Find your toys!<br />
        From classics to the latest, we've got it all.
      </p>
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
