import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { usePGlite } from '@electric-sql/pglite-react';

export default function PatientDetailsLayout() {
    const params = useParams();
    const db = usePGlite();

    const [patient, setPatient] = useState<any>(null);
    const [medical, setMedical] = useState<any>(null);
    const [doctor, setDoctor] = useState('');
    const [consulted, setConsulted] = useState(false);
    const [preliminaryDiagnosis, setPreliminaryDiagnosis] = useState('');

    const [showSidebar, setShowSideBar]=useState(false);
    const fetchPatient = async () => {
        const id = params.patientId;
        if (!db || !id) return;

        try {
            const patientResult = await db.query(`SELECT * FROM patients WHERE id = ${id}`);
            const medicalResult: any = await db.query(`SELECT * FROM medical_details WHERE patient_id = ${id}`);
            
            setPatient(patientResult.rows[0] || null);
            setMedical(medicalResult.rows[0] || null);
            if(medicalResult.rows[0] && medicalResult.rows[0].consulted){
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
    }, [db, params.patientId]);
    const handleSave = async () => {
        if (patient && medical) {
          try {
            await db.query(`
              UPDATE medical_details
              SET attending_doctor = '${doctor}', consulted = ${consulted}, preliminary_diagnosis = '${preliminaryDiagnosis}'
              WHERE patient_id = ${patient.id};
            `);
            setShowSideBar(false); // Close the sidebar
    
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
         
            <div className="w-1/4 p-6 bg-white shadow-md border-r overflow-y-auto">
                <h2 className="text-2xl font-bold mb-6">Patient Info</h2>
                <div className="space-y-3 text-gray-700">
                    <p><strong>Name:</strong> {patient.name}</p>
                    <p><strong>Age:</strong> {patient.age}</p>
                    <p><strong>Gender:</strong> {patient.gender}</p>
                    <p><strong>Phone:</strong> {patient.phone}</p>
                    <p><strong>Address:</strong> {patient.address}</p>
                    
                    <p><strong>Consulted</strong> {medical.consulted ? 'Yes': 'No'} </p>
                    <p><strong>Doctor</strong> {medical.attending_doctor!=='null' ? medical.attending_doctor: 'Not yet assigned'} </p>

                    
                </div>
            </div>

            {/* Right Panel: Medical Info */}
            <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
                <h2 className="text-2xl font-semibold mb-4">Medical Details</h2>
                {medical ? (
                    <><div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Blood Group */}
                        <div className="bg-white p-4 rounded-xl shadow">
                            <h3 className="text-lg font-bold mb-2">Blood Group</h3>
                            <p className="text-gray-700">{medical.blood_group || 'N/A'}</p>
                        </div>

                        {/* Medical History */}
                        <div className="bg-white p-4 rounded-xl shadow">
                            <h3 className="text-lg font-bold mb-2">Medical History</h3>
                            {medical.medical_history ? (
                                <ul className="list-disc list-inside text-gray-700">
                                    {medical.medical_history.split(',').map((item: string, idx: number) => (

                                        <li key={idx}>{item.trim()}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500">None reported</p>
                            )}
                        </div>

                        {/* Allergies */}
                        <div className="bg-white p-4 rounded-xl shadow">
                            <h3 className="text-lg font-bold mb-2">Allergies</h3>
                            {medical.allergies ? (
                                <ul className="list-disc list-inside text-gray-700">
                                    {medical.allergies
                                        .split(',')
                                        .map((item: string) => item.trim())
                                        .filter((item: string | string[]) => item.length > 0)
                                        .map((item: string, idx: number) => (
                                            <li key={idx}>{item}</li>
                                        ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500">None reported</p>
                            )}
                        </div>

                        {/* Diseases */}
                        <div className="bg-white p-4 rounded-xl shadow">
                            <h3 className="text-lg font-bold mb-2">Diseases</h3>
                            {medical.diseases ? (
                                <ul className="list-disc list-inside text-gray-700">
                                    {medical.diseases.split(',').map((item: string, idx: number) => (
                                        <li key={idx}>{item.trim()}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500">None reported</p>
                            )}
                        </div>
                        
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow mt-8">
                    <h3 className="text-lg font-bold mb-2">Diagnosis by doctor</h3>
                    {medical.preliminary_diagnosis ==='null' ? 
                         <p className="text-gray-500">Still waiting</p>: <ul>
                            {medical.preliminary_diagnosis.split(',').map((item: string, idx: number)=>{
                                if(item && item.trim()) return <li key={idx}>{item.trim()}</li>
                            })}
                         </ul>
                }
                    </div>
                    </>
                ) : (
                    <p className="text-gray-500">No medical details found.</p>
                )}
            </div>

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
            <h2 className="text-xl font-semibold mb-4">Update Medical Status</h2>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Attending Doctor</label>
                <input
                  type="text"
                  value={doctor}
                  onChange={(e) => setDoctor(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Consulted?</label>
                <input
                  type="checkbox"
                  checked={consulted}
                  onChange={(e) => setConsulted(e.target.checked)}
                  className="p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Preliminary Diagnosis</label>
                <textarea
                  value={preliminaryDiagnosis}
                  onChange={(e) => setPreliminaryDiagnosis(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  rows={4}
                />
              </div>

              <button
                onClick={handleSave}
                className="w-full bg-blue-500 text-white py-2 rounded-lg"
              >
                Save Changes
              </button>
            </div>
          </div>
        </>
      )}
        </div>
    );
}
