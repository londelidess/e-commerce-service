import React,{ useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
// import { LoadingContext, useLoading } from './LoadingContextLanding';
import "./products.css";

function CategoryNavigation({ description }) {

  return (
    <div>
      <p className="category-description">
        {description && description.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}<br />
          </React.Fragment>
        ))}
      </p>
      <nav className="product-navigation">
        <NavLink to="/products" exact activeClassName="active">All</NavLink>
        <NavLink to="/products/category/Games" exact activeClassName="active">Games</NavLink>
        <NavLink to="/products/category/Puzzles" exact activeClassName="active">Puzzles</NavLink>
        <NavLink to="/products/category/Model Kits" exact activeClassName="active">Model Kits</NavLink>
        {/* {categories?.map((category) => (
          <NavLink
            key={category.id}
            to={`/products/category/${category.name}`}
            activeClassName="active"
          >
            {category.name}
          </NavLink>
        ))} */}
      </nav>
    </div>
  );
}

export default CategoryNavigation;
