

const PatientBasicDetails = ({ patient, medical }: { patient: any, medical: any }) => {
    return (
        <div className="w-1/4 p-6 bg-white shadow-md border-r overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">Patient Info</h2>
            <div className="space-y-3 text-gray-700">
                <p><strong>Name:</strong> {patient.name}</p>
                <p><strong>Age:</strong> {patient.age}</p>
                <p><strong>Gender:</strong> {patient.gender}</p>
                <p><strong>Phone:</strong> {patient.phone}</p>
                <p><strong>Address:</strong> {patient.address}</p>

                <p><strong>Consulted</strong> {medical.consulted ? 'Yes' : 'No'} </p>
                <p><strong>Doctor</strong> {medical.attending_doctor !== 'null' ? medical.attending_doctor : 'Not yet assigned'} </p>


            </div>
        </div>
    )
}

export default PatientBasicDetails