import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function AddJob() {
  const navigate = useNavigate();

  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("Applied");
  const [jobType, setJobType] = useState("Full-Time");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Validation
    if (!company.trim()) {
      setError("Company is required");
      return;
    }

    if (!position.trim()) {
      setError("Position is required");
      return;
    }

    if (!location.trim()) {
      setError("Location is required");
      return;
    }

    if (salary === "") {
      setError("Salary is required");
      return;
    }

    if (Number(salary) < 0) {
      setError("Salary cannot be negative");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/jobs", {
        company,
        position,
        status,
        jobType,
        location,
        salary: Number(salary),
      });

      console.log("ADD JOB RESPONSE:", response.data);

      navigate("/dashboard");
    } catch (error) {
      console.log("ADD JOB ERROR:", error);

      setError(error.response?.data?.message || "Failed to add job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white px-4 py-8 md:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Back */}
        <button
          onClick={() => navigate("/dashboard")}
          className="text-slate-400 hover:text-blue-400
                     transition mb-6"
        >
          ← Back to Dashboard
        </button>

        {/* Card */}
        <div
          className="bg-slate-900 border border-slate-800
                     rounded-2xl shadow-xl p-6 md:p-8"
        >
          {/* Heading */}
          <div className="mb-8">
            <p className="text-blue-400 text-sm font-medium mb-2">
              NEW APPLICATION
            </p>

            <h1 className="text-3xl font-bold">Add Job</h1>

            <p className="text-slate-400 mt-2">Track a new job application</p>
          </div>

          {/* Error */}
          {error && (
            <div
              className="bg-red-500/10
                         border border-red-500/20
                         text-red-400
                         rounded-xl px-4 py-3 mb-6"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Company */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Company
              </label>

              <input
                type="text"
                placeholder="e.g. Google"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full bg-slate-950
                           border border-slate-700
                           text-white
                           rounded-xl px-4 py-3
                           placeholder-slate-600
                           focus:outline-none
                           focus:ring-2 focus:ring-blue-500
                           focus:border-transparent"
              />
            </div>

            {/* Position */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Position
              </label>

              <input
                type="text"
                placeholder="e.g. Software Engineer"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="w-full bg-slate-950
                           border border-slate-700
                           text-white
                           rounded-xl px-4 py-3
                           placeholder-slate-600
                           focus:outline-none
                           focus:ring-2 focus:ring-blue-500
                           focus:border-transparent"
              />
            </div>

            {/* Status + Job Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Status
                </label>

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full bg-slate-950
                             border border-slate-700
                             text-white
                             rounded-xl px-4 py-3
                             focus:outline-none
                             focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Selected">Selected</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              {/* Job Type */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Job Type
                </label>

                <select
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  className="w-full bg-slate-950
                             border border-slate-700
                             text-white
                             rounded-xl px-4 py-3
                             focus:outline-none
                             focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
            </div>

            {/* Location */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Location
              </label>

              <input
                type="text"
                placeholder="e.g. Bangalore / Remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-slate-950
                           border border-slate-700
                           text-white
                           rounded-xl px-4 py-3
                           placeholder-slate-600
                           focus:outline-none
                           focus:ring-2 focus:ring-blue-500
                           focus:border-transparent"
              />
            </div>

            {/* Salary */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Salary
              </label>

              <div className="relative">
                <span
                  className="absolute left-4 top-1/2
                                 -translate-y-1/2
                                 text-slate-500"
                >
                  ₹
                </span>

                <input
                  type="number"
                  placeholder="e.g. 800000"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  className="w-full bg-slate-950
                             border border-slate-700
                             text-white
                             rounded-xl pl-9 pr-4 py-3
                             placeholder-slate-600
                             focus:outline-none
                             focus:ring-2 focus:ring-blue-500
                             focus:border-transparent"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600
                           text-white px-5 py-3
                           rounded-xl font-medium
                           hover:bg-blue-500
                           disabled:bg-blue-800
                           disabled:cursor-not-allowed
                           transition"
              >
                {loading ? "Adding Job..." : "Add Job"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="flex-1 bg-slate-800
                           border border-slate-700
                           text-slate-200
                           px-5 py-3 rounded-xl
                           font-medium
                           hover:border-slate-500
                           transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddJob;
