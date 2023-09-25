
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
**PLAYBOX**, an e-commerce platform, is a website where users can browse a variety of products, add them to their carts, engage in product reviews, and complete purchases with ease.

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

9.  **Bonus Feature** --- **Chatbot**
    
**PLAYBOX Chatbot** is an intuitive assistant, designed to improve user experience. It answers FAQs and directs users to desired product categories.

 Features
- **User Queries**: Specifically trained on a PLAYBOX dataset to address unique user queries.
- **Product Recommendations**: Suggests products based on user input.

 Integration
- Available at the bottom right of each page, the chatbot is easily accessible for users seeking immediate help.

 Interactivity
- The chatbot accepts text inputs. Voice functionality is planned for future updates.

 Technology
- Crafted using **FlowiseAI** and powered by **GPT-3.5 Turbo** from **OpenAI API**. Integrated with the **Pinecone vector database** for accurate responses. Its proficiency is further enhanced with PLAYBOX-specific training.

 Integration Details
- The chatbot widget is embedded in the site's HTML. It connects to a cloud-deployed custom Flowise instance, compatible with any Node-supporting server, like Render.


```
<script type="module">
    import Chatbot from "https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js"
    Chatbot.init({
        chatflowid: "761007b0-4c69-4013-8b64-fb421b3fcca7",
        apiHost: "https://flowise-ai-makoto.onrender.com",
    })
</script>
```

** Note: This code is tailored for PLAYBOX. Using it for other sites may not yield the desired results.

---

## Backend Database Schema.
![db-schema](https://github.com/londelidess/shopping-website/blob/main/images/db-schema.png)

---

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
  - `GET api/users`

* Users can retrieve a specific user by their ID.
  - `GET api/users/<id>`

---


## Products

* Users can view all products.
  - `GET api/products`
 
* Fetch and display products added by the current user.
  - `GET api/products/user`

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
  - 
---

## Media

* Fetch all media for a product:
  - `GET api/medias/<product_id>`

* Add media to a product:
  - `POST api/medias/<product_id>`

* Delete a media item:
  - `DELETE api/medias/<media_id>`

---

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

## Favorites

* View favorite products:
  - `GET api/favorites/my-favorites`

* Check if a product is a favorite:
  - `GET api/favorites/is-favorite/<product_id>`

* Add a product to favorites:
  - `POST api/favorites/<product_id>`

* Remove a product from favorites:
  - `DELETE api/favorites/<product_id>`


---

## Reviews

* Fetch a single review:
  - `GET api/reviews/single/<review_id>`

* View user reviews:
  - `GET api/reviews/user/<user_id>`

* View reviews for a product:
  - `GET api/reviews/<product_id>`

* Post a review for a product:
  - `POST api/reviews/<product_id>`

* Edit a review:
  - `PUT api/reviews/<review_id>`

* Delete a review:
  - `DELETE api/reviews/<review_id>`

---
 
## Used Technology in this project 
Flask/ React/ Redux/ sqlAlchemy/ PostgreSQL/ AWS S3 / FlowiseAI/ LungchainJS/ Pinecone/ OpenAI/ Google map

[def]: ./images/home-page.png
[def2]:./images/shop-page.png
[def3]:./images/shopping-cart.png
[def4]:./images/order-history.png
