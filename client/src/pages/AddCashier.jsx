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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100 p-4 sm:p-6 md:p-10">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl shadow-black border border-orange-200 p-6 sm:p-8 transition-all duration-300 hover:shadow-orange-200/60">

        <h2 className="text-2xl sm:text-3xl font-bold text-center text-orange-600 mb-8">
          🧾 Add Cashier
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 sm:space-y-5 text-gray-700"
        >
          <div>
            <label className="block text-sm font-semibold mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 sm:py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Mobile No</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter 10-digit number"
              pattern="[0-9]{10}"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 sm:py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Email ID</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 sm:py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter full address"
              required
              rows="3"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 sm:py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Pin Code</label>
            <input
              type="text"
              name="pin"
              value={formData.pin}
              onChange={handleChange}
              placeholder="Enter 6-digit pin code"
              pattern="[0-9]{6}"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 sm:py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 sm:py-3 rounded-lg shadow-md transition-all"
          >
            Submit
          </button>
        </form>
        {submitted && (
          <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-5 shadow-sm transition-all">
            <h3 className="text-green-700 font-bold text-lg mb-2">
              ✅ Form Submitted Successfully!
            </h3>
            <div className="text-gray-700 space-y-1 text-sm sm:text-base">
              <p>
                <strong>Name:</strong> {formData.name}
              </p>
              <p>
                <strong>Mobile:</strong> {formData.mobile}
              </p>
              <p>
                <strong>Email:</strong> {formData.email}
              </p>
              <p>
                <strong>Address:</strong> {formData.address}
              </p>
              <p>
                <strong>Pin Code:</strong> {formData.pin}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCashier;
