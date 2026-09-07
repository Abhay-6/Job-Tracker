import { NavLink } from "react-router-dom";
import Logout from "./Logout";

function Navbar() {
  return (
    <nav className="bg-slate-950 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/dashboard" className="flex items-center gap-2">
            <div
              className="w-9 h-9 rounded-xl bg-blue-600
                         flex items-center justify-center
                         text-white font-bold"
            >
              J
            </div>

            <div>
              <h2 className="text-lg font-bold text-white leading-none">
                Job Tracker
              </h2>

              <p className="text-xs text-slate-500 mt-1">Track your career</p>
            </div>
          </NavLink>

          {/* Navigation */}
          <div className="flex items-center gap-2 md:gap-5">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-500/10 text-blue-400"
                    : "text-slate-400 hover:text-white hover:bg-slate-900"
                }`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/add-job"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-500/10 text-blue-400"
                    : "text-slate-400 hover:text-white hover:bg-slate-900"
                }`
              }
            >
              + Add Job
            </NavLink>

            <Logout />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
