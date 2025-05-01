

const UpdateDiagnosisForm = ({doctor, setDoctor, consulted, setConsulted, preliminaryDiagnosis, setPreliminaryDiagnosis, handleSave }: {doctor: string, setDoctor: any, consulted: boolean, setConsulted: any, preliminaryDiagnosis: string, setPreliminaryDiagnosis: any, handleSave: any}) => {
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
    </>
  )
}

export default UpdateDiagnosisForm