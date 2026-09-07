import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getJob = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/jobs/${id}`);

        console.log("JOB RESPONSE:", response.data);

        setJob(response.data.data);
      } catch (error) {
        console.log("GET JOB ERROR:", error);

        setError(error.response?.data?.message || "Failed to load job details");
      } finally {
        setLoading(false);
      }
    };

    getJob();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    setError("");

    if (!job.company.trim()) {
      setError("Company is required");
      return;
    }

    if (!job.position.trim()) {
      setError("Position is required");
      return;
    }

    if (!job.location.trim()) {
      setError("Location is required");
      return;
    }

    if (job.salary === "" || job.salary === undefined) {
      setError("Salary is required");
      return;
    }

    if (Number(job.salary) < 0) {
      setError("Salary cannot be negative");
      return;
    }

    try {
      setUpdating(true);

      const response = await api.patch(`/jobs/${id}`, {
        company: job.company,
        position: job.position,
        status: job.status,
        jobType: job.jobType,
        location: job.location,
        salary: Number(job.salary),
      });

      console.log("UPDATE RESPONSE:", response.data);

      navigate(`/jobs/${id}`);
    } catch (error) {
      console.log("UPDATE ERROR:", error);

      setError(error.response?.data?.message || "Failed to update job");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <p className="text-slate-400 text-lg">Loading job...</p>
      </div>
    );
  }

  if (!job) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white px-4 py-8 md:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Back */}
        <button
          onClick={() => navigate(`/jobs/${id}`)}
          className="text-slate-400 hover:text-blue-400
                     transition mb-6"
        >
          ← Back to Job Details
        </button>

        {/* Card */}
        <div
          className="bg-slate-900 border border-slate-800
                     rounded-2xl shadow-xl p-6 md:p-8"
        >
          {/* Heading */}
          <div className="mb-8">
            <p className="text-blue-400 text-sm font-medium mb-2">
              UPDATE APPLICATION
            </p>

            <h1 className="text-3xl font-bold">Edit Job</h1>

            <p className="text-slate-400 mt-2">
              Update your job application details
            </p>
          </div>

          {/* Error */}
          {error && (
            <div
              className="bg-red-500/10 border border-red-500/20
                         text-red-400 rounded-xl px-4 py-3 mb-6"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleUpdate}>
            {/* Company */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Company
              </label>

              <input
                type="text"
                value={job.company}
                onChange={(e) =>
                  setJob({
                    ...job,
                    company: e.target.value,
                  })
                }
                className="w-full bg-slate-950
                           border border-slate-700
                           text-white
                           rounded-xl px-4 py-3
                           placeholder-slate-500
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
                value={job.position}
                onChange={(e) =>
                  setJob({
                    ...job,
                    position: e.target.value,
                  })
                }
                className="w-full bg-slate-950
                           border border-slate-700
                           text-white
                           rounded-xl px-4 py-3
                           focus:outline-none
                           focus:ring-2 focus:ring-blue-500
                           focus:border-transparent"
              />
            </div>

            {/* Status + Job Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Status
                </label>

                <select
                  value={job.status}
                  onChange={(e) =>
                    setJob({
                      ...job,
                      status: e.target.value,
                    })
                  }
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

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Job Type
                </label>

                <select
                  value={job.jobType}
                  onChange={(e) =>
                    setJob({
                      ...job,
                      jobType: e.target.value,
                    })
                  }
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
                value={job.location}
                onChange={(e) =>
                  setJob({
                    ...job,
                    location: e.target.value,
                  })
                }
                className="w-full bg-slate-950
                           border border-slate-700
                           text-white
                           rounded-xl px-4 py-3
                           focus:outline-none
                           focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Salary */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Salary
              </label>

              <input
                type="number"
                value={job.salary}
                onChange={(e) =>
                  setJob({
                    ...job,
                    salary: e.target.value,
                  })
                }
                className="w-full bg-slate-950
                           border border-slate-700
                           text-white
                           rounded-xl px-4 py-3
                           focus:outline-none
                           focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={updating}
                className="flex-1 bg-blue-600
                           text-white px-5 py-3
                           rounded-xl font-medium
                           hover:bg-blue-500
                           disabled:bg-blue-800
                           disabled:cursor-not-allowed
                           transition"
              >
                {updating ? "Updating..." : "Update Job"}
              </button>

              <button
                type="button"
                onClick={() => navigate(`/jobs/${id}`)}
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

export default EditJob;
