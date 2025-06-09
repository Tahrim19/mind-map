# 🧠 MindMap — Visual Thinking Tool

A modern, minimal, and interactive mind mapping app to help you visually plan, organize, and connect ideas. Built using **React Flow**, **shadcn/ui**, and **Node.js** with full authentication, map management, and node editing features.
🌐 **Live Demo**: [Click Here](https://mind-map-ivory.vercel.app)
---

## 🚀 Features

- 🔐 User Login & Registration.
- 📄 Dashboard to load, save, and manage maps.
- 🧠 Add, update, and delete:
  - Normal Nodes.
  - Database Schema Nodes (with custom fields).
- 🔗 Connect nodes with edges.
- ✏️ Edit node labels and schemas.
- 📝 Update the mindmap title.
- 💾 All data stored.

---

## 🧰 Tech Stack

**Frontend**  
- ⚛️ React + TypeScript  
- 🧩 [React Flow](https://reactflow.dev/)  
- 💨 TailwindCSS  
- 🎨 [shadcn/ui](https://ui.shadcn.com)  

**Backend**  
- 🌐 Node.js + Express  
- 🛢 MongoDB Atlas  
- 🔐 JWT Authentication  

**Deployment**  
- 🟢 Frontend: Vercel 
- 🔵 Backend: Render
- 🍃 Database: MongoDB Atlas  

---

## ✨ How to Use

1. 📝 Register or Login to your account
2. 🧠 Create a new mindmap from the dashboard
3. ➕ Add normal nodes or database schema nodes
4. 🖱 Double-click nodes to edit their label/schema
5. 🔗 Drag connections between nodes
6. 📝 Edit the map title directly in the toolbar
7. 💾 Click **Save** to persist your mindmap
8. 🔙 Use **Back** to return to the dashboard anytime

---

## 🧑‍💻 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/Tahrim19/mind-map.git
cd mindmap
````

### 2. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

### 3. Setup Backend

```bash
cd ../backend
npm install
node server.js
```

### 🛠 Backend `.env` example:

```env
PORT=5000
MONGO_URI=your_mongo_atlas_connection_string
JWT_SECRET=your_super_secret_key
```

---

## 👨‍💻 Author

**Tahrim Bilal**  
GitHub: [Tahrim19](https://github.com/Tahrim19) 
LinkedIn: [Tahrim Bilal](https://www.linkedin.com/in/tahrim-bilal)
Feel free to reach out or contribute!

---
<!-- 
## 📌 TODO (Coming Soon)

* 🖼 Export to PNG/PDF
* 🕒 Map version history
* 🧑‍🤝‍🧑 Real-time collaboration
* 🎨 Custom color themes
--> 
