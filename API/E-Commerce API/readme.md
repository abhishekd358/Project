# 🛍️ eCommerce API

This is a **Node.js + Express + MongoDB** backend API for an eCommerce application.  
It handles user registration, login, product management, cart operations, and admin tasks.

Built with:
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT Authentication

---

## 📂 Project Structure

- /Models --> Mongoose models (User, Product, Cart, admin)
- /Controllers --> API controller functions
- /Routes --> Express routes for user, admin, products, cart
- server.js --> Main Express app setup

---

## ⚙️ Setup Instructions

1️⃣ **Clone the repo**
```bash
git clone https://github.com/your-username/your-ecommerce-api.git
cd your-ecommerce-api

```
2️⃣ **Install dependencies**

```bash
npm install
```

2️⃣ **Create a .env file**

```bash
DB_URI=your-mongodb-uri
PORT=1800
JWT_SECRET=465fDe##$

```
4️⃣ **Start the server**
```bash
npm start
```

## 🗝️ API Authentication
- After user login or registration, you receive a JWT token.
- Include this token in the Auth header of your requests for protected routes.
```bash
Auth: your-jwt-token-here
```
## 🛠️ API Endpoints

### 👤 User

| Method | Endpoint             | Description           |
|--------|----------------------|-----------------------|
| POST   | /api/user/register   | Register new user     |
| POST   | /api/user/login      | User login, get token |

#### - Register new user 
```bash
Method: POST
Url: http://localhost:1800/api/user/register
body: {
  "name":"Rollex",
  "email": "rollex@example.com",
  "password": "alex00"
}
```

#### - User login, get token
```bash
Method: POST
Url: http://localhost:1800/api/user/login
body: {
  "email": "rollex@example.com",
  "password": "example00"
}
```
---

### 🛒 User Cart

| Method   | Endpoint                          | Description                                      |
|----------|-----------------------------------|--------------------------------------------------|
| POST     | /api/user/cart/add                | Add product to cart                              |
| GET      | /api/user/cart/                   | Get current user cart                            |
| DELETE   | /api/user/cart/delete             | Delete (clear) entire cart                       |
| PUT      | /api/user/cart/qty               | Decrease quantity of product in cart             |
| DELETE   | /api/user/cart/:productId         | Remove specific product from cart by product ID  |

✅ **Note:** All cart routes require the `Auth` header with the user JWT token.


#### User Specific Add Products to Cart
```bash
Method: POST
Url: http://localhost:1800/api/user/cart/add
Header : Auth: user_token_value
body: {
  "productId": "682eeb736b6639b0ce194109",
  "quantity": 2
}
```

#### Get current user Cart
```bash
Method: GET
Header : Auth: user_token_value
Url: http://localhost:1800/api/user/cart
Header : Auth: token_value
```
#### Delete (clear) entire Cart
```bash
Method: DELETE
Header : Auth: user_token_value
Url: http://localhost:1800/api/user/cart/delete
Header : Auth: token_value
```

#### Decrease quantity of product in Cart
```bash
Method: PUT
Url: http://localhost:1800/api/user/cart/qty
Header : Auth: user_token_value
body: {
  "productId": "682eeb736b6639b0ce194109",
  "quantity": 1
}
```
 ####  Remove specific product from cart by product ID
```bash
Method: DELETE
Header : Auth: user_token_value
Url: http://localhost:1800/api/user/cart/682eeb736b6639b0ce194109
Header : Auth: token_value
```
---

### 👑 Admin

| Method | Endpoint              | Description            |
|--------|-----------------------|------------------------|
| POST   | /api/admin/register   | Register new admin     |
| POST   | /api/admin/login      | Admin login, get token |

✅ **Note:** Admin-protected routes require the `Auth` header with the admin JWT token.

#### Register new admin 
```bash
Method: POST
Url: http://localhost:1800/api/admin/register
body: {
  "name":"Admin01",
  "email": "admin@example.com",
  "password": "admin00"
}
```
#### Admin login, get token
```bash
Method: POST
Url: http://localhost:1800/api/admin/login
Header : Auth: admin_token_value
body: {
  "email": "admin@example.com",
  "password": "admin00"
}
```

---

### 📦 Products

| Method   | Endpoint                       | Description                               |
|----------|--------------------------------|-------------------------------------------|
| GET      | /api/products/                 | Get all products                          |
| GET      | /api/products/:id              | Get product details by ID                 |
| POST     | /api/products/admin/new        | **[Admin]** Add new product in product availability           |
| PUT      | /api/products/admin/:id        | **[Admin]** Update product by ID          |
| DELETE   | /api/products/admin/:id        | **[Admin]** Delete product by ID          |


#### Get all products
```bash
Method: GET
Url: http://localhost:1800/api/products
```
#### Get product details by ID  
```bash
Method: GET
Url: http://localhost:1800/api/products/682eeb736b6639b0ce194109
```

#### **[Admin]** Add new product in product availability
```bash
Method: POST
Url: http://localhost:1800/api/products/admin/new
Header: Auth: admin_token_value
body:{
  "title": "Nike Air Max Running Shoes admin",
  "description": "High-performance running shoes with breathable mesh and responsive cushioning.",
  "brand": "Nike",
  "category": "Footwear",
  "price": 79,
  "discount": 20,
  "finalPrice": 6399,
  "ratings": 4.5,
  "images": null
}
```

#### **[Admin]** Update product by ID   
```bash
Method: PUT
Url: http://localhost:1800/api/products/admin/682eeb736b6639b0ce194109
Header: Auth: admin_token_value
body: {
  "title": "Nike Air Jorden Running Shoes",
  "description": "High-performance running shoes with breathable mesh and responsive cushioning.",
  "brand": "Nike",
  "category": "Footwear",
  "price": 9999,
  "discount": 20,
  "finalPrice": 7899,
  "ratings": 4.5
}
```

####  **[Admin]** Delete product by ID 
```bash
Method: DELETE
Url: http://localhost:1800/api/products/admin/682ee33cbb8f80ae8dda9e54
Header: Auth: admin_token_value

```
---

✅ **Summary of Route Groups:**
- `/api/user/*` → user registration, login, cart  
- `/api/admin/*` → admin registration, login, manage products  
- `/api/products/*` → public product routes and admin product controls

---

### 📸 Screenshot
<!-- Add your own image file -->
<img src="" alt="url-shortener-image">



## 🧪 Testing with Thunder Client
We recommend using Thunder Client (VSCode extension) or Postman.

✅ Set base URL:
```bash
http://localhost:1800
```

✅ For protected routes:
- Go to the Headers tab.
- Add:
```bash
Key: Auth
Value: your-jwt-token
```
✅ For POST/PUT routes:
- Use Body → JSON.
```bash
{
  "productId": "682eeb736b6639b0ce194109",
  "quantity": 2
}
```



# #📄 License
This project is open-source under the MIT License.

## 🤝 Contributing
Feel free to submit issues or pull requests!
Let’s build this together 🚀


### ✍️ Author
GitHub: @abhishekd358