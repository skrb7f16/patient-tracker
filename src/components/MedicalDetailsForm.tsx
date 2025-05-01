import { useState } from "react";

interface Props {
    onBack: () => void;
    onSubmit: (data: any) => void;
    basicInfo: any;
  }
  
  export default function MedicalDetailsForm({ onBack, onSubmit, basicInfo }: Props) {
    const [medicalData, setMedicalData] = useState({
      bloodGroup: '',
      medicalHistory: '',
      allergies: '',
      diseases: '',
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setMedicalData({ ...medicalData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const fullData = { ...basicInfo, ...medicalData };
      console.log('Final Patient Data:', fullData);
      onSubmit(fullData);
    };
  
    return (
      <form onSubmit={handleSubmit} className="space-y-4 p-6 max-w-md mx-auto bg-white shadow-md rounded-xl">
        <h2 className="text-2xl font-bold text-center">Medical Details</h2>
  
        <div>
          <label className="block font-medium mb-1">Blood Group</label>
          <select
            name="bloodGroup"
            value={medicalData.bloodGroup}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="">Select</option>
            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
              <option key={bg}>{bg}</option>
            ))}
          </select>
        </div>
  
        <div>
          <label className="block font-medium mb-1">Medical History</label>
          <textarea
            name="medicalHistory"
            value={medicalData.medicalHistory}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="e.g., past surgeries, chronic illnesses"
          />
        </div>
  
        <div>
          <label className="block font-medium mb-1">Allergies</label>
          <textarea
            name="allergies"
            value={medicalData.allergies}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="e.g., penicillin, peanuts"
          />
        </div>
  
        <div>
          <label className="block font-medium mb-1">Known Diseases</label>
          <textarea
            name="diseases"
            value={medicalData.diseases}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="e.g., diabetes, hypertension"
          />
        </div>
  
        <div className="flex gap-4">
          <button
            type="button"
            onClick={onBack}
            className="w-full bg-gray-300 text-black py-2 px-4 rounded-lg hover:bg-gray-400"
          >
            Back
          </button>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
  