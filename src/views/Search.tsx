import { useState, useEffect } from 'react';
import { usePGlite } from '@electric-sql/pglite-react';
import {  useNavigate } from 'react-router-dom';

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [patients, setPatients] = useState<any[]>([]);
  const db = usePGlite(); 
  const navigate = useNavigate();

  const fetchPatients = async () => {
    let query = `SELECT * FROM patients`;


    if (searchTerm) {
      query += ` WHERE LOWER(name) LIKE LOWER('%${searchTerm}%') OR phone LIKE LOWER('%${searchTerm}%');`;
  
    }

    console.log(query)

    // Execute the query to fetch patients
    const results = await db.query(query);
    console.log(results)
    setPatients(results.rows);
  };

  // Search logic
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetchPatients();
  };

  // Effect to load all patients when the page is loaded
  useEffect(() => {
    fetchPatients();
  }, []);

  const handleRedirectToPatient=(id: number)=>{
    navigate(`/p/${id}`)
  }

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-4">Search Patients</h2>

      <form onSubmit={handleSearch} className="mb-6 flex item-center gap-6 w-full">
        
          <input
            type="text"
            placeholder="Search by name or phone"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          />
     

        <button
          type="submit"
          className=" bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 "
        >
          Search
        </button>
      </form>

      <div className="mt-6 overflow-x-auto">
        {patients.length > 0 ? (
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b text-left">Name</th>
                <th className="py-2 px-4 border-b text-left">Age</th>
                <th className="py-2 px-4 border-b text-left">Gender</th>
                <th className="py-2 px-4 border-b text-left">Phone</th>


              </tr>
            </thead>
            <tbody>
              {patients.map((patient: any) => (
               
                <tr key={patient.id} className="hover:bg-gray-50" onClick={()=>handleRedirectToPatient(patient.id)}>
                  <td className="py-2 px-4 border-b">{patient.name}</td>
                  <td className="py-2 px-4 border-b">{patient.age}</td>
                  <td className="py-2 px-4 border-b">{patient.gender}</td>
                  <td className="py-2 px-4 border-b">{patient.phone}</td>

                </tr>
      
              ))}
            </tbody>
          </table>
        ) : (
          <p>No patients found</p>
        )}
      </div>
    </div>
  );
}
