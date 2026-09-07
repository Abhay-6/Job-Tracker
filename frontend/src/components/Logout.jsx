import api from "../api/axios.js";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await api.post("/users/logout");

      console.log(response.data);

      navigate("/login");
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Failed to logout");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-3 py-2 rounded-lg
                 text-sm font-medium
                 text-red-400
                 hover:text-red-300
                 hover:bg-red-500/10
                 transition"
    >
      Logout
    </button>
  );
}

export default Logout;
