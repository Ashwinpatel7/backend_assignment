# Authentication System Backend

A secure authentication system built with Node.js, Express, TypeScript, and MySQL.

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type-safe JavaScript
- **MySQL** - Database
- **Sequelize** - ORM
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **Zod** - Schema validation

## Features

- ✅ User registration with validation
- ✅ Secure login with JWT tokens
- ✅ Protected routes with middleware
- ✅ Role-based authorization (user/admin)
- ✅ Password hashing with bcrypt
- ✅ Centralized error handling
- ✅ Request validation with Zod
- ✅ Password reset functionality
- ✅ TypeScript for type safety

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MySQL database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd auth-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   PORT=3000
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRES_IN=7d
   
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=auth_db
   DB_USER=root
   DB_PASSWORD=your-password
   
   NODE_ENV=development
   ```

4. **Database Setup**
   - Create a MySQL database named `auth_db`
   - The application will automatically create tables on startup

5. **Start the application**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm run build
   npm start
   ```

## API Endpoints

### Authentication Routes

#### POST /auth/signup
Register a new user
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "role": "user" // optional, defaults to "user"
}
```

#### POST /auth/login
Login user
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

#### GET /auth/me
Get current user profile (Protected)
```
Headers: Authorization: Bearer <jwt-token>
```

#### POST /auth/password-reset
Request password reset
```json
{
  "email": "john@example.com"
}
```

#### GET /auth/admin
Admin only route (Protected + Role-based)
```
Headers: Authorization: Bearer <jwt-token>
```

### Health Check
#### GET /health
Check server status

## Project Structure

```
src/
├── config/
│   └── database.ts          # Database configuration
├── controllers/
│   └── authController.ts    # Request handlers
├── middleware/
│   ├── auth.ts             # JWT & authorization middleware
│   ├── errorHandler.ts     # Error handling middleware
│   └── validation.ts       # Request validation middleware
├── models/
│   └── User.ts             # User model
├── routes/
│   └── authRoutes.ts       # Route definitions
├── services/
│   └── authService.ts      # Business logic
├── types/
│   └── index.ts            # TypeScript interfaces
├── utils/
│   ├── jwt.ts              # JWT utilities
│   └── validation.ts       # Zod schemas
├── app.ts                  # Express app setup
└── server.ts               # Server entry point
```

## Security Features

- **Password Hashing**: bcrypt with salt rounds of 12
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Zod schema validation
- **Role-based Access**: Admin/user role authorization
- **Error Handling**: Centralized error responses
- **CORS**: Cross-origin resource sharing enabled

## Password Requirements

- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character (@$!%*?&)

## Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Run production build
npm start
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 3000 |
| JWT_SECRET | JWT signing secret | - |
| JWT_EXPIRES_IN | Token expiration | 7d |
| DB_HOST | Database host | localhost |
| DB_PORT | Database port | 3306 |
| DB_NAME | Database name | auth_db |
| DB_USER | Database user | root |
| DB_PASSWORD | Database password | - |
| NODE_ENV | Environment | development |

## Error Responses

All errors follow a consistent format:
```json
{
  "error": "Error message",
  "details": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

## License

MIT License