# Transactions Dashboard

This project is a Transactions Dashboard application built with Node.js, Express.js, MongoDB for the backend, and Next.js, React, and Tailwind CSS for the frontend. It includes APIs for fetching transactions, statistics, and visualizations using bar and pie charts.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Backend](#running-the-backend)
- [Running the Frontend](#running-the-frontend)
- [Project Structure](#project-structure)

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js (>=14.x.x)
- MongoDB (>=4.x.x)
- npm (comes with Node.js)

## Installation

### Clone the Repository

```bash
git clone https://github.com/yourusername/transactions-dashboard.git
cd transactions-dashboard
```

## Install Dependencies
- Backend
```bash
cd server
npm install
```
- Frontend
```bash
cd client
npm install
```
## Running the Backend
- Create a file .env and add the below code in it.
```bash
PORT=9000
MONGO_URI=mongodb+srv://*****:*****@cluster0.6rptlqv.mongodb.net/Products?retryWrites=true&w=majority&appName=Cluster0
```
- Start the backend server:
```bash
cd server
npm start
```
By default, the backend server will run on http://localhost:9000.

## Running the Frontend
- Start the frontend development server:
```bash
cd client
npm run dev
```
By default, the frontend will run on http://localhost:3000.

## Project Structure
```bash
transactions-dashboard/
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── seed.js
│   ├── server.js
│   └── package.json
├── client/
│   ├── components/
│   ├── pages/
│   ├── public/
│   ├── styles/
│   ├── utils/
│   └── package.json
└── README.md
```
