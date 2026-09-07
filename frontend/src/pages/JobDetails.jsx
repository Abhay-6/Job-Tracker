import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(true);
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
        console.log(error);

        setError(error.response?.data?.message || "Failed to load job details");
      } finally {
        setLoading(false);
      }
    };

    getJob();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeleting(true);

      const response = await api.delete(`/jobs/${id}`);

      console.log("DELETE RESPONSE:", response.data);

      navigate("/dashboard");
    } catch (error) {
      console.log("DELETE ERROR:", error);

      alert(error.response?.data?.message || "Failed to delete job");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <p className="text-slate-400 text-lg">Loading job details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <p className="text-red-400 text-lg">{error}</p>
      </div>
    );
  }

  if (!job) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white px-4 py-8 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back */}
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2
                     text-slate-400 hover:text-blue-400
                     transition mb-6"
        >
          ← Back to Dashboard
        </Link>

        {/* Main Card */}
        <div
          className="bg-slate-900 border border-slate-800
                     rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 md:p-8 border-b border-slate-800">
            <div
              className="flex flex-col sm:flex-row
                            sm:items-start sm:justify-between gap-5"
            >
              <div>
                <p className="text-blue-400 text-sm font-medium mb-2">
                  JOB APPLICATION
                </p>

                <h1 className="text-3xl md:text-4xl font-bold">
                  {job.position}
                </h1>

                <p className="text-xl text-slate-400 mt-2">{job.company}</p>
              </div>

              {/* Status */}
              <span
                className={`self-start px-4 py-2 rounded-full
                            text-sm font-semibold
                  ${
                    job.status === "Applied"
                      ? "bg-blue-500/10 text-blue-400"
                      : job.status === "Interview"
                        ? "bg-yellow-500/10 text-yellow-400"
                        : job.status === "Selected"
                          ? "bg-green-500/10 text-green-400"
                          : job.status === "Offer"
                            ? "bg-purple-500/10 text-purple-400"
                            : "bg-red-500/10 text-red-400"
                  }`}
              >
                {job.status}
              </span>
            </div>
          </div>

          {/* Information */}
          <div className="p-6 md:p-8">
            <h2 className="text-lg font-semibold mb-5">Job Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Job Type */}
              <div
                className="bg-slate-950 border border-slate-800
                           rounded-xl p-5"
              >
                <p className="text-xs text-slate-500 mb-2">JOB TYPE</p>

                <p className="text-lg font-semibold text-slate-200">
                  💼 {job.jobType}
                </p>
              </div>

              {/* Location */}
              <div
                className="bg-slate-950 border border-slate-800
                           rounded-xl p-5"
              >
                <p className="text-xs text-slate-500 mb-2">LOCATION</p>

                <p className="text-lg font-semibold text-slate-200">
                  📍 {job.location}
                </p>
              </div>

              {/* Salary */}
              <div
                className="bg-slate-950 border border-slate-800
                           rounded-xl p-5"
              >
                <p className="text-xs text-slate-500 mb-2">SALARY</p>

                <p className="text-lg font-semibold text-slate-200">
                  💰 ₹{job.salary}
                </p>
              </div>

              {/* Status */}
              <div
                className="bg-slate-950 border border-slate-800
                           rounded-xl p-5"
              >
                <p className="text-xs text-slate-500 mb-2">CURRENT STATUS</p>

                <p className="text-lg font-semibold text-slate-200">
                  {job.status}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link
                to={`/jobs/${id}/edit`}
                className="flex-1 text-center
                           bg-blue-600 text-white
                           px-5 py-3 rounded-xl
                           font-medium
                           hover:bg-blue-500
                           transition"
              >
                Edit Job
              </Link>

              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1
                           bg-red-500/10 text-red-400
                           border border-red-500/20
                           px-5 py-3 rounded-xl
                           font-medium
                           hover:bg-red-500/20
                           disabled:opacity-50
                           disabled:cursor-not-allowed
                           transition"
              >
                {deleting ? "Deleting..." : "Delete Job"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
