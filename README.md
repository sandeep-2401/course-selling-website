# Course Selling Website (with JWT Authentication & MongoDB)

A simple course selling platform built with **Node.js**, **Express**, **MongoDB**, and **JWT authentication**. It supports role-based access for **Admins** and **Users**.

## Features

- JWT-based authentication for Admins and Users
- Admins can:
  - Sign up / Sign in
  - Create new courses
  - View all courses
- Users can:
  - Sign up / Sign in
  - Browse available courses
  - Purchase courses
  - View purchased courses

---

## Technologies Used

- Node.js
- Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT)

---

## API Endpoints

### Admin Routes

- **POST /admin/signup**
  - Creates a new admin account  
  - **Body**:  
    ```json
    { "username": "admin", "password": "pass" }
    ```

- **POST /admin/signin**
  - Logs in an admin  
  - **Body**:  
    ```json
    { "username": "admin", "password": "pass" }
    ```
  - **Response**:  
    ```json
    { "token": "your-token" }
    ```

- **POST /admin/courses**
  - Creates a new course  
  - **Headers**:  
    `Authorization: Bearer <your-token>`  
  - **Body**:  
    ```json
    {
      "title": "course title",
      "description": "course description",
      "price": 100,
      "imageLink": "https://linktoimage.com"
    }
    ```

- **GET /admin/courses**
  - Retrieves all courses  
  - **Headers**:  
    `Authorization: Bearer <your-token>`  
  - **Response**:  
    ```json
    {
      "courses": [
        {
          "id": 1,
          "title": "course title",
          "description": "course description",
          "price": 100,
          "imageLink": "https://linktoimage.com",
          "published": true
        }
      ]
    }
    ```

---

### User Routes

- **POST /users/signup**
  - Creates a new user account  
  - **Body**:  
    ```json
    { "username": "user", "password": "pass" }
    ```

- **POST /users/signin**
  - Logs in a user  
  - **Body**:  
    ```json
    { "username": "user", "password": "pass" }
    ```
  - **Response**:  
    ```json
    { "token": "your-token" }
    ```

- **GET /users/courses**
  - Lists all available courses  
  - **Headers**:  
    `Authorization: Bearer <your-token>`  

- **POST /users/courses/:courseId**
  - Purchases a course by ID  
  - **Headers**:  
    `Authorization: Bearer <your-token>`  
  - **Response**:  
    ```json
    { "message": "Course purchased successfully" }
    ```

- **GET /users/purchasedCourses**
  - Lists all purchased courses  
  - **Headers**:  
    `Authorization: Bearer <your-token>`  
  - **Response**:  
    ```json
    {
      "purchasedCourses": [
        {
          "id": 1,
          "title": "course title",
          "description": "course description",
          "price": 100,
          "imageLink": "https://linktoimage.com",
          "published": true
        }
      ]
    }
    ```

---
