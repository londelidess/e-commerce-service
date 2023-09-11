import React,{ useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./products.css";

function CategoryNavigation({ description }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/products/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories.");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      {/* {description && <p className="category-description">{description}</p>} */}
      <p className="category-description">
        {description && description.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </p>
      <nav className="product-navigation">
        <NavLink to="/products" exact activeClassName="active">
          All
        </NavLink>
        {categories.map((category) => (
          <NavLink
            key={category.id}
            to={`/products/category/${category.name}`}
            activeClassName="active"
          >
            {category.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default CategoryNavigation;
