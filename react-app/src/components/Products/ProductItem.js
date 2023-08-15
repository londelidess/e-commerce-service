
import { Link } from 'react-router-dom';

const ProductItem = ({ product }) => {
    return (
      <li title={product.name}>
        <Link to={`/products/${product.id}`}>
          <div className="product-item">
        <div className="product-preview" title={product.name}>
             <img
             src={product.images[0]?.media_url}
             alt={product.name}
             />
        </div>
            <div className="product-details">
              <div className="product-info">
                <h3>{product.name}</h3>
              </div>
              <div>${parseFloat(product.price).toFixed(2)}</div>
            </div>
          </div>
        </Link>
      </li>
    );
}

export default ProductItem;
