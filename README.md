# Mini Expense Tracking System

A full-stack expense tracking application built with Node.js (Express) backend and React Native (Expo) mobile app.

**Features**

Backend
- User authentication (register/login) with JWT
- Password hashing with bcrypt
- Protected API routes
- Full CRUD operations for expenses
- Filter expenses by category and date range
- Pagination support
- Expense summary grouped by category
- SQLite database with Prisma ORM

Mobile App
- User registration and login
- Expense summary dashboard
- Add, edit, and delete expenses
- Filter expenses by category and date
- Paginated expense list
- Tab navigation
- Token-based authentication with AsyncStorage

**Tech Stack**

Backend
- Node.js
- Express.js
- Prisma (ORM)
- SQLite (Database - chosen for easy setup without external database configuration)
- JWT (Authentication)
- Bcrypt (Password hashing)

Mobile App
- React Native (Expo)
- Expo Router (File-based routing - chosen for clean project structure and simplified navigation)
- Axios (API calls)
- Context API (State management)
- AsyncStorage (Token storage)
- React Native DateTimePicker

**Project Structure**
```
.
├── my-app-backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── index.js
│   ├── prisma/
│   │   └── schema.prisma
│   ├── .env
│   └── package.json
├── my-app/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login.js
│   │   │   └── register.js
│   │   ├── (tabs)/
│   │   │   ├── index.js
│   │   │   ├── expenses.js
│   │   │   ├── add-expense.js
│   │   │   └── edit-expense.js
│   │   └── _layout.tsx
│   ├── src/
│   │   ├── context/
│   │   │   └── authContext.js
│   │   └── services/
│   │       └── api.js
│   └── package.json
├── .gitignore
└── README.md
```

**Setup Instructions**

Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android emulator) or Xcode (for iOS simulator)
- A physical device with Expo Go app (optional)

**Backend Setup**

1. Navigate to the backend directory:

Windows:
```bash
cd my-app-backend
```

Mac/Linux:
```bash
cd my-app-backend
```

2. Install dependencies:

Windows:
```bash
npm install
```

Mac/Linux:
```bash
npm install
```

3. Create a `.env` file in the my-app-backend directory:

Windows (using Command Prompt):
```bash
echo DATABASE_URL="file:./dev.db" > .env
echo JWT_SECRET="your-super-secret-jwt-key-change-this-in-production" >> .env
echo PORT=3000 >> .env
```

Windows (using PowerShell):
```powershell
@"
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
PORT=3000
"@ | Out-File -FilePath .env -Encoding utf8
```

Mac/Linux:
```bash
cat > .env << EOF
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
PORT=3000
EOF
```

Or manually create `.env` file with:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
PORT=3000
```

4. Generate Prisma client and run migrations:

Windows:
```bash
npx prisma generate
npx prisma migrate dev --name init
```

Mac/Linux:
```bash
npx prisma generate
npx prisma migrate dev --name init
```

5. Start the backend server:

Windows:
```bash
npm run dev
```

Mac/Linux:
```bash
npm run dev
```

The backend server will start on `http://localhost:3000`

**Mobile App Setup**

1. Navigate to the mobile app directory:

Windows:
```bash
cd ..\my-app
```

Mac/Linux:
```bash
cd ../my-app
```

2. Install dependencies:

Windows:
```bash
npm install
```

Mac/Linux:
```bash
npm install
```

3. Update the API URL in `src/services/api.js` based on your setup:

**For Android Emulator:**
```javascript
const API_URL = 'http://10.0.2.2:3000';
```

**For iOS Simulator:**
```javascript
const API_URL = 'http://localhost:3000';
```

**For Physical Device:**
You need to use your computer's local IP address. Follow these steps:

**Windows (Command Prompt):**
```bash
ipconfig
```
Look for "IPv4 Address" under your active network adapter (Wi-Fi or Ethernet). Example: `192.168.1.5`

**Windows (PowerShell):**
```powershell
Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.InterfaceAlias -like "*Wi-Fi*" -or $_.InterfaceAlias -like "*Ethernet*"}
```

**Mac:**
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

**Linux:**
```bash
hostname -I
```
Or:
```bash
ip addr show | grep "inet " | grep -v 127.0.0.1
```

Then use your IP address:
```javascript
const API_URL = 'http://192.168.1.5:3000'; // Replace with your actual IP
```

**Important:** Make sure your computer and mobile device are on the same WiFi network when using a physical device.

4. Start the Expo development server:

Windows:
```bash
npx expo start
```

Mac/Linux:
```bash
npx expo start
```

5. Run the app:
   - Press `a` for Android emulator
   - Press `i` for iOS simulator
   - Scan the QR code with Expo Go app on your physical device

**Usage**

First Time Setup

1. Launch the mobile app
2. Click "Sign Up" to create a new account
3. Enter your details (name, email, password)
4. After registration, you'll be automatically logged in

Using the App

1. Summary Tab: View total expenses grouped by category with real-time calculations
2. Expenses Tab: 
   - View all expenses in a paginated list (10 per page)
   - Filter by category using category buttons
   - Filter by date range using native date pickers
   - Navigate between pages using pagination controls
   - Edit or delete expenses with confirmation dialogs
3. Add Tab: Create new expenses with amount, category, date, and optional notes

**API Endpoints**

Authentication
- `POST /auth/register` - Register a new user
  - Body: `{ email, password, name }`
  - Returns: JWT token and user data

- `POST /auth/login` - Login user and receive JWT token
  - Body: `{ email, password }`
  - Returns: JWT token and user data

