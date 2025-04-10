# expenseapp backend

This is the backend for the Expense Management System, built with TypeScript, Node.js, Express, and PostgreSQL.

## Requirements
### Locally

- [Node.js](https://nodejs.org/) (version 20+ recommended)
- PostgreSQL

### Containers

- [Docker](https://www.docker.com/)


### Installation

Clone the repository and install dependencies:

```sh
npm install
```

### Environment Variables

Create a `.env` file in the root directory and configure the following:

```ini
# Server
NODE_ENV=development
PORT=3000
CORS_ORIGIN=http://localhost:5173

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=expense_app_dev
DB_USER=postgres
DB_PASSWORD=postgres

# JWT
JWT_SECRET=my_secret
JWT_EXPIRATION=1d

# Logging
LOG_LEVEL=info

# Mileage Rate
DEFAULT_MILEAGE_RATE=0.30
```

### Running Locally

#### 1. Start PostgreSQL

If PostgreSQL is installed locally, start it and create the database:

```sh
createdb -U postgres expense_app_dev
```

Run migrations to set up the database schema:

```sh
npm run migrate
```

#### 2. Start the Server

Run the backend in development mode:

```sh
npm run dev
```

### Running with Docker

#### 1. Start Just the Database with Docker

To run only the PostgreSQL database using Docker:

```sh
docker compose up postgres
```

#### 2. Run Database & Backend with Docker

To run the backend inside a Docker container:

```sh
docker build -t expense-backend .
docker run -p 3000:3000 --env-file=.env expense-backend
```

#### 3. Running with Docker Compose

For a complete setup including PostgreSQL and the backend:

```sh
docker compose up
```

### Database Management

#### Run Migrations
```sh
npm run migrate
```

#### Rollback Last Migration
```sh
npm run migrate:undo
```

#### Rollback All Migrations
```sh
npm run migrate:undo:all
```

#### Seed the Database
```sh
npm run seed
```

### Linting & Formatting

#### Check Linting Issues
```sh
npm run lint:check
```

#### Auto-fix Linting Issues
```sh
npm run lint:fix
```

#### Check Code Formatting
```sh
npm run format:check
```

#### Auto-fix Code Formatting
```sh
npm run format:fix
```

### API Documentation

Generate API documentation with Swagger:

```sh
npm run swagger-autogen
```
