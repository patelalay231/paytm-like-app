# Paytm-Like App
A Paytm-like application built using the MERN stack. This application features user signup, signin, and the ability to send money to friends. It emphasizes secure password storage, authorization with JWT, and robust error handling.

## Features
**Send Money**: Users can send money to friends with a simple interface.

**Secure Password** Storage: Passwords are hashed using salt and HMAC.

**Authorization**: JSON Web Tokens (JWT) are used for user authentication and authorization.

**Data Validation**: Zod library is used for input validation.

**Error Handling**: Comprehensive error handling is implemented to manage and log errors effectively.

## Technologies

**Frontend**: React.js

**Backend**: Node.js, Express.js

**Database**: MongoDB

**Authentication**: JSON Web Token (JWT)

**Password Security**: Salt and HMAC

**Validation**: Zod library


## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/paytm-like-app.git

2. **Set Up MongoDB Atlas**

  Go to MongoDB Atlas and create a new cluster.
  Copy the connection string for the cluster.

3. **Update MongoDB Connection String**

  Open backend/index.js.
  Replace the placeholder MongoDB URL with the connection string you copied from MongoDB Atlas.

4. **Install Backend Dependencies**
  Navigate to the backend directory:
    ```bash
    cd backend
    ```
  Install the necessary packages:
    ```bash
    npm install
    ```

5. **Start the Backend Server**
    Run the backend server:
      ```bash
      npm run dev
      ```

6. **install frontend dependencies**
   Navigate to frontend
     ```bash
     npm install
     ```
7. **run frontend server**
    ```bash
    npm run dev
    ```
