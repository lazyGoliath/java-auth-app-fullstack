import { NavLink, useNavigate } from "react-router";
import { Button } from "./ui/button";
import { useState } from "react";
import { Shield } from "lucide-react";
import useAuth from "@/auth/store";
import { Spinner } from "./ui/spinner";

function Navbar() {

    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const checkLogin = useAuth((state) => state.checkLogin);
    const user = useAuth((state) => state.user);
    const logout = useAuth((state) => state.logout);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            setLoading(true);
            await logout(false);
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <nav className="sticky top-0 z-50 flex justify-between items-center px-6 py-4 bg-slate-950/80 backdrop-blur-md text-white shadow-lg border-b border-slate-800/50 transition-all duration-300">
        {/* Navbar content here */}
            <NavLink to="/" className="flex items-center gap-3">
                <div className="flex items-center gap-3 group cursor-pointer">
                    {/* logo */}
                    <div className="relative w-10 h-10 rounded-lg bg-linear-to-br from-purple-500 via-cyan-500 to-purple-500 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                        <Shield className="w-5 h-5 text-white" />
                        <div className="absolute inset-0 rounded-lg bg-linear-to-br from-purple-500 via-cyan-500 to-purple-500 opacity-0 group-hover:opacity-50 blur-md transition-opacity duration-300"></div>
                    </div>
                    {/* app name */}
                    <span className="text-xl font-bold bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-cyan-300 transition-all duration-300">
                        SecureAuth
                    </span>
                </div>
            </NavLink>

            {/* Mobile menu button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden flex flex-col gap-1.5 focus:outline-none"
                aria-label="Toggle menu"
            >
                <span
                className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                    isOpen ? "rotate-45 translate-y-2" : ""
                }`}
                ></span>
                <span
                className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                    isOpen ? "opacity-0" : ""
                }`}
                ></span>
                <span
                className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                    isOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
                ></span>
            </button>

            <div
                className={`flex gap-6 items-center md:flex md:gap-6 md:static absolute top-16 left-0 right-0 flex-col md:flex-row bg-slate-950 md:bg-transparent p-4 md:p-0 ${
                isOpen ? "flex" : "hidden md:flex"
                } transition-all duration-300`}
            >
                {checkLogin() ? 
                    <>
                        <p
                        className="relative font-medium text-slate-300 hover:text-white transition-colors duration-200 group"
                        >
                        {user?.name}'s Home
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-purple-500 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
                        </p>
                        <a
                        href="/about"
                        className="relative font-medium text-gray-300 hover:text-white transition-colors duration-200 group"
                        >
                        About
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-purple-500 to-cyan-500 group-hover:w-full transition-all duration-300" />
                        </a>
                        <div className="flex gap-3 md:gap-4 flex-col md:flex-row w-full md:w-auto">
                            <Button
                            onClick={handleLogout}
                            variant="outline"
                            className="w-full md:w-auto px-6 py-2 border-blue-500/30 text-blue-400 hover:bg-blue-500/10 hover:border-blue-400 hover:text-blue-300 transition-all duration-200 rounded-full backdrop-blur-sm"
                            disabled={loading}
                            >
                                {
                                loading ? (
                                <><Spinner /> Logging Out...</>
                                ) : (
                                "Logout"
                                )
                            }
                            </Button>
                        </div>
                    </>
                    :
                    <>
                        <NavLink
                        to="/"
                        className="relative font-medium text-slate-300 hover:text-white transition-colors duration-200 group"
                        >
                        Home
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-purple-500 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
                        </NavLink>
                        <a
                        href="/about"
                        className="relative font-medium text-gray-300 hover:text-white transition-colors duration-200 group"
                        >
                        About
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-purple-500 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
                        </a>
                        <div className="flex gap-3 md:gap-4 flex-col md:flex-row w-full md:w-auto">
                            <NavLink to="/login">
                                <Button
                                variant="outline"
                                className="w-full md:w-auto px-6 py-2 border-blue-500/30 text-blue-400 hover:bg-blue-500/10 hover:border-blue-400 hover:text-blue-300 transition-all duration-200 rounded-full backdrop-blur-sm"
                                >
                                    Login
                                </Button>
                            </NavLink>
                            <NavLink to="/signup">
                                <Button
                                    className="w-full md:w-auto px-6 py-2 bg-linear-to-r from-purple-600 to-cyan-600 text-white hover:from-purple-500 hover:to-cyan-500 transition-all duration-200 font-semibold shadow-lg"
                                >
                                    Sign Up
                                </Button>
                            </NavLink>
                        </div>
                    </>
                }
            </div>
        </nav>
    );
    }

export default Navbar;