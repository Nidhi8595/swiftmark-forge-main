# MarkSphere - 
### "Your personal sphere of saved bookmarks"

## Project info

**URL**: https://swiftmark-forge-main.vercel.app/

A **full-stack Bookmark Saving Application** built with **NestJS** for the REST-based backend and **React + Tailwind + TypeScript** for the frontend. The app allows users to **create, edit, and delete bookmarks**, manage their accounts securely, and experience a smooth, dynamic, and animated UI.  

---

## 🚀 Features  
- 🔑 **Authentication & Security**: Secure login with **hashing and JWT tokens**  
- 👤 **User Management**: Create, update, and delete users  
- 📚 **Bookmark Management**: Add, edit, delete, and manage bookmarks easily  
- 🎨 **Frontend**: Built with **React, Tailwind, and TypeScript**, featuring animations and a clean UI  
- 🛠️ **Backend**: REST API using **NestJS** with structured modules and services  
- 🗄️ **Database**: **PostgreSQL** with **Prisma ORM**  
- 🧪 **Testing**: Full **end-to-end testing** for reliability  
- 🐳 **Dockerized** for easy deployment  
- 🧰 API tested with **Insomnia**  

---

## 🛠️ Tech Stack  
- **Frontend**: React, Tailwind CSS, TypeScript  
- **Backend**: NestJS, Node.js  
- **Database**: PostgreSQL, Prisma ORM  
- **Authentication**: JWT, bcrypt hashing  
- **Testing**: End-to-End (e2e)  
- **Dev Tools**: Docker, Insomnia  

---

## 📂 Project Structure  
/backend → NestJS REST API (Users, Bookmarks, Auth)
/frontend → React + Tailwind + TypeScript UI

yaml
Copy code

---

## ⚙️ Installation & Setup  

### 1️⃣ Clone the repo  
```bash
git clone https://github.com/your-username/bookmark-app.git
cd bookmark-app
2️⃣ Backend Setup
bash
Copy code
cd backend
npm install
# Setup environment variables in .env (DB URL, JWT secret, etc.)
npx prisma migrate dev
npm run start:dev
3️⃣ Frontend Setup
bash
Copy code
cd frontend
npm install
npm run dev
4️⃣ Docker Setup (Optional)
bash
Copy code
docker-compose up --build
📸 Screenshots
(Add screenshots or GIFs of your UI here)

📖 Learnings
Through this project, I learned:

Structuring and building a REST API with NestJS

Implementing secure authentication with JWT & hashing

Using Prisma ORM with PostgreSQL

Creating a modern frontend with React + Tailwind + TypeScript

Writing and running end-to-end tests

Working with Docker for containerization

API testing with Insomnia

🔍 Search and filter bookmarks

📂 Folder/Tag support for organizing bookmarks

🌐 Deploying full-stack app using Render & Vercel

