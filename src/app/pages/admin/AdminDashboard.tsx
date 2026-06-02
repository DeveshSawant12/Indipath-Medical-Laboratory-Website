import { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { Users, Calendar, FileText, CheckCircle, Clock, XCircle } from 'lucide-react';
import { initializeDemoData } from '../../utils/initializeDemoData';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalAppointments: 0,
    pendingAppointments: 0,
    reportsUploaded: 0,
    reportsPending: 0,
    completedAppointments: 0,
  });

  useEffect(() => {
    // Initialize demo data on first load
    initializeDemoData();
    
    // Load data from localStorage (will be replaced with Supabase)
    const patients = JSON.parse(localStorage.getItem('indipath_patients') || '[]');
    const appointments = JSON.parse(localStorage.getItem('indipath_appointments') || '[]');
    const reports = JSON.parse(localStorage.getItem('indipath_reports') || '[]');

    setStats({
      totalPatients: patients.length,
      totalAppointments: appointments.length,
      pendingAppointments: appointments.filter((a: any) => a.status === 'Pending').length,
      reportsUploaded: reports.length,
      reportsPending: appointments.filter((a: any) => a.status === 'Processing').length,
      completedAppointments: appointments.filter((a: any) => a.status === 'Completed').length,
    });
  }, []);

  const statCards = [
    {
      icon: Users,
      label: 'Total Patients',
      value: stats.totalPatients,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      icon: Calendar,
      label: 'Total Appointments',
      value: stats.totalAppointments,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
    {
      icon: Clock,
      label: 'Pending Appointments',
      value: stats.pendingAppointments,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
    },
    {
      icon: FileText,
      label: 'Reports Uploaded',
      value: stats.reportsUploaded,
      color: 'from-teal-500 to-green-500',
      bgColor: 'bg-teal-50',
      textColor: 'text-teal-600',
    },
    {
      icon: XCircle,
      label: 'Reports Pending',
      value: stats.reportsPending,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
    },
    {
      icon: CheckCircle,
      label: 'Completed Appointments',
      value: stats.completedAppointments,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
  ];

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center`}>
                  <card.icon className="w-7 h-7 text-white" />
                </div>
                <span className={`text-3xl font-bold ${card.textColor}`}>{card.value}</span>
              </div>
              <h3 className="text-gray-600 font-medium">{card.label}</h3>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-gradient-to-r from-teal-500 to-blue-600 rounded-2xl p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Welcome to IndipATH Admin Portal</h2>
          <p className="text-white/90">
            Manage patients, appointments, and reports efficiently. Upload test reports and send WhatsApp notifications to patients.
          </p>
        </div>

        <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Quick Start Guide:</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>✅ <strong>Step 1:</strong> Go to "Patients" to view or add patient records</p>
            <p>✅ <strong>Step 2:</strong> Go to "Upload Report" to upload a test report PDF for any patient</p>
            <p>✅ <strong>Step 3:</strong> Go to "WhatsApp Notifications" to send report ready message to patients</p>
            <p>✅ <strong>Step 4:</strong> Patients can download reports from the homepage using Report ID + DOB</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}