import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../Appwrite/auth";
import { logout } from "../../Features/authSlice";
import { useNavigate } from "react-router-dom";

export function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await authService.logout(); // Log the user out
      dispatch(logout()); // Clear user state in Redux
      navigate("/login"); // Redirect to the login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
    return;
  };

  return (
    <button
      className="middle none cursor-pointer center rounded-full bg-[#1C64F2] py-2.5  px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-[#1C64F2]/20 transition-all hover:shadow-lg hover:shadow-[#1C64F2]/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      data-ripple-light="true"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
