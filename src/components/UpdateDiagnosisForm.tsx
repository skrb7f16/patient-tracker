import { useState } from "react"


const UpdateDiagnosisForm = ({doctor, setDoctor, consulted, setConsulted, preliminaryDiagnosis, setPreliminaryDiagnosis, handleSave }: {doctor: string, setDoctor: any, consulted: boolean, setConsulted: any, preliminaryDiagnosis: string, setPreliminaryDiagnosis: any, handleSave: any}) => {
    const [errors, setErrors]=useState({
      doctor: '',
      preliminaryDiagnosis: '',
      
    })

    const validate = ()=>{
      const errorUpdated = errors
      if(doctor.length<3){
        errorUpdated.doctor='Invalid Doctor'
      
      }
      if(preliminaryDiagnosis.length<20) {
        errorUpdated.preliminaryDiagnosis='Please enter at least 5 words in diagnosis';
      }
      if(errorUpdated.doctor.length === 0 && errorUpdated.preliminaryDiagnosis .length===0) return true;
      setErrors({...errorUpdated});
      return false;
    }
    const saveDetails= ()=>{
      if(validate()){
        handleSave();
      }
    }
  
  return (
    <>
     <h2 className="text-xl font-semibold mb-4">Update Medical Status</h2>

  
<div className="space-y-4" >
  <div>
    <label className="block text-sm font-medium">Attending Doctor</label>
    <input
      type="text"
      value={doctor}
      onChange={(e) => setDoctor(e.target.value)}
      className="w-full p-2 border rounded-lg"
    />
      <p className="m-0 text-red-600">{errors.doctor}</p>
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
    <p className="m-0 text-red-600">{errors.preliminaryDiagnosis}</p>
  </div>

  <button
    onClick={saveDetails}
    className="w-full bg-blue-500 text-white py-2 rounded-lg"
  >
    Save Changes
  </button>
</div>
    </>
  )
}

export default UpdateDiagnosisForm