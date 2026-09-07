import api from "../api/axios";
import { Link } from "react-router-dom";

function JobCard({ job, onDelete }) {
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await api.delete(`/jobs/${job._id}`);

      console.log("DELETE RESPONSE:", response.data);

      onDelete(job._id);
    } catch (error) {
      console.log("DELETE ERROR:", error);

      alert(error.response?.data?.message || "Failed to delete job");
    }
  };

  return (
    <div
      className="bg-slate-900 border border-slate-800
                 rounded-2xl p-5 md:p-6
                 hover:border-slate-700
                 transition"
    >
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white">
            {job.position}
          </h2>

          <p className="text-blue-400 font-medium mt-1">{job.company}</p>
        </div>

        {/* Status */}
        <span
          className={`self-start px-3 py-1 rounded-full text-sm font-medium
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

      {/* Job Information */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-3">
          <p className="text-xs text-slate-500 mb-1">LOCATION</p>

          <p className="text-sm text-slate-300">📍 {job.location}</p>
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-xl p-3">
          <p className="text-xs text-slate-500 mb-1">JOB TYPE</p>

          <p className="text-sm text-slate-300">💼 {job.jobType}</p>
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-xl p-3">
          <p className="text-xs text-slate-500 mb-1">SALARY</p>

          <p className="text-sm text-slate-300">💰 ₹{job.salary}</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-3 mt-6">
        <Link
          to={`/jobs/${job._id}`}
          className="px-4 py-2 rounded-lg
                     bg-slate-800 text-slate-200
                     border border-slate-700
                     hover:border-blue-500
                     hover:text-blue-400
                     transition"
        >
          View Details
        </Link>

        <Link
          to={`/jobs/${job._id}/edit`}
          className="px-4 py-2 rounded-lg
                     bg-blue-600 text-white
                     hover:bg-blue-500
                     transition"
        >
          Edit
        </Link>

        <button
          onClick={handleDelete}
          className="px-4 py-2 rounded-lg
                     bg-red-500/10
                     text-red-400
                     border border-red-500/20
                     hover:bg-red-500/20
                     transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default JobCard;
