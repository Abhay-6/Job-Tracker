import { useEffect, useState } from "react";
import api from "../api/axios";
import JobCard from "../components/JobCard";

function Dashboard() {
  const [stats, setStats] = useState({});
  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("");

  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [sort, setSort] = useState("");

  const [jobsLoading, setJobsLoading] = useState(false);

  // ================= STATS =================
  useEffect(() => {
    const getStats = async () => {
      try {
        setLoading(true);

        const response = await api.get("/jobs/stats");

        console.log("STATS:", response.data);

        setStats(response.data.data);
      } catch (error) {
        console.log(error);

        setError(error.response?.data?.message || "Failed to load stats");
      } finally {
        setLoading(false);
      }
    };

    getStats();
  }, []);

  // ================= JOBS =================
  useEffect(() => {
    const timer = setTimeout(() => {
      const getJobs = async () => {
        try {
          setJobsLoading(true);
          setError("");

          const response = await api.get("/jobs", {
            params: {
              search: search || undefined,
              status: statusFilter || undefined,
              jobType: jobTypeFilter || undefined,
              page,
              limit: 5,
              sort: sort || undefined,
            },
          });

          console.log("JOBS:", response.data);

          setJobs(response.data.data.jobs);

          setPagination({
            totalJobs: response.data.data.totalJobs,
            totalPages: response.data.data.totalPages,
            currentPage: response.data.data.currentPage,
            hasNextPage: response.data.data.hasNextPage,
            hasPrevPage: response.data.data.hasPrevPage,
          });
        } catch (error) {
          console.log(error);

          setError(error.response?.data?.message || "Failed to load jobs");
        } finally {
          setJobsLoading(false);
        }
      };

      getJobs();
    }, 500);

    return () => clearTimeout(timer);
  }, [search, statusFilter, jobTypeFilter, page, sort]);

  // ================= DELETE =================
  const handleDelete = (id) => {
    setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <h2 className="text-xl font-semibold text-white">
          Loading Dashboard...
        </h2>
      </div>
    );
  }

  // ================= ERROR =================
  if (error) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <h2 className="text-xl font-semibold text-red-400">{error}</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* ================= HEADER ================= */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <p className="text-blue-400 text-sm font-medium mb-2">OVERVIEW</p>

            <h1 className="text-3xl md:text-4xl font-bold">Dashboard</h1>

            <p className="text-slate-400 mt-2">
              Track and manage your job applications
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3">
            <p className="text-xs text-slate-500">TOTAL APPLICATIONS</p>

            <p className="text-2xl font-bold text-white">
              {pagination.totalJobs || 0}
            </p>
          </div>
        </div>

        {/* ================= SEARCH + FILTER ================= */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-5 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {/* Search */}
            <input
              type="text"
              placeholder="Search company or position..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="md:col-span-1 bg-slate-950 border border-slate-700
                         text-white placeholder-slate-500 rounded-xl px-4 py-3
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Status */}
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="bg-slate-950 border border-slate-700
                         text-slate-300 rounded-xl px-4 py-3
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Status</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Selected">Selected</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>

            {/* Job Type */}
            <select
              value={jobTypeFilter}
              onChange={(e) => {
                setJobTypeFilter(e.target.value);
                setPage(1);
              }}
              className="bg-slate-950 border border-slate-700
                         text-slate-300 rounded-xl px-4 py-3
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Job Types</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
            </select>

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
              }}
              className="bg-slate-950 border border-slate-700
                         text-slate-300 rounded-xl px-4 py-3
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
          {/* Applied */}
          <div
            className="bg-slate-900 border border-slate-800
                          rounded-2xl p-5 hover:border-blue-500
                          transition"
          >
            <p className="text-slate-400 text-sm">Applied</p>

            <p className="text-3xl font-bold text-white mt-2">
              {stats.applied || 0}
            </p>

            <p className="text-xs text-blue-400 mt-2">Applications</p>
          </div>

          {/* Interview */}
          <div
            className="bg-slate-900 border border-slate-800
                          rounded-2xl p-5 hover:border-yellow-500
                          transition"
          >
            <p className="text-slate-400 text-sm">Interview</p>

            <p className="text-3xl font-bold text-white mt-2">
              {stats.interview || 0}
            </p>

            <p className="text-xs text-yellow-400 mt-2">Interviews</p>
          </div>

          {/* Selected */}
          <div
            className="bg-slate-900 border border-slate-800
                          rounded-2xl p-5 hover:border-green-500
                          transition"
          >
            <p className="text-slate-400 text-sm">Selected</p>

            <p className="text-3xl font-bold text-white mt-2">
              {stats.selected || 0}
            </p>

            <p className="text-xs text-green-400 mt-2">Selected</p>
          </div>

          {/* Offer */}
          <div
            className="bg-slate-900 border border-slate-800
                          rounded-2xl p-5 hover:border-purple-500
                          transition"
          >
            <p className="text-slate-400 text-sm">Offers</p>

            <p className="text-3xl font-bold text-white mt-2">
              {stats.offer || 0}
            </p>

            <p className="text-xs text-purple-400 mt-2">Job Offers</p>
          </div>

          {/* Rejected */}
          <div
            className="bg-slate-900 border border-slate-800
                          rounded-2xl p-5 hover:border-red-500
                          transition"
          >
            <p className="text-slate-400 text-sm">Rejected</p>

            <p className="text-3xl font-bold text-white mt-2">
              {stats.rejected || 0}
            </p>

            <p className="text-xs text-red-400 mt-2">Rejected</p>
          </div>
        </div>

        {/* ================= JOB SECTION ================= */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold">Your Applications</h2>

            <p className="text-sm text-slate-500 mt-1">
              Recently added job applications
            </p>
          </div>

          <div
            className="bg-slate-900 border border-slate-800
                          rounded-full px-4 py-2 text-sm text-slate-400"
          >
            Page {pagination.currentPage || 1}
          </div>
        </div>

        {/* ================= JOBS ================= */}
        {jobsLoading ? (
          <div
            className="bg-slate-900 border border-slate-800
                          rounded-2xl p-10 text-center"
          >
            <p className="text-slate-400">Loading jobs...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div
            className="bg-slate-900 border border-slate-800
                          rounded-2xl p-10 text-center"
          >
            <p className="text-xl font-semibold text-white">No jobs found</p>

            <p className="text-slate-500 mt-2">
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} onDelete={handleDelete} />
            ))}
          </div>
        )}

        {/* ================= PAGINATION ================= */}
        <div className="flex items-center justify-center gap-5 mt-10 pb-10">
          <button
            disabled={!pagination.hasPrevPage}
            onClick={() => setPage(page - 1)}
            className="px-5 py-2.5 rounded-xl
                       bg-slate-900 border border-slate-700
                       text-white
                       hover:border-blue-500 hover:text-blue-400
                       disabled:bg-slate-900
                       disabled:text-slate-600
                       disabled:border-slate-800
                       disabled:cursor-not-allowed
                       transition"
          >
            ← Previous
          </button>

          <span className="text-slate-400 font-medium">
            {pagination.currentPage || 1} / {pagination.totalPages || 1}
          </span>

          <button
            disabled={!pagination.hasNextPage}
            onClick={() => setPage(page + 1)}
            className="px-5 py-2.5 rounded-xl
                       bg-blue-600 text-white
                       hover:bg-blue-500
                       disabled:bg-slate-900
                       disabled:text-slate-600
                       disabled:cursor-not-allowed
                       transition"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
