import { useState } from 'react';

interface Props {
  onNext: (data: any) => void;
  basicInfo: {
    name: string,
    age: string,
    gender: string,
    phone: string,
    address: string
  } | null
}

export default function BasicInfoForm({ onNext, basicInfo }: Props) {
  const [formData, setFormData] = useState(basicInfo || {
    name: '',
    age: '',
    gender: '',
    phone: '',
    address: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!formData.name.trim()) errs.name = 'Name is required.';
    if (!formData.age || parseInt(formData.age) <= 0 ) errs.age = 'Enter a valid age.';
    if (!formData.gender) errs.gender = 'Gender is required.';
    if (!formData.phone.match(/^\d{10}$/)) errs.phone = 'Phone must be valid.';
    if (!formData.address.trim()) errs.address = 'Address is required.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (
    e: any
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); 
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // localStorage.setItem('savedData', JSON.stringify(formData));
      onNext(formData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 max-w-lg mx-auto bg-white shadow-xl rounded-2xl border border-gray-200"
    >
      <h2 className="text-3xl font-bold text-center text-blue-600">Patient Info</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            placeholder="John Doe"
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
          <input
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            placeholder="30"
          />
          {errors.age && <p className="text-sm text-red-500">{errors.age}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            placeholder="9876543210"
            maxLength={10}
            type='tel'
          />
          {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
          >
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          {errors.gender && <p className="text-sm text-red-500">{errors.gender}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
          placeholder="123 Main Street, City"
        />
        {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition"
      >
        Continue to Medical Info →
      </button>
    </form>
  );
}
