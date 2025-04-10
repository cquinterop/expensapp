# expenseapp frontend

This is the frontend for the Expense Management System, built with TypeScript, React, and Vite.


## Requirements
### Locally

- [Node.js](https://nodejs.org/) (version 20+ recommended)

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
VITE_API_URL=http://localhost:3000
```

### Running Locally

Start the frontend in development mode:

```sh
npm run dev
```

### Running with Docker

#### 1. Run Frontend with Docker

To run the frontend inside a Docker container:

```sh
docker-compose up frontend
```

#### 2. Running with Docker Compose

To run both backend and frontend with Docker Compose:

```sh
docker-compose up
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

### Build the Frontend

To create a production-ready build:

```sh
npm run build
```

### Preview the Build

To preview the built frontend:

```sh
npm run preview
```
