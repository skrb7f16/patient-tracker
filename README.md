# 🏥 Patient Registration App (React + PGlite)

This is a lightweight offline-first **patient registration web application** built with **React**, **PGlite (SQLite in the browser)**, and **React Router**. It allows healthcare staff to:

- Register new patients via a two-step form
- Record medical history
- Search and view existing patients
- Work across multiple browser tabs with real-time sync

---

## 🔧 Features

- Two-tab layout:
  - **Add Patient**: A two-part form for personal info and medical details
  - **Search Patient**: Lookup patients and view full details
- Offline-ready using PGlite + IndexedDB
- Multi-tab data synchronization
- Broadcast-based communication to auto-refresh or reload tabs when new patients are added
- **Medication Management**
  - Editable medication schedule table per patient.
  - Auto-calculated `end_date` based on `start_date + no_of_days`.

- **Multi-tab support**: Data remains reactive across browser tabs.
- **IndexedDB storage** using PGlite (`idb://patients-record`).
- **Styled with Tailwind CSS**.

---

## 📁 Project Structure


---

## 🗄️ Database Schema

Powered by [`@electric-sql/pglite`](https://github.com/electric-sql/pglite), the schema includes two tables: `patients` and `medical_details`.

### `patients` Table

| Column   | Type    | Description                 |
|----------|---------|-----------------------------|
| `id`     | SERIAL  | Primary key                 |
| `name`   | TEXT    | Patient's full name         |
| `age`    | INTEGER | Age                         |
| `gender` | TEXT    | Gender                      |
| `phone`  | TEXT    | Contact number              |
| `address`| TEXT    | Full residential address     |

### `medical_details` Table

| Column                 | Type     | Description                                  |
|------------------------|----------|----------------------------------------------|
| `id`                   | SERIAL   | Primary key                                  |
| `patient_id`           | INTEGER  | Foreign key referencing `patients(id)`       |
| `blood_group`          | TEXT     | A+, B-, etc.                                 |
| `medical_history`      | TEXT     | Past illnesses, surgeries, etc.              |
| `allergies`            | TEXT     | Known allergies                              |
| `diseases`             | TEXT     | Chronic or diagnosed diseases                |
| `attending_doctor`     | TEXT     | Doctor assigned to the patient               |
| `consulted`            | BOOLEAN  | Whether the patient has been seen (default: false) |
| `preliminary_diagnosis`| TEXT     | Doctor's initial diagnosis or notes          |

---
### `medicine engagment` Table
| Column Name     | Data Type | Constraints                  | Description                                             |
|------------------|------------|------------------------------|---------------------------------------------------------|
| `id`             | SERIAL     | PRIMARY KEY                  | Unique identifier for each medication entry             |
| `patient_id`     | INTEGER    | REFERENCES patients(id)      | Links medication to a specific patient                  |
| `medicine_name`  | TEXT       |                              | Name of the prescribed medicine                         |
| `dose_per_day`   | INTEGER    |                              | Number of doses to be taken per day                     |
| `no_of_days`     | INTEGER    |                              | Duration in days for the medication                     |
| `start_date`     | DATE       |                              | Date when the medication starts                         |
| `end_date`       | DATE       |                              | Computed date when the medication ends                  |

## 🚀 Setup Instructions

### 1. Install dependencies

```bash
npm install
npm run dev
```

## For docker build
```bash
docker build -t patient-records . && docker run -p 3000:80 patient-records
```



## 🔮 Future Scope

- **Web Worker Sync**: Implement a background Web Worker that can periodically or manually send the entire patient database (or diffs) to a backend server for backup and centralized record-keeping.

- **Cloud Backup & Restore**: Allow syncing of offline PGlite data to cloud storage and provide a restore mechanism for lost or transferred data.

- **Role-Based Authentication**: Add login and access controls for doctors, admins, and front desk staff with different permissions and dashboard views.

- **Appointment Scheduling**: Extend the app to handle appointment booking, availability tracking, and visit history.