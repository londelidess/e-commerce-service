import { Link, NavLink } from "react-router-dom";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteProductFormModal from "./DeleteProductFormModal";
import "./products.css";

const ProductManageItem = ({ product, sessionUser }) => {


  return (
    <>
    <li title={product.name} className="outer-container-Update-Delete-Buttons">
            <Link to={`/products/${product.id}`}>
            <div className="product-list-item">
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
                <div className="product-list-info">
              <div className="product-info">
                <h2 className="product-list-name">{product.name}</h2>
              </div>
              <h2 className="product-list-price">${parseFloat(product.price).toFixed(2)}</h2>
            </div>
            </div>
            </Link>
            <div className="Update-Delete-Buttons">
            {sessionUser && (
            <NavLink
              to={`/products/${product.id}/edit`}
              style={{
                borderRadius: '5px',
                border: "1px solid #000",
                backgroundColor: "grey",
                color: "white",
                padding: "5px",
                boxShadow: "5px 5px 5px",
                width: "fit-content",
                textDecoration: "none",
                cursor: "pointer"
              }}
            >
              Update
            </NavLink>
          )}
          <div className="delete-button-for-product">
            <OpenModalMenuItem
              itemText="Delete"
              modalComponent={<DeleteProductFormModal productId={product.id} />}
            />
          </div>
        </div>
      </li>
    </>
  );
};


export default ProductManageItem;
