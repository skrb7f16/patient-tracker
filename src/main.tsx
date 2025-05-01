import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { PGlite } from '@electric-sql/pglite';
import { live } from '@electric-sql/pglite/live';
import { PGliteProvider } from '@electric-sql/pglite-react';
import { RouterProvider } from 'react-router-dom';
import router from './router';

async function initApp() {
  const db = await PGlite.create({
    extensions: { live },
    dataDir: 'idb://patients-record',
  });

  // Drop tables if they exist (for dev reset)
  // await db.exec(`DROP TABLE IF EXISTS medical_details;`);
  // await db.exec(`DROP TABLE IF EXISTS patients;`);

  // Create patients table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS patients (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      age INTEGER NOT NULL,
      gender TEXT NOT NULL,
      phone TEXT NOT NULL,
      address TEXT NOT NULL
    );
  `);

  // Create medical_details table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS medical_details (
      id SERIAL PRIMARY KEY,
      patient_id INTEGER REFERENCES patients(id),
      blood_group TEXT,
      medical_history TEXT,
      allergies TEXT,
      diseases TEXT,
      attending_doctor TEXT,
      consulted BOOLEAN DEFAULT false,
      preliminary_diagnosis TEXT
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS medication_schedule (
  id SERIAL PRIMARY KEY,
  patient_id INTEGER REFERENCES patients(id),
  medicine_name TEXT NOT NULL,
  dose_per_day INTEGER NOT NULL,
  no_of_days INTEGER NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL
);
`)


  const rootEl = document.getElementById('root');
  if (!rootEl) throw new Error('Root element not found');

  createRoot(rootEl).render(
    <StrictMode>
      <PGliteProvider db={db}>
        <RouterProvider router={router} />
      </PGliteProvider>
    </StrictMode>
  );
}

initApp();
