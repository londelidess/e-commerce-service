
# `PLAYBOX <toy-store-e-commerce-service>`

## INTRODUCTION
![homepage][def]
![shoppage][def2]
![shoppingcartpage][def3]
![orderhistorypage][def4]

## Link to website 
[https://bv-group-project.onrender.com](https://omocha-no-chachacha.onrender.com)

PLAYBOX, a [Upbounders](https://upbounders.com/) replica, is a platform where users can buy toys.

## Feature List
**Shopping Bliss**, an e-commerce platform, is a website where users can browse a variety of products, add them to their carts, engage in product reviews, and complete purchases with ease.

1. **New account creation, log in, log out, and guest/demo login**
    - Users can sign up, log in, and log out.
    - Users can use a demo login to try the site without making actual purchases.
    - Users can't use certain features without logging in (like adding products to cart, reviewing products, and completing transactions).
    - Logged in users are directed to their profile page which displays their past orders and favorite products.
    - Logged out users are directed to the main product browsing page.

2. **Hosting on Render**

3. **Products**
    - All users can view available products.
    - Logged in owner can add new products.
    - Product owners can edit and delete their products.
    - Users can search for products using a search bar.

4. **Shopping Cart and Transactions**
    - Logged in users can add products to their shopping cart.
    - Users can view all products added to their cart.
    - Users can remove products from their shopping cart.
    - Users can complete a transaction/purchase, turning the cart into an order.
    - Users can view their past orders.

5. **Reviews**
    - Logged in users can post reviews on products.
    - Review authors can edit and delete their reviews.
    - All users can view product reviews.

6. **Favorites**
    - Logged in users can mark products as favorites.
    - Users can view and manage their favorite products.
    - Users can remove products from their favorites.

6. **Images**
    - Product owners can add multiple images to their product listings.
    - Users (if allowed) can include images in their reviews.

8. **Past Orders & Reorder**
    - Users can view their past orders and reorder.

9. **Production README**



10. **Bonus Features**
    - **Search**: Users can search products by category.

    - **Recommendations**: Based on user browsing and purchase history, recommend products they might like.

    - **Sale and Discounts**: Implement features for sales, discount codes, and special promotions.
![db-schema](https://github.com/londelidess/shopping-website/blob/main/images/db-schema.png)

## Authentication

* Users can check if they're authenticated.
  - `GET api/auth`

* Users can log in.
  - `POST api/auth/login`

* Users can log out.
  - `POST api/auth/logout`

* Users can sign up.
  - `POST api/auth/signup`

* An unauthorized endpoint to handle authentication failures.
  - `POST api/auth/unauthorized`

---

## Session

* Users can view all users.
  - `GET api/posts`

* Users can retrieve a specific user by their ID.
  - `GET api/users/<id>`

---


## Products

* Users can view all products.
  - `GET api/products`

* Users can retrieve a specific product by its ID.
  - `GET api/products/<product_id>`

* Users can view all categories of products.
  - `POST api/products/categories`

* Users can create a product.
  - `POST api/products`

* Users can update a specific product by its ID.
  - `PUT api/products/<product_id>`

* Users can delete a specific product by its ID.
  - `DELETE api/products/<product_id>`


## Shopping Cart

* Users can view all products in their cart.
  - `GET api/shoppingcarts`

* Users can add a product to their cart.
  - `POST api/shoppingcarts`

* Users can clear all products from their cart.
  - `DELETE api/shoppingcarts/clear`

* Users can remove a product from their cart.
  - `DELETE api/shoppingcarts/<product_id>`

* Users can update product quantity in their cart.
  - `PUT api/shoppingcarts/<product_id>`

* Users can complete a transaction/purchase.
  - `POST api/shoppingcarts/checkout`



---

## Past Orders

* Users can reorder a past order.
  - `POST api/shoppingcarts/orders/<order_id>/reorder`


* Users can view all their past orders.
  - `GET api/shoppingcarts/orders`


---


 
## Technology we used 
Flask/ React/ Redux/ sqlAlchemy/ postgresql/ AWS S3

[def]: ./images/home-page.png
[def2]:./images/shop-page.png
[def3]:./images/shopping-cart.png
[def4]:./images/order-history.png
