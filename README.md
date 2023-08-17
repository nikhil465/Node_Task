# Express App with JWT Authentication and Sequelize

This repository contains an Express.js application that includes JWT (JSON Web Token) authentication, Sequelize ORM for database interaction, and various API endpoints for managing feeds, users, logs, and access permissions.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Database Models](#database-models)
- [Cron Job](#cron-job)
- [Logging](#logging)
- [Environment Configuration](#environment-configuration)
- [Passport JWT Strategy](#passport-jwt-strategy)
- [Database Connection](#database-connection)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo
```

2. Install the dependencies:

```bash
npm install
```

3. Set up your environment configuration by creating a `.env` file based on `.env.example`.

4. Set up your database configuration in the `config/environment.js` file.

5. Run the database migrations to create tables:

```bash
npx sequelize-cli db:migrate
```

6. Start the server:

```bash
npm start
```

## Usage

The application provides various API endpoints for managing feeds, users, logs, and access permissions. Make API requests to these endpoints using tools like `curl` or API testing tools like Postman.

## Folder Structure

The project is organized into several directories:

- `controllers`: Contains the logic for handling different API endpoints.
- `models`: Defines Sequelize models for database tables.
- `routes`: Defines API routes and their corresponding controllers.
- `jobs`: Contains the cron job for deleting old log files.
- `config`: Contains configuration files, including environment variables and database connection setup.

## API Endpoints

The application provides the following API endpoints:

- `/api/v1/user/login`: User login endpoint.
- `/api/v1/user/create`: Create a new user.
- `/api/v1/user/update`: Update user details.
- `/api/v1/user/delete/:id`: Delete a user by ID.
- `/api/v1/user/getUserById/:id`: Get user details by ID.
- `/api/v1/feed/create`: Create a new feed.
- `/api/v1/feed/update`: Update feed details.
- `/api/v1/feed/delete/:id`: Delete a feed by ID.
- `/api/v1/feed/getFeedById/:id`: Get feed details by ID.
- `/api/v1/feed/access/:id`: Grant access to a feed.
- `/api/v1/feed/getAllFeeds`: Get all feeds.
- `/api/v1/logs`: Get recent log entries (only accessible to Super Admins).

## Authentication

JWT (JSON Web Token) authentication is implemented using Passport.js. Endpoints that require authentication are protected by the JWT strategy. Users receive a token upon successful login, which they can include in the `Authorization` header for subsequent requests.

## Database Models

The Sequelize ORM is used to define and interact with the database. The application defines the following models:

- `User`: Represents a user with properties like `name`, `role`, `email`, and `password`.
- `Feed`: Represents a feed with properties like `name`, `url`, and `description`.
- `Access`: Represents access permissions to a feed, including `permission` and associations with `User` and `Feed`.

## Cron Job

A cron job is set up to periodically delete old log files from the `production_logs` directory. Log files older than 30 minutes are removed.

## Logging

The application uses the `morgan` middleware to log HTTP requests. Log files are stored in the `production_logs` directory. A rotating file stream is used to manage log file rotation and retention.

## Environment Configuration

Environment variables are managed in the `.env` file. The application reads these variables to configure settings such as the JWT secret, database credentials, and logging options.

## Passport JWT Strategy

Passport.js is used to implement JWT authentication. The JWT strategy verifies the token provided in the `Authorization` header and extracts the user's information for subsequent request processing.

## Database Connection

The application connects to a PostgreSQL database using Sequelize. Database configuration details can be found in the `config/environment.js` file.
