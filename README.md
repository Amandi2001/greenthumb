# GreenThumb - Premium Plant E-commerce Store

GreenThumb is a modern, full-stack e-commerce platform designed for plant lovers. It features a sleek user interface, a robust shopping cart system, and a comprehensive admin control panel to manage inventory and customer orders.

<p align="center">
  <img src="https://github.com/user-attachments/assets/348d5186-819e-4268-81aa-2a0d08edf35b" alt="GreenThumb Banner" width="100%">
</p>
---

## Key Features

###  Customer Experience
- **Dynamic Product Showcase:** Browse a curated collection of indoor and outdoor plants.
- **Advanced Search & Filter:** Quickly find plants by name or specific category.
- **Interactive Shopping Cart:** Real-time quantity updates and subtotal calculations.
- **Quick View Modal:** Detailed plant descriptions and care guides (Sunlight/Water needs).
- **Responsive Design:** Fully optimized for all screen sizes (Mobile, Tablet, Desktop).

###  Admin Control Panel
- **Inventory Management:** Full CRUD operations (Create, Read, Update, Delete) for plant inventory.
- **Order Management:** Monitor real-time customer orders and update delivery statuses.

---

## Screenshots

| Admin Dashboard | Shopping Cart |
|---|---|
| <img width="1911" height="932" alt="Image" src="https://github.com/user-attachments/assets/730009b5-190c-4a87-95ba-bf373062f2d0" /> |<img width="1890" height="913" alt="Image" src="https://github.com/user-attachments/assets/46267ee2-7aaf-4e93-8755-e55a5d224e34" /> |

| Checkout  | Quick View |
|---|---|
| <img width="1900" height="927" alt="image" src="https://github.com/user-attachments/assets/937a4f93-b529-4dcf-b078-f5822a70a701" /> | <img width="1903" height="921" alt="Image" src="https://github.com/user-attachments/assets/85fcf267-a4ac-4992-afe8-06f79b67dcf1" /> |


---

## Tech Stack

**Frontend:**
- **React.js** (Functional Components & Hooks)
- **Bootstrap 5** (Professional Styling & Layout)
- **React Icons** (Modern Iconography)
- **SweetAlert2** (Polished User Feedback)
- **Axios** (API Management)

**Backend:**
- **Laravel**
- **MySQL** (Relational Database)

**Deployment:**
- **Vercel** (Frontend Hosting)

---

## Installation & Setup (Local)

1. **Clone the Repo:**
   ```bash
   git clone [https://github.com/YOUR_USERNAME/greenthumb.git](https://github.com/YOUR_USERNAME/greenthumb.git)
2. **Frontend Setup:**
   ```bash
   cd ecommerce-frontend
   npm install
   npm run dev
3. **Frontend Setup:**
 - Configure your local server (e.g., XAMPP or WAMP).

- Navigate to the /ecommerce-backend directory.

- Update the .env file with your local database credentials.

- Run database migrations and start the local server:

   ```bash
   php artisan migrate  # (For Laravel)


---

## Live Demo Note
  - The live version on Vercel is a Frontend Showcase.

  - Database Simulation: Since the live demo is hosted on Vercel (Frontend only), features like Login, Registration, and Orders are handled via Mock Data and Demo Logic.

  - Full-Stack Logic: The complete backend integration, API controllers, and database schemas are fully functional in the local environment and available in the source code folders.

**Demo Admin Access:**
For testing the Admin Dashboard on the live demo, use these credentials:
- Email: admin@greenthumb.com
- Password: admin123

**Project Structure:**
- /ecommerce-frontend: Contains the React.js source code, components, and global context management.

- /ecommerce-backend: Contains the API controllers, database migrations, models, and backend logic.
   
