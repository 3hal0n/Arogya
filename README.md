# 🏥 Arogya Patient Management System

**Arogya** is a modern, web-based Patient Management System designed to streamline healthcare workflows for clinics, hospitals, and independent medical practitioners. With a strong focus on usability, automation, and visual engagement, Arogya simplifies managing patient records, appointments, and notifications — empowering healthcare providers to deliver efficient, timely care.

---

## 🚀 Key Features

- 📝 **Patient Registration**  
  Secure and intuitive onboarding with detailed forms and file uploads.

- 📅 **Appointment Scheduling**  
  Book, view, and manage appointments with real-time status tracking.

- 📊 **Admin Dashboard**  
  Centralized dashboard for managing patients, appointments, and users with visual status cards and data tables.

- 🔄 **Status Tracking**  
  Real-time appointment statuses: pending, confirmed, cancelled, and more.

- 📲 **Automated SMS Notifications**  
  Notify patients instantly when appointments are created, updated, or cancelled.

- 🔐 **User Authentication**  
  Secure login and verification for admins and patients using **Appwrite**.

- 📱 **Responsive Design**  
  Fully responsive and optimized for desktop, tablet, and mobile.

- 📎 **File Uploads**  
  Upload and manage patient documents and medical records.

- 🖼️ **3D Model Integration**  
  Interactive 3D models (Doctor, Hospital, Lab Machine, Computer) rendered via **React Three Fiber** and **Drei** on landing and success pages.

---

## 🧩 Architecture & Components

- **Frontend:** Built with modern **React** and **Next.js** using the `/app` directory.
- **Backend:** Powered by **Appwrite** for authentication, database, and serverless functions.
- **Styling:** Fully styled with **Tailwind CSS**.
- **Language:** Written in **TypeScript**.
- **3D Models:** Integrated using **React Three Fiber** and **Drei**, with `.glb` models.
- **Notifications:** SMS functionality using a third-party **SMS API**.

---

## 🧠 Core Components

### Forms & UI
- `PatientForm`, `RegisterForm`, `AppointmentForm`: For onboarding and appointment management.
- `FileUploader`: Uploads patient reports and documents.
- `AppointmentModal`, `DataTable`, `columns`: For displaying appointment data interactively.
- `StatusBadge`, `StatCard`, `AdminLogoutButton`: Dashboard elements for admins.

### 3D Model Components
- `Doctor`, `DoctorCanvas`
- `Hospital`
- `Panel`, `PanelCanvas`
- `Computer`, `ComputerCanvas`
- `LabMachine`

### Server Actions (`/lib/actions`)
- `appointment.actions.ts`:  
  - Create, update, and fetch appointments  
  - Fetch recent appointments for dashboard  
  - Send SMS notifications

- `patient.actions.ts`:  
  - Register patients  
  - Fetch patient details by user or document ID

- `validation.ts`:  
  - Zod schemas for patient and appointment form validation

---

## 🛠️ Tech Stack

| Layer       | Technology                                |
|-------------|-------------------------------------------|
| Frontend    | Next.js, React, Tailwind CSS, shadcn UI   |
| Backend     | Appwrite (Auth, DB, Functions)            |
| Language    | TypeScript                                |
| Styling     | Tailwind CSS                              |
| 3D Models   | React Three Fiber, Drei                   |
| Notifications | SMS API Integration                     |

---

## 📸 Screenshots

Included under snippets folder
---
