import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductItem from "./ProductItem";
import CategoryNavigation from './CategoryNavigation';

function ProductCategoryPage() {
  const { categoryName } = useParams();
  const productsObject = useSelector((state) => state.products.allProducts);
  const productsArray = Object.values(productsObject);

  const categoryDescriptions = {
    "Games": "Dive into timeless classics and new favorites, perfect for kids and families. Discover games that captivate, challenge, and bring us together.",
    "Puzzles": "Piece together moments of wonder with our beautifully crafted puzzles, each telling a story through intricate artwork.",
    "Model Kits": "Unleash your creativity and step into a world of detailed craftsmanship. Assemble, customize, and showcase models that spark joy and imagination."
  };


  const description = categoryDescriptions[categoryName];

  const filteredProducts = productsArray.filter(product => product.category_name === categoryName);

  return (
    <section className="category-page">
      <h1>{categoryName}</h1>
      <CategoryNavigation description={description} />
      <ul className="product-grid">
        {filteredProducts.map((product) => (
          <ProductItem product={product} key={product.id} />
        ))}
      </ul>
    </section>
  );
}

export default ProductCategoryPage;
