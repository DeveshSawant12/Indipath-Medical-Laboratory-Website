import { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Search, Download, Trash2, Eye } from 'lucide-react';
import { toast } from 'sonner';

interface Report {
  reportId: string;
  patientId: string;
  testName: string;
  reportDate: string;
  pdfUrl: string;
  uploadedAt: string;
}

interface Patient {
  id: string;
  name: string;
  mobile: string;
}

export default function AdminReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadReports();
    loadPatients();
  }, []);

  const loadReports = () => {
    const savedReports = JSON.parse(localStorage.getItem('indipath_reports') || '[]');
    setReports(savedReports);
  };

  const loadPatients = () => {
    const savedPatients = JSON.parse(localStorage.getItem('indipath_patients') || '[]');
    setPatients(savedPatients);
  };

  const getPatientName = (patientId: string) => {
    const patient = patients.find((p) => p.id === patientId);
    return patient ? patient.name : 'Unknown';
  };

  const getPatientMobile = (patientId: string) => {
    const patient = patients.find((p) => p.id === patientId);
    return patient ? patient.mobile : '';
  };

  const handleDownload = (report: Report) => {
    const link = document.createElement('a');
    link.href = report.pdfUrl;
    link.download = `IndipATH_Report_${report.reportId}.pdf`;
    link.click();
    toast.success('Report downloaded');
  };

  const handleDelete = (reportId: string) => {
    if (confirm('Are you sure you want to delete this report?')) {
      const savedReports = JSON.parse(localStorage.getItem('indipath_reports') || '[]');
      const updatedReports = savedReports.filter((r: Report) => r.reportId !== reportId);
      localStorage.setItem('indipath_reports', JSON.stringify(updatedReports));
      loadReports();
      toast.success('Report deleted');
    }
  };

  const filteredReports = reports.filter((report) =>
    report.reportId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getPatientName(report.patientId).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Reports Management</h1>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search by Report ID, test name, or patient name..."
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
                <TableHead>Report ID</TableHead>
                <TableHead>Patient Name</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead>Test Name</TableHead>
                <TableHead>Report Date</TableHead>
                <TableHead>Uploaded At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.length > 0 ? (
                filteredReports.map((report) => (
                  <TableRow key={report.reportId}>
                    <TableCell className="font-bold text-teal-600">{report.reportId}</TableCell>
                    <TableCell>{getPatientName(report.patientId)}</TableCell>
                    <TableCell>{getPatientMobile(report.patientId)}</TableCell>
                    <TableCell>{report.testName}</TableCell>
                    <TableCell>{new Date(report.reportDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(report.uploadedAt).toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          onClick={() => handleDownload(report)}
                          size="sm"
                          variant="outline"
                          className="text-blue-600 border-blue-600 hover:bg-blue-50"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => handleDelete(report.reportId)}
                          size="sm"
                          variant="outline"
                          className="text-red-600 border-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                    No reports found
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