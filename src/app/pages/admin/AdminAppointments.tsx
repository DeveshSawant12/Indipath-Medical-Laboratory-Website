import { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { Search } from 'lucide-react';
import { toast } from 'sonner';

interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  testName: string;
  packageName: string;
  preferredDate: string;
  preferredTime: string;
  status: string;
  notes: string;
  createdAt: string;
}

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = () => {
    const savedAppointments = JSON.parse(localStorage.getItem('indipath_appointments') || '[]');
    setAppointments(savedAppointments);
  };

  const handleStatusChange = (appointmentId: string, newStatus: string) => {
    const savedAppointments = JSON.parse(localStorage.getItem('indipath_appointments') || '[]');
    const updatedAppointments = savedAppointments.map((a: Appointment) =>
      a.id === appointmentId ? { ...a, status: newStatus } : a
    );
    localStorage.setItem('indipath_appointments', JSON.stringify(updatedAppointments));
    loadAppointments();
    toast.success('Appointment status updated');
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'Confirmed': 'bg-blue-100 text-blue-800 border-blue-300',
      'Sample Collected': 'bg-purple-100 text-purple-800 border-purple-300',
      'Processing': 'bg-orange-100 text-orange-800 border-orange-300',
      'Report Ready': 'bg-teal-100 text-teal-800 border-teal-300',
      'Completed': 'bg-green-100 text-green-800 border-green-300',
      'Cancelled': 'bg-red-100 text-red-800 border-red-300',
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.packageName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statuses = [
    'Pending',
    'Confirmed',
    'Sample Collected',
    'Processing',
    'Report Ready',
    'Completed',
    'Cancelled',
  ];

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Appointment Management</h1>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search by patient name, test, or package..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Patient Name</TableHead>
                <TableHead>Test/Package</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell className="font-medium">{appointment.id}</TableCell>
                    <TableCell>{appointment.patientName}</TableCell>
                    <TableCell>
                      <div>
                        {appointment.testName && <div>{appointment.testName}</div>}
                        {appointment.packageName && <div className="text-sm text-gray-600">{appointment.packageName}</div>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>{new Date(appointment.preferredDate).toLocaleDateString()}</div>
                      <div className="text-sm text-gray-600">{appointment.preferredTime}</div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{appointment.notes || 'N/A'}</TableCell>
                    <TableCell>
                      <Select
                        value={appointment.status}
                        onValueChange={(value) => handleStatusChange(appointment.id, value)}
                      >
                        <SelectTrigger className="w-[150px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {statuses.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                    No appointments found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
}