Expenses (Protected Routes - require Authorization header with JWT token)
- `POST /expenses` - Create a new expense
  - Body: `{ amount, category, date, note? }`
  
- `GET /expenses` - Get all expenses with filtering and pagination
  - Query params: 
    - `category` (optional) - Filter by expense category
    - `startDate` (optional) - Filter expenses from this date (YYYY-MM-DD)
    - `endDate` (optional) - Filter expenses until this date (YYYY-MM-DD)
    - `page` (default: 1) - Page number for pagination
    - `limit` (default: 10) - Number of items per page
  - Returns: Paginated list of expenses with metadata
  
- `GET /expenses/summary` - Get expense summary grouped by category
  - Returns: Object with category totals (e.g., `{ "Food": 12000, "Transport": 6000 }`)
  
- `PUT /expenses/:id` - Update an expense
  - Body: `{ amount?, category?, date?, note? }`
  
- `DELETE /expenses/:id` - Delete an expense

**Testing**

Backend Testing (using Postman or curl)

1. Register a user:

Windows (PowerShell):
```powershell
Invoke-RestMethod -Uri http://localhost:3000/auth/register -Method POST -ContentType "application/json" -Body '{"email":"test@example.com","password":"password123","name":"Test User"}'
```

Mac/Linux:
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'
```

2. Login:

Windows (PowerShell):
```powershell
Invoke-RestMethod -Uri http://localhost:3000/auth/login -Method POST -ContentType "application/json" -Body '{"email":"test@example.com","password":"password123"}'
```

Mac/Linux:
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

3. Use the received token for protected routes:

Windows (PowerShell):
```powershell
Invoke-RestMethod -Uri http://localhost:3000/expenses -Method GET -Headers @{"Authorization"="Bearer YOUR_TOKEN_HERE"}
```

Mac/Linux:
```bash
curl -X GET http://localhost:3000/expenses \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

Mobile App Testing

1. Register a new account through the app
2. Add multiple expenses with different categories and dates
3. Verify summary calculations on home screen
4. Test category filtering (select different categories)
5. Test date range filtering (select start and end dates)
6. Test pagination by adding more than 10 expenses and navigating pages
7. Test edit functionality by modifying an expense
8. Test delete functionality with confirmation dialog
9. Logout and login again to verify token persistence in AsyncStorage
10. Test protected routes by attempting to access tabs without login

**Troubleshooting**

Backend Issues

- **Database not found**: Run `npx prisma migrate dev --name init`
- **Port already in use**: 
  - Windows: `netstat -ano | findstr :3000` then `taskkill /PID <PID> /F`
  - Mac/Linux: `lsof -ti:3000 | xargs kill -9`
  - Or change PORT in `.env` file
- **JWT errors**: Ensure JWT_SECRET is set in `.env`
- **Prisma errors**: Try `npx prisma generate` to regenerate the Prisma client

Mobile App Issues

- **Cannot connect to backend**: 
  - Verify backend is running (`npm run dev` in my-app-backend folder)
  - Check API_URL in `src/services/api.js` matches your setup
  - For Android emulator, use `10.0.2.2` instead of `localhost`
  - For physical device, use your computer's IP address and ensure same WiFi network
  - Windows: Check if Windows Firewall is blocking Node.js
  - Mac: Check System Preferences > Security & Privacy > Firewall
  
- **App not loading**: 
  - Clear cache: `npx expo start -c`
  - Windows: Delete `node_modules` folder and run `npm install`
  - Mac/Linux: `rm -rf node_modules && npm install`
  - Restart the Expo development server
  
- **Authentication not working**:
  - Clear AsyncStorage by uninstalling and reinstalling the app
  - Verify token is being returned from backend
  - Check Network tab in React Native Debugger for API responses

**Environment Variables**

Backend `.env`
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key-here"
PORT=3000
```

**Technology Choices**

- **SQLite**: Chosen for simplicity and ease of setup. No need for external database installation or configuration. Perfect for development and small-scale applications. The database file is created automatically in the `prisma` folder.

- **Expo Router**: Implemented file-based routing for cleaner project structure and reduced boilerplate code. Routes are automatically generated from the file structure in the `app/` directory, making navigation intuitive and maintainable.

- **Prisma ORM**: Provides type-safe database queries and automatic migrations, simplifying database management and reducing potential errors.

- **Context API**: Lightweight state management solution suitable for this application's scope, avoiding the complexity of additional libraries like Redux.

**Security Implementation**

- JWT tokens stored securely in AsyncStorage on the mobile device
- Passwords hashed using bcrypt (10 salt rounds) before database storage
- All expense endpoints protected with JWT middleware
- Token verification on every protected route request
- CORS enabled for mobile app communication
- SQL injection prevention through Prisma's parameterized queries

**Key Features Implementation**

Pagination
- Implemented server-side pagination with configurable page size
- Returns total count and total pages for client-side navigation
- Default limit of 10 items per page

Filtering
- Category filtering: Exact match on category field
- Date range filtering: Supports startDate, endDate, or both
- Filters can be combined with pagination

Summary Calculations
- Server-side aggregation grouped by category
- Real-time calculation of totals
- Returns object with category-amount pairs

**Development Notes**

- The mobile app uses Expo Router (built on React Navigation) for navigation
- Authentication state managed through React Context API
- API calls centralized in `src/services/api.js` with Axios interceptors for token injection
- SQLite database managed by Prisma ORM
- Date pickers use native platform-specific components (iOS and Android)
- All dates stored in ISO format for consistency

**License**

This project is for assessment purposes.