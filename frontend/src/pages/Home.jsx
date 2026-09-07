import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-blue-950">
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <span
            className="inline-block bg-blue-500/10 text-blue-300
                       border border-blue-400/30
                       px-5 py-2 rounded-full text-sm font-semibold"
          >
            🚀 Your Career, Organized
          </span>

          {/* Heading */}
          <h1
            className="text-5xl md:text-7xl font-extrabold
                       text-white mt-7 leading-tight"
          >
            Manage Your Job Search
            <span
              className="block text-transparent bg-clip-text
                         bg-gradient-to-r from-blue-400
                         via-cyan-300 to-purple-400"
            >
              Smarter
            </span>
          </h1>

          {/* Description */}
          <p
            className="text-lg md:text-xl text-slate-300
                       mt-7 max-w-2xl mx-auto leading-relaxed"
          >
            Keep all your job applications in one place. Track interviews,
            offers, rejections and everything in between.
          </p>

          {/* Buttons */}
          <div
            className="flex flex-col sm:flex-row
                       justify-center gap-4 mt-9"
          >
            <Link
              to="/register"
              className="px-7 py-3.5 rounded-xl
                         bg-gradient-to-r from-blue-600 to-indigo-600
                         text-white font-semibold
                         shadow-lg shadow-blue-500/25
                         hover:from-blue-500 hover:to-indigo-500
                         transition"
            >
              Get Started →
            </Link>

            <Link
              to="/login"
              className="px-7 py-3.5 rounded-xl
                         bg-white/10 text-white
                         border border-white/20
                         backdrop-blur
                         font-semibold
                         hover:bg-white/20 transition"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Features */}
        <div
          className="grid grid-cols-1 md:grid-cols-3
                     gap-6 mt-20"
        >
          {/* Card 1 */}
          <div
            className="bg-white/10 backdrop-blur-lg
                       border border-white/10
                       rounded-2xl p-7
                       hover:bg-white/15
                       hover:-translate-y-1
                       transition"
          >
            <div
              className="w-12 h-12 rounded-xl
                         bg-blue-500/20
                         flex items-center justify-center
                         text-2xl"
            >
              📊
            </div>

            <h2 className="text-xl font-bold text-white mt-5">
              Track Applications
            </h2>

            <p className="text-slate-300 mt-2 leading-relaxed">
              Keep track of every job application and know exactly where you
              stand.
            </p>
          </div>

          {/* Card 2 */}
          <div
            className="bg-white/10 backdrop-blur-lg
                       border border-white/10
                       rounded-2xl p-7
                       hover:bg-white/15
                       hover:-translate-y-1
                       transition"
          >
            <div
              className="w-12 h-12 rounded-xl
                         bg-purple-500/20
                         flex items-center justify-center
                         text-2xl"
            >
              🔍
            </div>

            <h2 className="text-xl font-bold text-white mt-5">
              Search & Filter
            </h2>

            <p className="text-slate-300 mt-2 leading-relaxed">
              Quickly find applications using search, status and job type
              filters.
            </p>
          </div>

          {/* Card 3 */}
          <div
            className="bg-white/10 backdrop-blur-lg
                       border border-white/10
                       rounded-2xl p-7
                       hover:bg-white/15
                       hover:-translate-y-1
                       transition"
          >
            <div
              className="w-12 h-12 rounded-xl
                         bg-cyan-500/20
                         flex items-center justify-center
                         text-2xl"
            >
              📈
            </div>

            <h2 className="text-xl font-bold text-white mt-5">
              Monitor Progress
            </h2>

            <p className="text-slate-300 mt-2 leading-relaxed">
              See your application statistics and understand your job search
              progress.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
