import { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Upload, FileCheck } from 'lucide-react';
import { toast } from 'sonner';

interface Patient {
  id: string;
  name: string;
}

export default function AdminUploadReport() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [formData, setFormData] = useState({
    patientId: '',
    testName: '',
    reportDate: '',
    pdfFile: null as File | null,
  });
  const [reportId, setReportId] = useState('');

  useEffect(() => {
    const savedPatients = JSON.parse(localStorage.getItem('indipath_patients') || '[]');
    setPatients(savedPatients);
    generateReportId();
  }, []);

  const generateReportId = () => {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 9000) + 1000;
    setReportId(`IND${year}${random}`);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf') {
        setFormData({ ...formData, pdfFile: file });
      } else {
        toast.error('Please select a PDF file');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.patientId || !formData.testName || !formData.reportDate || !formData.pdfFile) {
      toast.error('Please fill all fields and upload a PDF file');
      return;
    }

    // In a real app, this would upload to Supabase Storage
    // For demo, we'll create a data URL from the file
    const reader = new FileReader();
    reader.onloadend = () => {
      const savedReports = JSON.parse(localStorage.getItem('indipath_reports') || '[]');
      const newReport = {
        reportId,
        patientId: formData.patientId,
        testName: formData.testName,
        reportDate: formData.reportDate,
        pdfUrl: reader.result as string, // In real app, this would be the Supabase Storage URL
        uploadedAt: new Date().toISOString(),
      };

      savedReports.push(newReport);
      localStorage.setItem('indipath_reports', JSON.stringify(savedReports));
      
      toast.success('Report uploaded successfully!');
      
      // Reset form
      setFormData({
        patientId: '',
        testName: '',
        reportDate: '',
        pdfFile: null,
      });
      generateReportId();
      
      // Reset file input
      const fileInput = document.getElementById('pdfFile') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    };

    reader.readAsDataURL(formData.pdfFile);
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Upload Patient Report</h1>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <FileCheck className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-teal-900 mb-1">Auto-Generated Report ID</p>
              <p className="text-2xl font-bold text-teal-600">{reportId}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="patientId">Select Patient *</Label>
              <Select
                value={formData.patientId}
                onValueChange={(value) => setFormData({ ...formData, patientId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a patient" />
                </SelectTrigger>
                <SelectContent>
                  {patients.map((patient) => (
                    <SelectItem key={patient.id} value={patient.id}>
                      {patient.name} (ID: {patient.id})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="testName">Test Name *</Label>
              <Input
                id="testName"
                value={formData.testName}
                onChange={(e) => setFormData({ ...formData, testName: e.target.value })}
                placeholder="e.g., Complete Blood Count"
                required
              />
            </div>

            <div>
              <Label htmlFor="reportDate">Report Date *</Label>
              <Input
                id="reportDate"
                type="date"
                value={formData.reportDate}
                onChange={(e) => setFormData({ ...formData, reportDate: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="pdfFile">Upload Report PDF *</Label>
              <div className="mt-2">
                <Input
                  id="pdfFile"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  required
                />
              </div>
              {formData.pdfFile && (
                <p className="text-sm text-green-600 mt-2 flex items-center gap-2">
                  <FileCheck className="w-4 h-4" />
                  {formData.pdfFile.name} selected
                </p>
              )}
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white text-lg py-6"
              >
                <Upload className="w-5 h-5 mr-2" />
                Upload Report
              </Button>
            </div>
          </form>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> After uploading the report, you can send a WhatsApp notification to the patient from the "WhatsApp Notifications" section.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}