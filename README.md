# Simple CRUD Application

A lightweight, beginner-friendly CRUD (Create, Read, Update, Delete) web application built using **HTML**, **CSS**, **vanilla JavaScript**, **Node.js**, and **Express.js**.

The application uses an in-memory JavaScript array on the backend to store data without requiring a database, and exposes a clean REST API consumed by the frontend.

---

## Features

- **Create**: Add new items with a name and price using the input form.
- **Read**: Display all stored items in a styled table.
- **Update**: Edit existing item details directly through the form.
- **Delete**: Remove items from the list with confirmation.
- **Initial Data**: Comes pre-populated with default items:
  - `1 | Book | 250`
  - `2 | Pen | 25`
- **Zero Heavy Frameworks**: Pure vanilla JavaScript on the frontend — no React, Bootstrap, or external libraries.

---

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Fetch API)
- **Backend**: Node.js, Express.js (REST API)
- **Data Storage**: In-memory JavaScript array

---

## Project Structure

```text
mern_project/
├── .gitignore          # Git ignore rules (node_modules, etc.)
├── package.json        # Dependencies and start scripts
├── package-lock.json   # Locked dependency tree
├── server.js           # Express server and REST API endpoints
├── README.md           # Project documentation
└── public/
    ├── index.html      # Form and table layout
    ├── style.css       # Clean, responsive CSS styling
    └── script.js       # Client-side CRUD fetch logic
```

---

## REST API Endpoints

| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/items` | Retrieve all items | None |
| **POST** | `/api/items` | Add a new item | `{ "name": "string", "price": number }` |
| **PUT** | `/api/items/:id` | Update an existing item by ID | `{ "name": "string", "price": number }` |
| **DELETE** | `/api/items/:id` | Delete an item by ID | None |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation & Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/prabhukarthik73-spec/simple-crud-app.git
   cd simple-crud-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the application:**
   ```bash
   npm start
   ```
   *(or `node server.js`)*

4. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## License

This project is licensed under the ISC License.
