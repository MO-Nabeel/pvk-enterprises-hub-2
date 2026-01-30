import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import pvkLogo from "@/assets/pvk logo (1).png";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            console.log("Login attempt", formData);
        }, 1500);
    };

    return (
        <div className="min-h-screen w-full relative overflow-hidden font-sans">
            {/* Background Image - Mountain/Nature Vibe */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80')`,
                    filter: 'brightness(1.1)'
                }}
            />
            {/* Overlay to ensure text readability if needed, lightly tinted blue */}
            <div className="absolute inset-0 z-0 bg-blue-900/10 pointer-events-none" />

            {/* Navigation (Top Right) */}
            {/* Navigation removed as per request */}

            {/* Mobile Logo (Visible only on small screens) */}
            <div className="absolute top-6 left-6 z-20 md:hidden">
                <img src={pvkLogo} alt="Logo" className="h-8 w-auto" />
            </div>

            {/* Main Content Centered */}
            <div className="relative z-10 flex items-center justify-center min-h-screen px-4">

                {/* Glassmorphism Card */}
                <div className="w-full max-w-[420px] p-8 md:p-12 rounded-[30px] bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] flex flex-col">

                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-10 tracking-tight">LOGIN</h2>

                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* Email Input */}
                        <div className="relative group">
                            <Mail className="absolute right-0 top-2 h-5 w-5 text-gray-500 group-focus-within:text-gray-800 transition-colors" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="Email"
                                className="h-10 border-0 border-b-2 border-gray-400 bg-transparent rounded-none px-0 pr-8 text-gray-800 placeholder:text-gray-500 focus-visible:ring-0 focus-visible:border-gray-800 transition-all"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Password Input */}
                        <div className="relative group">
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-0 top-2 text-gray-500 group-focus-within:text-gray-800 hover:text-black transition-colors z-10"
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="h-10 border-0 border-b-2 border-gray-400 bg-transparent rounded-none px-0 pr-8 text-gray-800 placeholder:text-gray-500 focus-visible:ring-0 focus-visible:border-gray-800 transition-all"
                                required
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                            <div className="absolute right-0 -bottom-6">
                                <Link to="/forgot-password" classN="text-[10px] font-bold text-gray-600 hover:text-black">
                                    Forget Password?
                                </Link>
                            </div>
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center space-x-3 pt-2">
                            <Checkbox
                                id="remember"
                                className="border-gray-400 data-[state=checked]:bg-gray-800 data-[state=checked]:border-gray-800 rounded-[4px]"
                            />
                            <label
                                htmlFor="remember"
                                className="text-sm font-medium leading-none text-gray-600 cursor-pointer"
                            >
                                Remember Me
                            </label>
                        </div>

                        {/* Login Button */}
                        <Button
                            type="submit"
                            className="w-full h-12 rounded-lg bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-black text-white font-bold tracking-wide shadow-lg shadow-blue-900/20 transition-all duration-300 transform hover:-translate-y-0.5 mt-4"
                            disabled={isLoading}
                        >
                            {isLoading ? "Validating..." : "Login"}
                        </Button>

                        {/* Footer Register Link */}
                        <div className="flex items-center justify-between text-xs mt-6">
                            <span className="text-gray-600">Don't have an Account?</span>
                            <Link to="/register" className="font-bold text-gray-900 hover:underline">
                                Register
                            </Link>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    );
};

export default Login;
