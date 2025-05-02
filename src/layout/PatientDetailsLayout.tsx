import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { broadcastChange, onBroadcastChange } from '../utitlites/pglite-broadcast';
import PatientBasicDetails from '../components/PatientBasicDetails';
import PatientMedicalDetails from '../components/PatientMedicalDetails';
import UpdateDiagnosisForm from '../components/UpdateDiagnosisForm';
import { MedicalDetailsprovider, PatientsProvider } from '../utitlites/queries';

export default function PatientDetailsLayout() {
    const params = useParams();


    const [patient, setPatient] = useState<any>(null);
    const [medical, setMedical] = useState<any>(null);
    const [doctor, setDoctor] = useState('');
    const [consulted, setConsulted] = useState(false);
    const [preliminaryDiagnosis, setPreliminaryDiagnosis] = useState('');

    const [showSidebar, setShowSideBar]=useState(false);
    const fetchPatient = async () => {
        const id = params.patientId;
        if (!id) return;

        try {
            const patientResult = await PatientsProvider.getInstance().findPatientById(id);
            const medicalResult: any = await  MedicalDetailsprovider.getInstance().getByPatientId(id)
            
            setPatient(patientResult.rows[0] || null);
            setMedical(medicalResult.rows[0] || null);
            if(medicalResult && medicalResult.rows[0] && medicalResult.rows[0].consulted){
                setConsulted(medicalResult.rows[0].consulted)
                setPreliminaryDiagnosis(medicalResult.rows[0].preliminary_diagnosis)
                setDoctor(medicalResult.rows[0].attending_doctor)

            }
        } catch (error) {
            console.error('Error fetching patient:', error);
        }
    };
    useEffect(() => {
        fetchPatient();
    }, [params.patientId]);

     useEffect(()=>{
        onBroadcastChange(async ()=>{
         
         window.location.reload();
          
        })
      },[])
    const handleSave = async () => {
        if (patient && medical) {
          try {
           
            await MedicalDetailsprovider.getInstance().updateStatus({consulted, doctor, preliminaryDiagnosis, patientId: patient.id})
            setShowSideBar(false); 
            broadcastChange('db-updated')
            await fetchPatient()
          } catch (error) {
            console.error('Error updating medical details:', error);
          }
        }
      };
    if (!patient) {
        return <div className="p-6 text-center text-gray-500">Loading patient details...</div>;
    }

    return (
        <div className="flex h-screen relative">
         
            
            <PatientBasicDetails patient={patient} medical={medical}/>

            <PatientMedicalDetails medical={medical} />
          

            <button className='absolute bottom-10 right-10 p-2 rounded-lg bg-blue-500 text-white' onClick={()=>setShowSideBar(true)}>
                Update Status
            </button>

            {showSidebar && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-40 z-40"
            onClick={() => setShowSideBar(false)} 
          />
          <div
            className="fixed top-0 right-0 w-96 h-full bg-white shadow-xl z-50 p-6 transition-transform transform ease-in-out duration-300"
            style={{ transform: showSidebar ? 'translateX(0)' : 'translateX(100%)' }}
          >
           
            <UpdateDiagnosisForm doctor={doctor} setDoctor={setDoctor} consulted={consulted} setConsulted={setConsulted} preliminaryDiagnosis={preliminaryDiagnosis} setPreliminaryDiagnosis={setPreliminaryDiagnosis} handleSave={handleSave}  />
            <div>

            </div>
          </div>
        </>
      )}
        </div>
    );
}
