import React, { useEffect, useState } from 'react';
import { broadcastChange, onBroadcastChange } from '../utitlites/pglite-broadcast';
import { MedicationScheduleProvider } from '../utitlites/queries';
import { formatDate } from '../utitlites/helpers';

const MedicationSchedule = ({ medical }: { medical: any }) => {

    const [editingIndex, setEditingIndex] = useState(-1);

    const [medicationData, setMedicationData] = useState<any[]>([]);

    useEffect(() => {
        fetchMedicines();
    }, [])

    useEffect(()=>{
        onBroadcastChange(()=>{
            window.location.reload();
        })
    },[])

    const fetchMedicines = async () => {
        try {

            const result = await MedicationScheduleProvider.getInstance().getByPatientId(medical.patient_id) 
         
            if (result.rows.length > 0) {
                setMedicationData([...(result as any).rows])
            }
        } catch (err) {
            console.log('Something went wrong', err)
        }

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, field: string) => {
        const updatedData = [...medicationData];
        updatedData[index][field] = e.target.value;

        setMedicationData(updatedData);
    };
  
    const handleEditToggle = async (index: number) => {
        if (editingIndex === -1) {
            setEditingIndex(index)
        } else {
            //
            const changed = medicationData[index]
     
            try {
                if (changed.id) {
                    await MedicationScheduleProvider.getInstance().updateMedecines(changed);
                } else {
              
                await MedicationScheduleProvider.getInstance().addMedication(changed);
                }
                broadcastChange('db-update');
                await fetchMedicines();
                setEditingIndex(-1)
            } catch (err) {
                console.log('Something went wrong', err);
            }
        }



    };

    const handleAddRow = () => {
        const newRow = {

            patient_id: medical.patient_id,
            medicine_name: '',
            dose_per_day: 0,
            no_of_days: 0,
            start_date: new Date(),
            end_date: new Date(),

        };
        setEditingIndex(medicationData.length);
        setMedicationData([...medicationData, newRow]);
    };

    const handleDeleteRow = async (index: number) => {
        const updatedData = medicationData.filter((_, i) => i !== index);

        setMedicationData(updatedData);
        const deleteData=medicationData[index];
        if(deleteData && deleteData.id){
            try {
                await MedicationScheduleProvider.getInstance().deleteMedication(deleteData.id)
                broadcastChange('db-updated');
                await fetchMedicines()
            }catch {
                console.log("Something went wrong");
            }
        }
    };

    const getEndDate = (index: number) => {
        const currObj = medicationData[index];

        if (currObj.start_date && currObj.no_of_days) {
            const startDate = new Date(currObj.start_date);
            const days = parseInt(currObj.no_of_days as string); 

            if (!isNaN(startDate.getTime()) && !isNaN(days)) {
                startDate.setDate(startDate.getDate() + days);
                
                return formatDate(startDate); 
            }
        }

        return null;
    };

    return (
        <div className="container mx-auto p-4 overflow-x-auto">
            <h2 className="text-2xl font-semibold mb-4">Medication Schedule</h2>
            <table className="min-w-full table-auto border-collapse border border-gray-300 ">
                <thead>
                    <tr className="bg-gray-100">

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
                        <tr key={index} className="hover:bg-gray-50">

                            <td className="px-4 py-2 border border-gray-300">
                                {editingIndex === index ? (
                                    <input
                                        type="text"
                                        value={item.medicine_name}
                                        onChange={(e) => handleChange(e, index, 'medicine_name')}
                                        className="w-full p-1 border border-gray-300 rounded-md"
                                    />
                                ) : (
                                    <span>{item.medicine_name}</span>
                                )}
                            </td>
                            <td className="px-4 py-2 border border-gray-300">
                                {editingIndex === index ? (
                                    <input
                                        type="number"
                                        value={item.dose_per_day}
                                        onChange={(e) => handleChange(e, index, 'dose_per_day')}
                                        className="w-full p-1 border border-gray-300 rounded-md"
                                    />
                                ) : (
                                    <span>{item.dose_per_day}</span>
                                )}
                            </td>
                            <td className="px-4 py-2 border border-gray-300">
                                {editingIndex === index ? (
                                    <input
                                        type="number"
                                        value={item.no_of_days}
                                        onChange={(e) => handleChange(e, index, 'no_of_days')}
                                        className="w-full p-1 border border-gray-300 rounded-md"
                                    />
                                ) : (
                                    <span>{item.no_of_days}</span>
                                )}
                            </td>
                            <td className="px-4 py-2 border border-gray-300">
                                {editingIndex === index ? (
                                    <input
                                        type="date"
                                        value={formatDate((item.start_date))}
                                        onChange={(e) => handleChange(e, index, 'start_date')}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                ) : (
                                    <span>{formatDate((item.start_date))}</span>
                                )}
                            </td>
                            <td className="px-4 py-2 border border-gray-300">

                                <span>{getEndDate(index) || formatDate((item.end_date))}</span>

                            </td>
                            <td className="px-4 py-2 border border-gray-300">
                                <div className='flex flex-col gap-1'>
                                    <button
                                        onClick={() => handleEditToggle(index)}
                                        // className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 w-full"
                                        className="px-3 py-1 text-sm text-green-700 border border-green-600 rounded hover:bg-green-50 transition"
                                    >
                                        {editingIndex === index ? 'Save' : 'Edit'}
                                    </button>
                                    {
                                        !(editingIndex !== -1) &&
                                        <button
                                            onClick={() => handleDeleteRow(index)}
                                            // className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600  w-full"
                                            className="px-3 py-1 text-sm text-red-700 border border-red-600 rounded hover:bg-red-50 transition"
                                        >
                                            Delete
                                        </button>
                                    }
                                    {
                                        editingIndex === index && <button
                                            onClick={() => handleDeleteRow(index)}
                                            className="bg-black text-white p-2 rounded-md   w-full"
                                        >
                                            Cancel
                                        </button>
                                    }
                                </div>
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
