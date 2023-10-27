# pdf-Editor

Welcome to the PDF Editor Application! This application allows users to edit and manipulate PDF files. It's built using React (Vite) for the frontend in the `client` directory, Node.js for the backend in the `server` directory, and MongoDB as the database.

## Features

- **PDF Selection**: Users can select specific pages from a PDF document for editing.
- **PDF Export**: Users can export the selected pages into a new PDF document.
- **User Authentication**: Secure user accounts and authentication.
- **Database Storage**: Store and manage user data using MongoDB.
- **User Dashboard**: Users can view and manage their edited PDFs.

## Prerequisites
Before getting started, ensure you have the following installed:

- Node.js
- MongoDB
- npm or Yarn
## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo
2. **Setup Backend**
  *Navigate to the server directory:
    
    ```bash
   cd server
  *Install backend dependencies:
  
    ```bash
     npm install
*Create a .env file with your MongoDB connection URI and a secret key for JWT authentication:

    ```bash
    MONGODB_URI=your-mongodb-uri
    JWT_SECRET=your-secret-key
*Start the backend server:

    ```bash
    npm start
*2. Setup Frontend*
*Navigate to the client directory:
    
    ```bash
    cd /client

*Install frontend dependecies:

    ```bash
    npm install

*Start the frontend development server

    ```bash
    npm run dev
    
*3. Access the Application*

  *The application should now be running at http://localhost:3000.
  *Open your web browser and visit http://localhost:3000 to access the PDF editor.
  
*Usage*
  
*User Registration: Users can sign up for a new account or log in if they have one.
*PDF Selection: Users can upload a PDF file, select specific pages for editing, and save their changes.
*PDF Export: Users can export the selected pages as a new PDF document.
*User Dashboard: Users can view and manage their edited PDFs.
*Contributing*
Feel free to contribute to this project by opening issues or pull requests. We welcome any improvements, bug fixes, or new features.

*License*
This project is licensed under the MIT License - see the LICENSE.md file for details.

*Acknowledgments*
*This project was built with the help of various open-source libraries and frameworks.





