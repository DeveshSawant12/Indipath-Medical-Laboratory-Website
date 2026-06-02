import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPatients from "./pages/admin/AdminPatients";
import AdminAppointments from "./pages/admin/AdminAppointments";
import AdminUploadReport from "./pages/admin/AdminUploadReport";
import AdminReports from "./pages/admin/AdminReports";
import AdminNotifications from "./pages/admin/AdminNotifications";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: Home,
    },
    {
      path: "/admin",
      Component: AdminLogin,
    },
    {
      path: "/admin/dashboard",
      Component: AdminDashboard,
    },
    {
      path: "/admin/patients",
      Component: AdminPatients,
    },
    {
      path: "/admin/appointments",
      Component: AdminAppointments,
    },
    {
      path: "/admin/upload-report",
      Component: AdminUploadReport,
    },
    {
      path: "/admin/reports",
      Component: AdminReports,
    },
    {
      path: "/admin/notifications",
      Component: AdminNotifications,
    },
  ],
  {
    basename: "/Indipath-Medical-Laboratory-Website",
  }
);
