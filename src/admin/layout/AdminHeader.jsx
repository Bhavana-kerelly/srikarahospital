import { useLocation } from 'react-router-dom';

export function AdminHeader() {
  const location = useLocation();
  
  const generateBreadcrumbs = () => {
    const path = location.pathname.replace('/admin-portal', '');
    const parts = path.split('/').filter(Boolean);
    if (parts.length === 0) return 'Dashboard';
    
    return parts.map(part => part.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')).join(' / ');
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-500 font-medium">
          Central Admin <span className="mx-2 text-gray-300">/</span> <span className="text-gray-900">{generateBreadcrumbs()}</span>
        </div>
      </div>
      
      <div className="flex-1 flex justify-center">
        <h2 className="text-lg font-bold text-gray-800 tracking-tight">Srikara Dialysis Network</h2>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-gray-500 hover:text-gray-700 transition-colors">
          <span className="text-xl">🔔</span>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">3</span>
        </button>
        <button className="text-gray-500 hover:text-gray-700 transition-colors text-xl">
          ❓
        </button>
        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="text-right">
            <div className="text-sm font-semibold text-gray-800">Central Operations</div>
            <div className="text-xs text-gray-500">Super Admin</div>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#1a2c47] text-[#cca830] flex items-center justify-center font-bold text-sm shadow-inner border border-gray-100">
            CO
          </div>
        </div>
      </div>
    </header>
  );
}
