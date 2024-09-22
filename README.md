# Auth: JWT Authentication Practice Project

This project is a practice implementation of user authentication using **JWT** (JSON Web Tokens), featuring both access and refresh tokens. The goal is to build a secure authentication system and deepen the understanding of token-based authentication.

## ⚠️ Warning
The keys in the `.env` file are publicly available for demonstration purposes. **Do not use these keys in production**. Generate your own secure keys before deploying.

## 🚀 Features

- **User Authentication**: Secure login and registration using JWT tokens.
- **Access & Refresh Tokens**: Supports short-lived access tokens and long-lived refresh tokens for improved security.
- **Password Encryption**: User passwords are securely hashed using **bcrypt**.
- **Email Verification**: Includes email verification via **Nodemailer**.
- **Error Handling**: Schema validation using **Zod** ensures robust data validation and error handling.

## 🛠️ Technologies Used

- **Node.js**: Backend runtime environment.
- **Express**: Web framework for building APIs.
- **TypeScript**: Strongly typed language for better code quality and maintenance.
- **MongoDB & Mongoose**: Database and ORM for user and token storage.
- **JWT**: JSON Web Tokens for secure user authentication.
- **Zod**: Schema validation for incoming requests.
- **Nodemailer**: Email verification and communication.
- **Pino**: Logging library for structured, fast logs.
- **bcrypt**: Secure password hashing.
- **UUID**: For generating unique identifiers.

## 📦 Installation

To get started with this project, clone the repository and install the dependencies:

```bash
git clone <your-repo-url>
cd auth
npm install
```

## 🏃 Running the Application

Start the development server with the following command:

```bash
npm run dev
```

## 🔑 Authentication Flow

1. **User Registration**: Users sign up and their passwords are securely hashed.
2. **Login**: Users receive an access token (short-lived) and a refresh token (long-lived) upon successful login.
3. **Access Control**: Access tokens are used to authenticate API requests. Refresh tokens are used to generate new access tokens.
4. **Token Expiration & Renewal**: When access tokens expire, refresh tokens are used to generate new ones without requiring re-login.


## 📚 Learning Objectives

- **Understanding JWT**: Explore how to use JWT for secure user authentication.
- **Access & Refresh Tokens**: Learn how to implement short and long-lived tokens for improved security.
- **TypeScript & Express**: Build strongly-typed APIs using TypeScript in a Node.js environment.
- **Data Validation**: Learn to use Zod for input validation and error handling.
