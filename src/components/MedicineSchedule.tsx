import React, { useState } from 'react';

const MedicationSchedule = () => {
  const [medicationData, setMedicationData] = useState([
    {
      id: 1,
      patient_id: 1,
      medicine_name: 'Paracetamol',
      dose_per_day: 3,
      no_of_days: 7,
      start_date: '2025-05-01',
      end_date: '2025-05-08',
      isEditing: false,  // Track edit state for each row
    },
    {
      id: 2,
      patient_id: 2,
      medicine_name: 'Ibuprofen',
      dose_per_day: 2,
      no_of_days: 5,
      start_date: '2025-05-02',
      end_date: '2025-05-06',
      isEditing: false,
    },
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, field: string) => {
    const updatedData = [...medicationData];
    updatedData[index][field] = e.target.value;
    setMedicationData(updatedData);
  };

  const handleEditToggle = (index: number) => {
    const updatedData = [...medicationData];
    updatedData[index].isEditing = !updatedData[index].isEditing;
    setMedicationData(updatedData);
  };

  const handleAddRow = () => {
    const newRow = {
      id: medicationData.length + 1, // Generate a new unique id
      patient_id: '',
      medicine_name: '',
      dose_per_day: '',
      no_of_days: '',
      start_date: '',
      end_date: '',
      isEditing: true, // Default to editing mode for new rows
    };
    setMedicationData([...medicationData, newRow]);
  };

  const handleDeleteRow = (index: number) => {
    const updatedData = medicationData.filter((_, i) => i !== index);
    setMedicationData(updatedData);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Editable Medication Schedule</h2>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border border-gray-300">Patient ID</th>
            <th className="px-4 py-2 border border-gray-300">Medicine Name</th>
            <th className="px-4 py-2 border border-gray-300">Dose Per Day</th>
            <th className="px-4 py-2 border border-gray-300">Number of Days</th>
            <th className="px-4 py-2 border border-gray-300">Start Date</th>
            <th className="px-4 py-2 border border-gray-300">End Date</th>
            <th className="px-4 py-2 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicationData.map((item, index) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border border-gray-300">
                {item.isEditing ? (
                  <input
                    type="text"
                    value={item.patient_id}
                    onChange={(e) => handleChange(e, index, 'patient_id')}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                ) : (
                  <span>{item.patient_id}</span>
                )}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                {item.isEditing ? (
                  <input
                    type="text"
                    value={item.medicine_name}
                    onChange={(e) => handleChange(e, index, 'medicine_name')}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                ) : (
                  <span>{item.medicine_name}</span>
                )}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                {item.isEditing ? (
                  <input
                    type="number"
                    value={item.dose_per_day}
                    onChange={(e) => handleChange(e, index, 'dose_per_day')}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                ) : (
                  <span>{item.dose_per_day}</span>
                )}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                {item.isEditing ? (
                  <input
                    type="number"
                    value={item.no_of_days}
                    onChange={(e) => handleChange(e, index, 'no_of_days')}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                ) : (
                  <span>{item.no_of_days}</span>
                )}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                {item.isEditing ? (
                  <input
                    type="date"
                    value={item.start_date}
                    onChange={(e) => handleChange(e, index, 'start_date')}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                ) : (
                  <span>{item.start_date}</span>
                )}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                {item.isEditing ? (
                  <input
                    type="date"
                    value={item.end_date}
                    onChange={(e) => handleChange(e, index, 'end_date')}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                ) : (
                  <span>{item.end_date}</span>
                )}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                <button
                  onClick={() => handleEditToggle(index)}
                  className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
                >
                  {item.isEditing ? 'Save' : 'Edit'}
                </button>
                {
                    !item.isEditing &&
                <button
                  onClick={() => handleDeleteRow(index)}
                  className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 ml-2"
                >
                  Delete
                </button>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleAddRow}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Add New Row
      </button>
    </div>
  );
};

export default MedicationSchedule;
