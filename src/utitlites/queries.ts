// PatientsProvider.ts

import { PGliteWithLive } from '@electric-sql/pglite/live';
import { formatDate } from './helpers';

export class PatientsProvider {
  private static instance: PatientsProvider;
  private db: PGliteWithLive;

  private constructor(db: PGliteWithLive) {
    this.db = db;
  }

  // Singleton initializer
  public static init(db: PGliteWithLive): PatientsProvider {
    if (!PatientsProvider.instance) {
      PatientsProvider.instance = new PatientsProvider(db);
    }
    return PatientsProvider.instance;
  }

  // Get the existing instance
  public static getInstance(): PatientsProvider {
    if (!PatientsProvider.instance) {
      throw new Error('PatientsProvider instance not initialized. Call PatientsProvider.init(db) first.');
    }
    return PatientsProvider.instance;
  }

  // Dummy method: Get all patients
  public async fetchPatients(searchTerm?: string) {
    let query = `SELECT * FROM patients`;


    if (searchTerm && searchTerm.length > 0) {
      query += ` WHERE LOWER(name) LIKE LOWER('%${searchTerm}%') OR phone LIKE LOWER('%${searchTerm}%');`;

    }


    return this.db.query(query);
  }

  public async addPatient(data: {
    name: string;
    age: number;
    gender: string;
    phone: string;
    address: string;
  }) {
    const { name, age, gender, phone, address } = data;
    return await this.db.query(`
        INSERT INTO patients (name, age, gender, phone, address)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id;
        `, [name, age, gender, phone, address]);
  }

  public async findPatientById(id: any) {
    return this.db.query(`SELECT * FROM patients WHERE id = ${id};`);
  }
}




export class MedicalDetailsprovider {
  private static instance: MedicalDetailsprovider;
  private db: PGliteWithLive;

  private constructor(db: PGliteWithLive) {
    this.db = db;
  }


  public static init(db: PGliteWithLive): MedicalDetailsprovider {
    if (!MedicalDetailsprovider.instance) {
      MedicalDetailsprovider.instance = new MedicalDetailsprovider(db);
    }
    return MedicalDetailsprovider.instance;
  }


  public static getInstance(): MedicalDetailsprovider {
    if (!MedicalDetailsprovider.instance) {
      throw new Error('MedicalDetailsprovider instance not initialized. Call MedicalDetailsprovider.init(db) first.');
    }
    return MedicalDetailsprovider.instance;
  }




  public async addMedicalDetails(data: {
    patientId: number;
    bloodGroup?: string;
    medicalHistory?: string;
    allergies?: string;
    diseases?: string;

  }) {
    const {
      patientId,
      bloodGroup = '',
      medicalHistory = '',
      allergies = '',
      diseases = '',

    } = data;

    return await this.db.exec(`
        INSERT INTO medical_details (patient_id, blood_group, medical_history, allergies, diseases, attending_doctor, consulted, preliminary_diagnosis)
        VALUES (${patientId}, '${bloodGroup}', '${medicalHistory}', '${allergies}', '${diseases}', '${null}', ${false}, '${null}')
        `);
  }


  public async getByPatientId(patientId: any) {
    return this.db.query(`SELECT * FROM medical_details WHERE patient_id = ${patientId};`);
  }

  public async updateStatus(data: { consulted: boolean, doctor: string, preliminaryDiagnosis: string, patientId: any }) {
    return await this.db.query(`
        UPDATE medical_details
        SET attending_doctor = '${data.doctor}', consulted = ${data.consulted}, preliminary_diagnosis = '${data.preliminaryDiagnosis}'
        WHERE patient_id = ${data.patientId};
      `);
  }
}





export class MedicationScheduleProvider {
  private static instance: MedicationScheduleProvider;
  private db: PGliteWithLive;

  private constructor(db: PGliteWithLive) {
    this.db = db;
  }


  public static init(db: PGliteWithLive): MedicationScheduleProvider {
    if (!MedicationScheduleProvider.instance) {
      MedicationScheduleProvider.instance = new MedicationScheduleProvider(db);
    }
    return MedicationScheduleProvider.instance;
  }

  public static getInstance(): MedicationScheduleProvider {
    if (!MedicationScheduleProvider.instance) {
      throw new Error('MedicationScheduleProvider instance not initialized. Call MedicationScheduleProvider.init(db) first.');
    }
    return MedicationScheduleProvider.instance;
  }




  // Get medication by patient ID
  public async getByPatientId(patientId: number) {
    return await this.db.query(`SELECT * FROM medication_schedule WHERE patient_id = ${patientId};`);
  }

  public async updateMedecines(changed: any) {
    return await this.db.query(`update medication_schedule set medicine_name='${changed.medicine_name}', dose_per_day=${changed.dose_per_day}, no_of_days=${changed.no_of_days}, start_date='${formatDate(new Date(changed.start_date))}', end_date='${formatDate(new Date(changed.start_date))}' WHERE id=${changed.id};`);
  }

  public async addMedication(changed: any) {


    return await this.db.exec(`
                        INSERT INTO medication_schedule (
                          patient_id,
                          medicine_name,
                          dose_per_day,
                          no_of_days,
                          start_date,
                          end_date
                        ) VALUES (
                          ${changed.patient_id},
                          '${changed.medicine_name}',
                          ${changed.dose_per_day},
                          ${changed.no_of_days},
                         '${formatDate(new Date(changed.start_date))}',
                        ' ${formatDate(new Date(changed.start_date))}'
                        );
                      `);
  }

 

  // Delete medication entry
  public async deleteMedication(id: number) {
    await this.db.exec(`DELETE FROM medication_schedule WHERE id = ${id};`);
  }
}

