import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/admin-portal/dashboard');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#0a1628] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#1a2c47] rounded-full mix-blend-screen filter blur-3xl opacity-50"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#8B1A4A] rounded-full mix-blend-screen filter blur-3xl opacity-20"></div>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden z-10 border border-gray-100">
        <div className="p-8 pb-6 border-b border-gray-100 bg-gray-50 flex flex-col items-center text-center">
          <img src="/Srikara Hospitals, LB Nagar.png" alt="Srikara Logo" className="h-16 w-auto mb-2 object-contain" />
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Srikara Central Admin</h1>
          <p className="text-sm text-gray-500 font-medium mt-1 uppercase tracking-widest">Dialysis Network Management</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email / Employee ID</label>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1a2c47] focus:border-transparent transition-all shadow-sm"
                placeholder="Enter your admin credentials"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex justify-between">
                <span>Password</span>
                <a href="#" className="text-[#1a2c47] hover:text-[#cca830] transition-colors font-medium text-xs">Forgot Password?</a>
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1a2c47] focus:border-transparent transition-all shadow-sm"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1a2c47] hover:bg-[#122036] text-white font-bold py-3 px-4 rounded-lg shadow-md transition-all flex items-center justify-center border-b-2 border-[#0d1626] active:border-b-0 active:mt-[2px] active:mb-[-2px] group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Login to Central Portal 
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </>
              )}
            </button>
          </form>
        </div>
        
        <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-500 font-medium">Authorized personnel only. All access is logged.</p>
        </div>
      </div>
    </div>
  );
}
