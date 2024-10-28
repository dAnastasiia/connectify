# Project Overview

## Purpose

This project is designed for learning purposes, aiming to explore the creation of various backend types and how to connect a frontend application to them. The application mimics the functionality of Facebook, offering features such as:

- User authentication (login, signup, logout)
- A feed displaying posts
- Detailed views of individual posts
- The ability to create, edit, and delete posts

To enhance real-time interactions, the project with REST API implements sockets, allowing users' feeds to update instantly with new posts as they are created.

## Applications Overview

This project consists of two primary applications, each featuring a REST API and a GraphQL API. Both applications provide similar functionalities but utilize different backend architectures.

## Learning Objectives

Each app focuses on specific goals to enhance learning outcomes:

- Demonstrating CRUD operations
- Implementing user authentication
- Utilizing real-time features through socket connections
- Working with graphical data representations

## Folder Structure

The project is organized into distinct folders for better clarity and separation of concerns:

- `app/frontend`: Contains the frontend application code for the REST API.
- `app/backend`: Hosts the backend application code for the REST API.
- `app/frontend-graphql`: Contains the frontend application code for the GraphQL API.
- `app/backend-graphql`: Hosts the backend application code for the GraphQL API.

## Core Technologies

### Frontend

The frontend of this project is built using the following technologies:

- **React with TypeScript:** The primary UI framework, offering a robust type system that enhances maintainability and the overall development experience.
- **MUI (Material-UI):** A widely-used React UI framework that facilitates the implementation of responsive and accessible designs.
- **React Query:** This library streamlines data fetching, caching, synchronization, and server state updates, making it easier to manage server interactions within React applications.

For additional libraries and tools utilized in the frontend, please refer to the `package.json` file.

### Backend

The backend is developed using the following technologies:

- **Express:** A minimal and flexible Node.js web application framework that provides a comprehensive set of features for web and mobile applications.

#### Middlewares

- **Body-Parser:** Parses incoming request bodies, making the data available under the `req.body` property.
- **Helmet:** Enhances security for Express applications by setting various HTTP headers.
- **CORS:** Enables Cross-Origin Resource Sharing, allowing secure communication between your frontend and backend.
- **Morgan:** An HTTP request logger middleware for Node.js, used to log incoming requests for debugging and monitoring purposes.
- **Multer:** Handles multipart/form-data, primarily utilized for file uploads.
- **GraphQL HTTP:** Facilitates the handling of GraphQL requests, allowing for flexible and efficient data retrieval.

#### REST API

REST API uses Express, connects to MongoDB via Mongoose, and configures the necessary middleware. It also implements socket functionality for real-time updates. The project employs MongoDB as its database, managed through Mongoose, which simplifies data modeling within the application.

#### GraphQL API

The setup for the GraphQL API is similar but utilizes GraphQL HTTP for managing GraphQL requests.

## Authentication and Security

This application uses JWT for user sessions and bcrypt for hashing passwords. Incoming tokens are validated to ensure secure access to user data. The Helmet middleware is implemented to set various HTTP headers for improved security.

### Authentication Method

- **JWT (JSON Web Tokens):** Utilized for user authentication.
- **bcrypt:** Used for hashing passwords to enhance security.

### Security Approach

- **Hashed Passwords:** Passwords are hashed using bcrypt before being stored in the database. The salt rounds for hashing are configured via environment variables (SALT_ROUND).
- **JWT for User Sessions:** JWTs are issued upon successful login, containing user-specific data (like user ID and email) and an expiration time of 1 hour.
- **Header Security:** The application uses Helmet to set various HTTP headers for protection against well-known web vulnerabilities.

## Real-Time Features

- **Socket.io and Socket.io-client** libraries are utilized to implement real-time features in the application, specifically to update the feed dynamically.
- The feed updates automatically when other users add new posts, enhancing the user experience by ensuring they see the latest content without needing to refresh.

## Forms and Validation

- **React-Hook-Form:** Streamlines form management in React applications, simplifying the handling of form state and validation.
- **Yup:** Provides schema-based validation, allowing developers to define rules for form fields. It integrates seamlessly with React-Hook-Form to validate inputs before form submission.
- **Express-Validator:** Validates incoming requests in the backend, ensuring data integrity before processing. This tool helps maintain robust APIs by preventing malformed data.

This layered validation strategy minimizes risks and improves overall application robustness.

## Development Tools and Libraries

The project leverages several development tools for an efficient workflow:

- **Nx:** Manages the monorepo structure, streamlining development and testing.
- **Vite:** Offers fast builds and improved hot module replacement during development.
- **Vitest:** Used for unit testing, complementing the capabilities of Jest.

## Setup and Installation

1. Clone the repository

```bash
git clone git@github.com:dAnastasiia/connectify.git
cd connectify
```

2. Install dependencies

```bash
pnpm install
```

3. Create a .env file in the root directory to configure essential environment variables for running the application

```plaintext
URI_DB=mongodb+srv://…
SALT_ROUND=
TOKEN_SECRET=
```

4. Start the development servers

```bash
pnpm run start       # Launches the frontend application
pnpm run startBe     # Starts the backend REST API
pnpm run startFeGraphql  # Initiates the frontend GraphQL server
pnpm run startBeGraphql  # Launches the backend GraphQL server
```

Each script runs applications on different ports, allowing simultaneous development and testing of both frontend and backend services.

## Areas for Improvement

1. **Integrating AWS S3 for Image Storage**  
   Utilizing AWS S3 for image storage instead of relying on a local workaround would enhance scalability and reliability. This integration would allow for better management of media assets and reduce dependency on local storage.

2. **Testing Endpoints**  
   Currently, there are no tests for backend endpoints. Implementing testing frameworks such as Jest or Supertest for REST and Apollo Client Testing Utilities for GraphQL is crucial for ensuring the reliability of the API. Comprehensive testing can help catch issues early and improve overall code quality.

3. **Migrating Backend Projects to TypeScript**  
   Transitioning the backend projects to TypeScript would provide stronger type safety, enhancing maintainability and reducing the likelihood of runtime errors. TypeScript's static typing can help catch bugs during development, leading to a more robust codebase.
