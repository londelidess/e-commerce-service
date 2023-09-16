import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllProducts } from "../../store/product";
import "./Home.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const productsObject = useSelector((state) => state.products.allProducts);
  const productsArray = Object.values(productsObject);
  const [translateValue, setTranslateValue] = useState(0);

  useEffect(() => {
    dispatch(fetchAllProducts());
    const interval = setInterval(() => {
      if (translateValue <= -100 * productsArray.length) {
        setTranslateValue(0);
      } else {
        setTranslateValue((prevValue) => prevValue - 5);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [dispatch, productsArray.length])


  return (
    <div>
      <div className="home-container">
        <h1 className="large-heading centered-content">
          belonging begins with play
        </h1>
        <p className="centered-content">
          PLAYBOX makes premium screen-free toys that reflect what’s special
          about the joyfully diverse world of today’s kids!
        </p>
        <Link to="/products">
          <button className="shop-now">SHOP NOW</button>
        </Link>
      </div>

      <div className="our-toys-container">
      <h1 className="large-heading">Our Toys</h1>
      <div className="slider-wrapper">
        <div className="slider-container" style={{ transform: `translateX(${translateValue}%)` }}>
          {productsArray.map((product) => (
            <img key={product.id} src={product.images[0]?.media_url} alt={product.name} />
          ))}
          {productsArray.map((product) => (
            <img key={product.id + '-duplicate'} src={product.images[0]?.media_url} alt={product.name} />
          ))}
        </div>
      </div>
    </div>

      <div className="home-container">
        <h1 className="centered-content">
        healthy toys for everyone
        </h1>
        <p className="centered-content">
        founded by a modern mom, upbounders® is an elevated toy brand with easily-accessible products that celebrate belonging and self-expression through play. 💫
        </p>
        <p className="centered-content">
          OUR COMMUNITY IS GROWING. CLICK BELOW TO LEARN MORE AND ENTER THE
          SPECIAL PRIZE DRAW CREATED TO CELEBRATE THE PARTNERSHIP. HURRY,
          CLOSING SOON!
        </p>
        <Link to="/about">
          <button className="learn-more">Learn More</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
