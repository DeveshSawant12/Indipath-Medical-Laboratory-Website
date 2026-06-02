import { ReactNode, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Upload,
  FileText,
  MessageSquare,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useState } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({
  children,
}: AdminLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem(
      "indipath_admin_logged_in",
    );
    if (!isLoggedIn) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("indipath_admin_logged_in");
    toast.success("Logged out successfully");
    navigate("/admin");
  };

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/admin/dashboard",
    },
    { icon: Users, label: "Patients", path: "/admin/patients" },
    {
      icon: Calendar,
      label: "Appointments",
      path: "/admin/appointments",
    },
    {
      icon: Upload,
      label: "Upload Report",
      path: "/admin/upload-report",
    },
    {
      icon: FileText,
      label: "Reports",
      path: "/admin/reports",
    },
    {
      icon: MessageSquare,
      label: "WhatsApp Notifications",
      path: "/admin/notifications",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-teal-600 text-white rounded-lg flex items-center justify-center"
      >
        {isSidebarOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 transition-transform duration-300`}
      >
        <div className="flex items-center space-x-3 mb-8 mt-12 lg:mt-0">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">
              I
            </span>
          </div>
          <div>
            <h1 className="text-xl font-bold">Indipath</h1>
            <p className="text-xs text-gray-400">
              Admin Portal
            </p>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                location.pathname === item.path
                  ? "bg-teal-600 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full bg-transparent border-gray-600 text-gray-300 hover:bg-red-600 hover:text-white hover:border-red-600"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}