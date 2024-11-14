import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./Appwrite/auth";
import { login, logout } from "./Features/authSlice";
import Header from "./Components/Header/Header";
import { Footer } from "./Components/Footer/Footer";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          console.log("User Data not authenticated");
          dispatch(logout());
        }
      })
      .finally(() => setloading(false));
  }, [dispatch]);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
        }
      } catch (error) {
        console.error("Error fetching user on app start:", error);
      }
    };
    initializeUser();
  }, [dispatch]);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />{" "}
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-sky-500"></div>
    </div>
  );
}

export default App;
