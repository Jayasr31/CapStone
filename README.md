# 🎉 CelebrateSpot

> **A Full-Stack Party Hall Booking Platform**

CelebrateSpot is a premium party hall booking web application built with **.NET 6 WebAPI** on the backend and **Angular 14** on the frontend. It allows customers to browse, filter, and book party halls, while admins can manage venues, bookings, and reviews — all with a beautiful luxury gold/navy UI theme.

---

## 🖥️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | .NET 6 WebAPI (C#) |
| ORM | Entity Framework Core 6 |
| Database | MS SQL Server |
| Authentication | JWT Bearer Tokens |
| Frontend | Angular 14 (TypeScript) |
| Styling | CSS3 with custom luxury theme |
| HTTP Client | Angular HttpClient |

---

## 📁 Project Structure

```
celebratespot/
├── dotnetapp/                  # .NET 6 WebAPI Backend
│   ├── Controllers/            # API Controllers
│   │   ├── UserController.cs
│   │   ├── PartyHallController.cs
│   │   ├── BookingController.cs
│   │   └── ReviewController.cs
│   ├── Data/
│   │   └── ApplicationDbContext.cs
│   ├── Exceptions/
│   │   └── PartyHallException.cs
│   ├── Models/
│   │   ├── User.cs
│   │   ├── UserRoles.cs
│   │   ├── LoginModel.cs
│   │   ├── PartyHall.cs
│   │   ├── Booking.cs
│   │   └── Review.cs
│   ├── Services/
│   │   ├── UserService.cs
│   │   ├── PartyHallService.cs
│   │   ├── BookingService.cs
│   │   └── ReviewService.cs
│   ├── Program.cs
│   ├── appsettings.json
│   └── dotnetapp.csproj
│
└── angularapp/                 # Angular 14 Frontend
    └── src/app/
        ├── components/
        │   ├── navbar/
        │   ├── login/
        │   ├── register/
        │   ├── home/
        │   ├── admin-dashboard/
        │   ├── admin-add-party-hall/
        │   ├── admin-view-party-hall/
        │   ├── admin-view-booking/
        │   ├── customer-view-party-hall/
        │   ├── customer-view-booking/
        │   ├── add-review/
        │   ├── developer/
        │   └── not-found/
        ├── guards/
        │   └── auth.guard.ts
        ├── models/
        ├── pipes/
        └── services/
```

---

## ⚡ Quick Start

### Prerequisites
- [.NET 6 SDK](https://dotnet.microsoft.com/download/dotnet/6.0)
- [Node.js v20](https://nodejs.org/) (use `nvm use 20`)
- MS SQL Server running locally
  - User: `sa` | Password: `examlyMssql@123`

---

### 🖥️ Run the Backend (Terminal 1)

```bash
cd dotnetapp

# Restore packages
dotnet restore

# Install EF Core CLI tools (first time only)
dotnet new tool-manifest
dotnet tool install --local dotnet-ef --version 6.0.6

# Create & apply database migrations
dotnet dotnet-ef migrations add "InitialSetup"
dotnet dotnet-ef database update

# Start the API server on port 8080
dotnet run
```

✅ Backend running at: **http://localhost:8080**  
✅ Swagger UI at: **http://localhost:8080/swagger**

---

### 🌐 Run the Frontend (Terminal 2)

```bash
nvm use 20
cd angularapp

# Install dependencies
npm install

# Start Angular dev server on port 8081
npm start
```

✅ Frontend running at: **http://localhost:8081**

---

## 🔑 Credentials & Keys

| Item | Value |
|------|-------|
| 🔐 Admin Secret Key | `ADMIN_SECRET_2024` |
| 🗄️ DB Server | `localhost` |
| 🗄️ DB Name | `appdb` |
| 👤 DB User | `sa` |
| 🔒 DB Password | `examlyMssql@123` |
| 🌐 Backend Port | `8080` |
| 🌐 Frontend Port | `8081` |

> **Note:** Use the Admin Secret Key when registering as an Admin — enter it in the "Admin Key" field on the Register page.

---

## 🛣️ API Endpoints

| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/register` | Public |
| POST | `/api/login` | Public |
| GET | `/api/PartyHall` | Authorized |
| POST | `/api/PartyHall` | Authorized |
| PUT | `/api/PartyHall/{id}` | Authorized |
| DELETE | `/api/PartyHall/{id}` | Authorized |
| GET | `/api/booking` | Authorized |
| POST | `/api/booking` | Authorized |
| PUT | `/api/booking/{id}` | Authorized |
| DELETE | `/api/booking/{id}` | Authorized |
| GET | `/api/user/{userId}` | Authorized |
| GET | `/api/Review` | Authorized |
| POST | `/api/Review` | Authorized |
| GET | `/api/Review/{userId}` | Authorized |

---

## ✨ Features

### Admin
- ➕ Add / Edit / Delete party halls
- 📋 View and manage all bookings
- 🔄 Update booking status (Pending → Confirmed / Completed / Cancelled)
- ⭐ View all customer reviews

### Customer
- 🔍 Browse and filter party halls by price, capacity, theme, location
- 📅 Book a hall with date picker and auto price calculation
- 📋 View and cancel personal bookings
- ⭐ Submit and view personal reviews

### General
- 🔐 JWT authentication with role-based access (Admin / Customer)
- 🛡️ Angular Auth Guards for protected routes
- 🎨 Luxury gold/navy responsive UI
- 📱 Mobile-friendly responsive design

---

## ⚠️ Troubleshooting

**Angular won't start?**
```bash
rm -rf node_modules
npm install
npm start
```

**Database errors?**
```bash
dotnet dotnet-ef database drop
dotnet dotnet-ef migrations remove
dotnet dotnet-ef migrations add "InitialSetup"
dotnet dotnet-ef database update
```

**Port already in use?**
```bash
lsof -ti:8080 | xargs kill -9
lsof -ti:8081 | xargs kill -9
```

---

## 👥 Developers

| Name | Role |
|------|------|
| Arjun Sharma | Full Stack Developer |
| Priya Patel | Frontend Developer |
| Rahul Mehta | Database Engineer |
| Kavya Reddy | UI/UX Designer |

---

## 📄 License

This project is for educational purposes.
