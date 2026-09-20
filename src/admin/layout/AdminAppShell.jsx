import { Outlet } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';

export function AdminAppShell() {
  return (
    <div className="flex h-screen bg-[#f4f7f9] font-sans text-gray-800">
      <AdminSidebar />
      <div className="flex-1 ml-64 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-transparent p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
