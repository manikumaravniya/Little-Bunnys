# Little Bloom Store + Admin Dashboard

This project now includes:

- React + Tailwind storefront
- Admin authentication
- Full product management (Add, Edit, Delete)
- Cloudinary image upload
- Node.js/Express REST API with JSON-file persistence

## Stack

- Frontend: Vite + React + TypeScript + Tailwind + shadcn/ui
- Backend: Express (ESM) + JWT auth + Multer + Cloudinary
- Storage: `backend/data/products.json`

## Project Structure

```
kids-style-showcase/
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── pages/
│   │   │   ├── AdminLogin.tsx          # Admin login page
│   │   │   └── AdminDashboard.tsx      # Product management dashboard
│   │   ├── components/
│   │   │   ├── admin/ProductFormDialog.tsx  # Add/Edit product form
│   │   │   ├── RequireAdminAuth.tsx         # Route guard
│   │   │   └── ...
│   │   └── lib/
│   │       ├── api.ts              # Frontend API client
│   │       └── admin-auth.ts       # Admin token helpers
│   ├── package.json
│   └── vite.config.ts
├── backend/               # Express API server
│   ├── src/
│   │   ├── server.js                 # Express server entry
│   │   ├── routes/
│   │   │   ├── adminRoutes.js        # /api/admin/login
│   │   │   └── productRoutes.js      # /api/products CRUD
│   │   ├── middleware/
│   │   │   ├── auth.js               # JWT auth middleware
│   │   │   └── upload.js             # Multer config
│   │   ├── services/
│   │   │   └── productStore.js       # JSON read/write logic
│   │   └── config/
│   │       ├── cloudinary.js         # Cloudinary upload
│   │       └── env.js                # Environment variables
│   ├── data/
│   │   └── products.json             # Product storage
│   └── package.json
├── .env                   # Environment variables (create from .env.example)
├── .env.example
└── package.json           # Workspace orchestrator
```

## API Endpoints

- `POST /api/admin/login`
- `GET /api/products`
- `POST /api/products` (admin token required)
- `PUT /api/products/:id` (admin token required)
- `DELETE /api/products/:id` (admin token required)

## Setup

1. Install dependencies for all packages:

```bash
npm run install:all
```

This will install dependencies in root, frontend/, and backend/ folders.

Alternatively, install manually:

```bash
# Install root workspace dependencies
npm install

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
cd ..
```

2. Create `.env` in project root from `.env.example`:

```bash
copy .env.example .env
```

3. Fill in your values in `.env`:

- `ADMIN_USERNAME` and `ADMIN_PASSWORD` for admin login
- `JWT_SECRET` for token signing
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- Optional: `CLOUDINARY_FOLDER`

4. Run frontend + backend together:

```bash
npm run dev
```

This starts both servers concurrently:
- Frontend: `http://localhost:8080`  
- Backend: `http://localhost:5000`

Or run them separately:

```bash
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend
npm run dev:frontend
```

## Admin Access

- Login URL: `http://localhost:8080/admin/login`
- After login, you are redirected to `/admin/dashboard`
- If credentials are wrong, an error message is shown

## How to set your own admin username/password

Update these values in `.env`:

```env
ADMIN_USERNAME=your_username
ADMIN_PASSWORD=your_password
```

Restart backend server after changing env variables.

## Notes

- New products require image upload.
- Editing allows keeping old image or uploading a new one.
- Delete action prompts for confirmation.
