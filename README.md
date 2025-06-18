# ⭐ Ratings & Review System

A full-stack web application that allows users to view products and submit ratings and reviews. Built using **React + Tailwind CSS** for the frontend and **Node.js + Express + PostgreSQL** for the backend.

---

## 🗂 Project Structure

```
ratings-review-system/
├── backend/               # Node.js + Express + PostgreSQL
│   ├── index.js
│   ├── db.js
│   └── .env
├── frontend/              # React + Tailwind CSS
│   ├── src/
│   └── public/
├── README.md
└── .gitignore
```

---

## 🚀 Features

- 💻 View static/dynamic product list
- ⭐ Submit rating (1–5 stars)
- 📝 Submit reviews with text
- 🔄 View previous reviews per product
- 🚫 Prevent multiple reviews per user/product
- 🧠 (Optional) Add review tags or images

---

## ⚙️ Tech Stack

**Frontend:** React, Tailwind CSS, Axios  
**Backend:** Node.js, Express.js, PostgreSQL  
**Database:** PostgreSQL  
**Deployment:** Vercel (frontend), Render/Fly.io (backend)

---

## ⚒️ Local Setup

### 🔹 1. Clone the repo

```bash
git clone https://github.com/Mrakshaymehta/RATINGS-REVIEW-SYSTEM.git
cd RATINGS-REVIEW-SYSTEM
```

### 🔹 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```
DATABASE_URL=postgresql://<username>:<password>@<host>/<dbname>?sslmode=require
PORT=5000
```

Start the backend:

```bash
npm run dev
```

---

### 🔹 3. Setup Frontend

```bash
cd ../frontend
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🧪 PostgreSQL Schema

```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  image_url TEXT
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  product_id INT REFERENCES products(id) ON DELETE CASCADE,
  rating INT CHECK (rating BETWEEN 1 AND 5),
  review_text TEXT,
  user_identifier TEXT,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (product_id, user_identifier)
);
```

Insert sample products:

```sql
INSERT INTO products (name, description, image_url) VALUES
('Wireless Headphones', 'Noise-cancelling over-ear headphones', 'https://example.com/headphones.jpg'),
('Smartphone', 'Latest Android smartphone with great battery life', 'https://example.com/phone.jpg'),
('Coffee Maker', 'Automatic drip coffee machine with timer', 'https://example.com/coffeemaker.jpg');
```

---

## 📦 API Endpoints

### `GET /products`  
Get all products

### `GET /products/:id/reviews`  
Get all reviews for a product

### `POST /reviews`  
Submit a review
```json
{
  "product_id": 1,
  "rating": 5,
  "review_text": "Great product!",
  "user_identifier": "akshay@example.com",
  "image_url": null
}
```

---

## 🚀 Deployment Instructions

### 🌐 Frontend (Vercel)

1. Go to [https://vercel.com](https://vercel.com) and import your GitHub repo
2. Set root directory to `/frontend`
3. Framework: `Create React App`
4. Build Command: `npm run build`
5. Output Directory: `build`

---

### 🔧 Backend (Render)

1. Go to [https://render.com](https://render.com)
2. Create a new Web Service → Connect your GitHub repo
3. Root Directory: `/backend`
4. Runtime: Node
5. Build Command: `npm install`
6. Start Command: `npm run dev` or `node index.js`
7. Add `DATABASE_URL` in environment variables

✅ Done! Frontend on Vercel, backend on Render.

---

## 🙌 Author

Built with ❤️ by [Akshay Mehta](https://github.com/Mrakshaymehta)

---

## 📄 License

This project is open-source and free to use for demo or educational purposes.
