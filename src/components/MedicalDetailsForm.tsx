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

  const [errors, setErrors] = useState({
    bloodGroup: '',
    medicalHistory: '',
    allergies: '',
    diseases: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setMedicalData({ ...medicalData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error on change
  };

  const validate = () => {
    const newErrors: any = {};
    if (!medicalData.bloodGroup) newErrors.bloodGroup = 'Blood group is required.';
    if (medicalData.medicalHistory.length > 300)
      newErrors.medicalHistory = 'Medical history must be between 300 characters.';
    if (medicalData.allergies.length > 300)
      newErrors.allergies = 'Allergies must be under 300 characters.';
    if (medicalData.diseases.length > 300)
      newErrors.diseases = 'Diseases must be under 300 characters.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const fullData = { ...basicInfo, ...medicalData };
    console.log('Final Patient Data:', fullData);
    onSubmit(fullData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 max-w-md mx-auto bg-white shadow-md rounded-xl"
    >
      <h2 className="text-2xl font-bold text-center">Medical Details</h2>

      <div>
        <label className="block font-medium mb-1">Blood Group</label>
        <select
          name="bloodGroup"
          value={medicalData.bloodGroup}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
        >
          <option value="">Select</option>
          {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
            <option key={bg} value={bg}>{bg}</option>
          ))}
        </select>
        {errors.bloodGroup && (
          <p className="text-red-500 text-sm mt-1">{errors.bloodGroup}</p>
        )}
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
        {errors.medicalHistory && (
          <p className="text-red-500 text-sm mt-1">{errors.medicalHistory}</p>
        )}
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
        {errors.allergies && (
          <p className="text-red-500 text-sm mt-1">{errors.allergies}</p>
        )}
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
        {errors.diseases && (
          <p className="text-red-500 text-sm mt-1">{errors.diseases}</p>
        )}
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
