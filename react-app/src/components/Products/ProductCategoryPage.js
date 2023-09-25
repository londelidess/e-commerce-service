import React,{ useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "./ProductItem";
import { fetchAllProducts } from "../../store/product";
import CategoryNavigation from "./CategoryNavigation";
import {PacmanLoading} from "../Loading";

import { LoadingContext, useLoading } from '../../context/LoadingContextLanding';
import "./products.css";

function ProductCategoryPage() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { categoryName } = useParams();
  const productsObject = useSelector((state) => state.products.allProducts);
  const productsArray = Object.values(productsObject);
  // const { categories } = useLoading();

  useEffect(() => {
    dispatch(fetchAllProducts()).then(() => setIsLoading(false));
  }, [dispatch]);


  const categoryDescriptions = {
    "Games": "Dive into timeless classics and new favorites, perfect for kids and families.\nDiscover games that captivate, challenge, and bring us together.",
    "Puzzles":  "Piece together moments of wonder with our beautifully crafted puzzles,\neach telling a story through intricate artwork.",
    "Model Kits": "Unleash your creativity and step into a world of detailed craftsmanship.\nAssemble, customize, and showcase models that spark joy and imagination.",
  };

  const description = categoryDescriptions[categoryName];
  const filteredProducts = productsArray.filter(product => product.category_name === categoryName);


  if (isLoading) return <PacmanLoading />;

  return (
    <section className="category-page">
      <h1 className="landing-page-centered-title">{categoryName}</h1>
      <CategoryNavigation description={description} />
      <ul className="product-grid">
        {filteredProducts?.map((product) => (
          <ProductItem product={product} key={product.id} />
        ))}
      </ul>
    </section>
  );
}

export default ProductCategoryPage;
