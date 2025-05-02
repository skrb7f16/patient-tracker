
import MedicationSchedule from './MedicineSchedule'

const PatientMedicalDetails = ({medical}: {medical: any}) => {
  return (
    <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
    <h2 className="text-2xl font-semibold mb-4">Medical Details</h2>
    {medical ? (
        <><div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="bg-white p-4 rounded-xl shadow">
                <h3 className="text-lg font-bold mb-2">Blood Group</h3>
                <p className="text-gray-700">{medical.blood_group || 'N/A'}</p>
            </div>

   
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
        {
            medical && medical.consulted && <div className="bg-white p-4 rounded-xl shadow mt-8">
            <MedicationSchedule medical={medical}/>
        </div>
        }
        
        </>
    ) : (
        <p className="text-gray-500">No medical details found.</p>
    )}
</div>
  )
}

export default PatientMedicalDetails