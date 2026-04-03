# GreenThumb - Premium Plant E-commerce Store

GreenThumb is a modern, full-stack e-commerce platform designed for plant lovers. It features a sleek user interface, a robust shopping cart system, and a comprehensive admin control panel to manage inventory and customer orders.

![Home Page Preview](මෙතැනට_ඔබේ_Home_Page_Screenshot_එකේ_Link_එක_දාන්න)

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

| Home Page | Admin Dashboard |
|---|---|
| ![Home](මෙතැනට_Home_Page_Screenshot_Link) | ![Admin](මෙතැනට_Admin_Dashboard_Screenshot_Link) |

| Shopping Cart | Quick View |
|---|---|
| ![Cart](මෙතැනට_Cart_Page_Screenshot_Link) | ![QuickView](මෙතැනට_Quick_View_Screenshot_Link) |

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
   
