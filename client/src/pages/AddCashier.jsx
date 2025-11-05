import React, { useState } from "react";

const AddCashier = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    pin: "",
  });

  const [submitted, setSubmitted] = useState(false);

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-white md:pt-5 mb-6">
          🧾 Cashier Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-lg text-white mb-1">
              Full Name:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              required
              className="w-full text-black border border-purple-900 rounded-lg px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-lg text-white mb-1">
              Mobile No:
            </label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter 10-digit number"
              pattern="[0-9]{10}"
              required
              className="w-full text-black border border-purple-900 rounded-lg px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-lg text-white mb-1">
              Email ID:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              required
              className="w-full text-black border border-purple-900 rounded-lg px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-lg text-white mb-1">
              Address:
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter full address"
              required
              className="w-full text-black border border-purple-900 rounded-lg px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
              rows="3"
            />
          </div>

          <div>
            <label className="block text-lg text-white mb-1">
              Pin Code:
            </label>
            <input
              type="text"
              name="pin"
              value={formData.pin}
              onChange={handleChange}
              placeholder="Enter 6-digit pin code"
              pattern="[0-9]{6}"
              required
              className="w-full text-black border border-purple-900 rounded-lg px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-900 text-white font-semibold py-2 rounded-lg hover:bg-black transition"
          >
            Submit
          </button>
        </form>

        {submitted && (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="text-black font-semibold text-lg mb-2">
              ✅ Form Submitted Successfully!
            </h3>
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Mobile:</strong> {formData.mobile}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Address:</strong> {formData.address}</p>
            <p><strong>Pin Code:</strong> {formData.pin}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCashier