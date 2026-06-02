import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { FileCheck, Download, Shield, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface ReportDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReportDownloadModal({ isOpen, onClose }: ReportDownloadModalProps) {
  const [step, setStep] = useState<'verify' | 'download'>('verify');
  const [reportId, setReportId] = useState('');
  const [dob, setDob] = useState('');
  const [verifiedReport, setVerifiedReport] = useState<any>(null);

  const handleVerify = () => {
    // Get reports from localStorage (will be replaced with Supabase)
    const reports = JSON.parse(localStorage.getItem('indipath_reports') || '[]');
    const patients = JSON.parse(localStorage.getItem('indipath_patients') || '[]');

    const report = reports.find((r: any) => r.reportId === reportId);

    if (!report) {
      toast.error('Invalid Report ID');
      return;
    }

    const patient = patients.find((p: any) => p.id === report.patientId);

    if (!patient || patient.dob !== dob) {
      toast.error('Date of Birth does not match our records');
      return;
    }

    setVerifiedReport({ ...report, patientName: patient.name });
    setStep('download');
    toast.success('Report verified successfully!');
  };

  const handleDownload = () => {
    if (verifiedReport?.pdfUrl) {
      // Create a link to download the file
      const link = document.createElement('a');
      link.href = verifiedReport.pdfUrl;
      link.download = `IndipATH_Report_${reportId}.pdf`;
      link.click();
      toast.success('Report downloaded successfully!');
    } else {
      toast.error('Report file not available');
    }
  };

  const handleClose = () => {
    setStep('verify');
    setReportId('');
    setDob('');
    setVerifiedReport(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Shield className="w-6 h-6 text-teal-600" />
            Secure Report Download
          </DialogTitle>
          <DialogDescription>
            {step === 'verify' 
              ? 'Enter your Report ID and Date of Birth to securely access your medical report.'
              : 'Your report has been verified. You can now download your medical report.'}
          </DialogDescription>
        </DialogHeader>

        {step === 'verify' ? (
          <div className="space-y-6 py-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-800">
                Enter your Report ID and Date of Birth to securely access your medical report.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="reportId">Report ID</Label>
                <Input
                  id="reportId"
                  placeholder="e.g., IND2026001"
                  value={reportId}
                  onChange={(e) => setReportId(e.target.value.toUpperCase())}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>

            <Button
              onClick={handleVerify}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white"
              disabled={!reportId || !dob}
            >
              <Shield className="w-4 h-4 mr-2" />
              Verify Report
            </Button>
          </div>
        ) : (
          <div className="space-y-6 py-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <FileCheck className="w-12 h-12 text-green-600 mx-auto mb-2" />
              <p className="font-semibold text-green-900">Report Verified Successfully!</p>
            </div>

            <div className="space-y-3 bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Patient Name:</span>
                <span className="font-semibold text-gray-900">{verifiedReport?.patientName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Test Name:</span>
                <span className="font-semibold text-gray-900">{verifiedReport?.testName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Report Date:</span>
                <span className="font-semibold text-gray-900">
                  {new Date(verifiedReport?.reportDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Report ID:</span>
                <span className="font-semibold text-gray-900">{verifiedReport?.reportId}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setStep('verify')}
                variant="outline"
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={handleDownload}
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}