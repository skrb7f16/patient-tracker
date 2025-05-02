import { useState } from 'react';
import BasicInfoForm from '../components/BasicInfoForm';
import MedicalDetailsForm from '../components/MedicalDetailsForm';
import ResultPage from '../components/RegistrationResult';
import { broadcastChange } from '../utitlites/pglite-broadcast';
import { MedicalDetailsprovider, PatientsProvider } from '../utitlites/queries';

export default function PatientRegistration() {
  const [step, setStep] = useState(1);
  const [basicInfo, setBasicInfo] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState<'success' | 'failure' | null>(null);


  const handleNext = (data: any) => {
    setBasicInfo(data);
    setStep(2);
  };

  const handleBack = () => setStep(1);
  const escape = (str: string) => str.replace(/'/g, "''");

  const handleSubmit = async (finalData: any) => {

    console.log('Saving patient to DB:', finalData);
    let patientId =  -1;
    try {

      const name = escape(finalData.name);
      const age = parseInt(finalData.age);
      const gender = escape(finalData.gender);
      const phone = escape(finalData.phone);
      const address = escape(finalData.address);
      const resultSet: any = await PatientsProvider.getInstance().addPatient({name, age, gender, phone, address});
      console.log(resultSet)
      patientId = resultSet.rows[0]?.id;
      console.log(patientId)
      if (patientId) {
        const bloodGroup = escape(finalData.bloodGroup);
        const medicalHistory = escape(finalData.medicalHistory);
        const allergies = escape(finalData.allergies);
        const diseases = escape(finalData.diseases);

        // await db.exec(`
        // INSERT INTO medical_details (patient_id, blood_group, medical_history, allergies, diseases, attending_doctor, consulted, preliminary_diagnosis)
        // VALUES (${patientId}, '${bloodGroup}', '${medicalHistory}', '${allergies}', '${diseases}', '${null}', ${false}, '${null}')
        // `);

        await MedicalDetailsprovider.getInstance().addMedicalDetails({patientId, bloodGroup, medicalHistory, allergies, diseases})

        alert('Patient Registered!');
        setSubmissionStatus('success')
        broadcastChange('db-updated', {
          type: 'patient-added'
        });
      }

    }

    catch (err: any) {
      console.log('Failed', err);
      setSubmissionStatus('failure')
    }

    setStep(3)
    
    setBasicInfo(null);
  };


  return step === 1 ? (
    <BasicInfoForm onNext={handleNext} basicInfo={basicInfo} />
  ) : (
    step === 2 ? <MedicalDetailsForm onBack={handleBack} onSubmit={handleSubmit} basicInfo={basicInfo} />
      : <ResultPage submissionStatus={submissionStatus}
        onBack={handleBack} />
  );
}
