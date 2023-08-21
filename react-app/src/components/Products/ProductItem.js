
import { Link } from 'react-router-dom';

const ProductItem = ({ product }) => {
    return (
      <li title={product.name}>
        <Link to={`/products/${product.id}`}>
          <div className="product-item">
            <div className="product-preview" title={product.name}>
              {product.images[0]?.media_url?.endsWith("mp4") ? (
                <video controls width="320" height="240">
                  <source src={product.images[0]?.media_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img src={product.images[0]?.media_url} alt={product.name} />
              )}
            </div>
            <div className="product-details">
              <div className="product-info">
                <h2 className="product-name">{product.name}</h2>
              </div>
              <h2 className="product-price">${parseFloat(product.price).toFixed(2)}</h2>
            </div>
          </div>
        </Link>
      </li>
    );
}

export default ProductItem;
