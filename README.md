# Triveous_Ecommerce_Backend_API_with_Node_js

This is the backend for an e-commerce website. It is responsible for handling all of the data and logic behind the website, including:

Product management: Adding, editing, and deleting products.
Order management: Accepting, processing, and fulfilling orders.
Customer management: Creating and managing customer accounts.
Inventory management: Tracking inventory levels and ensuring that products are available for purchase.
Security: Protecting customer data and preventing fraud.

## Deployed Link

```bash
  https://pear-gorgeous-tortoise.cyclic.app/
```

## API Documentation Swagger

```bash
  https://pear-gorgeous-tortoise.cyclic.app/api-docs/
```

## Key Features

- **High Prformance**: insures that the eCommerce site can handle high traffic loads efficiently.
- **Scalability**: easily adapt to increased user demand by adding more servers or resources as needed.
- **API Devlopment**: building APIs, to interact with frontend interfaces, mobile apps, and third-party services.
- **Database Integration**: can integrate with MongoDB, offering flexibility in choosing the right database solution.
- **Security**: protect sensitive customer information, such as encryption, authentication, and authorization mechanisms.
- **Inventory Management**: efficiently manage product inventory, order processing, and shipping logistics.
- **User Authentication and Authorization**: ensures that only authorized users can access certain parts of the website.

## Tech Stack

- Backend: Node.js


## Getting Started

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/rodeo12/Triveous_Ecommerce_Backend_API_with_Node_js
   ```
   
2. Install dependencies:
   ```
   npm install 
   ```

3. Application Start
   ```
   npm run server
   ```


## Endpoints Reference

### Home Route

- `GET /`: Get the welcome message.
- ...


### User Authentication and Authorization Routes

- `POST /user/register`: Register a new user.
- `POST /user/login`: Login a user.
- `POST /user/logout`: Logout a user.
- ...

### Seller Product Routes(RBAC)

- `GET /seller/products`: Seller who currently logged in can fetch all products posted him.
- `GET /seller/products/:id`:  Seller who currently logged in can fetch a specific product using its ID.
- `POST /seller/products/addProduct`:  Seller who currently logged in can post a new product.
- `PATCH /seller/products/updateProduct/:id`:  Seller who currently logged in can update his products.
- `DELETE /seller/products/deleteProduct/:id`:  Seller who currently logged in can delete his products.
- ...

### User Product Routes(Public)

- `GET /user/products`: All user can fetch all products.
- `GET /user/products/:id`: All user can get a specific product using its ID.
- `GET /user/products/categories`: All users can fetch categories.
- ...

### Cart Routes(Only Login User can access)

- `GET /cart`: User who logged in can get his cart.
- `POST /cart/add`: User who logged in can add products to his cart.
- `PATCH /cart/decrement/:id`: User who logged in can decrease cart product quantitiy.
- `PATCH /cart/increase/:id`: User who logged in can increase cart product quantitiy.
- `DELETE /cart/delete/:id`: User who logged in can delete product form his cart.
- ...

### Order Routes(Only Login User can access)

- `POST /order`: User who logged in can order form his cart.
- `GET /order/history`: User who logged in can get his order history.
- `GET /order/:id`: User who logged in can get a specific order by its ID.
- `PATCH /order/updateStatus/:id`: Seller can update the status of the product.
- ...



#### Dummy Seller Credentials 1: 
email: `justin123@gmail.com`
password: `justin@123`




#### Dummy User Credentials 1: 
email: `max@gmail.com`
password: `max@123`


## API Documentation 

### User-swagger
![user](https://github.com/rodeo12/JS-101/assets/112781993/77549b59-0914-4b9e-b3e0-d8bf2d310a32)


### User-Products-swagger
![userproducts](https://github.com/rodeo12/JS-101/assets/112781993/baa1707e-f703-400a-986b-11eb7158f673)


### Seller-Products-swagger
![sellerproducts](https://github.com/rodeo12/JS-101/assets/112781993/8718aa73-2eff-45d4-bae6-c3f972d288c0)



### Cart-swagger
![cart](https://github.com/rodeo12/JS-101/assets/112781993/bcfb4cd7-8628-4958-9935-5744f950033b)


### order-swagger
![order](https://github.com/rodeo12/JS-101/assets/112781993/617ed06f-7754-467f-b17c-0854dd5c717d)


### Schema-swagger
![schema](https://github.com/rodeo12/JS-101/assets/112781993/35524e3a-da37-481c-bf94-1480a7d1f041)
