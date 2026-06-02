import { useState, useEffect } from "react";
import { AdminLayout } from "../../components/AdminLayout";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  MessageCircle,
  Send,
  FileCheck,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

interface Report {
  reportId: string;
  patientId: string;
  testName: string;
  reportDate: string;
}

interface Patient {
  id: string;
  name: string;
  mobile: string;
  dob: string;
}

export default function AdminNotifications() {
  const [reports, setReports] = useState<Report[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedReportId, setSelectedReportId] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const savedReports = JSON.parse(
      localStorage.getItem("indipath_reports") || "[]",
    );
    const savedPatients = JSON.parse(
      localStorage.getItem("indipath_patients") || "[]",
    );
    setReports(savedReports);
    setPatients(savedPatients);
  };

  useEffect(() => {
    if (selectedReportId) {
      generateMessage(selectedReportId);
    }
  }, [selectedReportId]);

  const generateMessage = (reportId: string) => {
    const report = reports.find((r) => r.reportId === reportId);
    if (!report) return;

    const patient = patients.find(
      (p) => p.id === report.patientId,
    );
    if (!patient) return;

    const websiteUrl = window.location.origin;
    const generatedMessage = `Hello ${patient.name}, your Indipath medical report is ready.

Report ID: ${report.reportId}
DOB: ${new Date(patient.dob).toLocaleDateString()}

Download your report here: ${websiteUrl}
(Click "Download Report" button and enter your Report ID and DOB)

IndipATH – Your Health, Our Priority`;

    setMessage(generatedMessage);
  };

  const handleSendWhatsApp = () => {
    if (!selectedReportId) {
      toast.error("Please select a report");
      return;
    }

    const report = reports.find(
      (r) => r.reportId === selectedReportId,
    );
    if (!report) return;

    const patient = patients.find(
      (p) => p.id === report.patientId,
    );
    if (!patient) return;

    // Remove country code prefix if present and ensure it starts with country code
    let phoneNumber = patient.mobile.replace(/\D/g, "");
    if (!phoneNumber.startsWith("91")) {
      phoneNumber = "91" + phoneNumber;
    }

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    toast.success("Opening WhatsApp...");
  };

  const getPatientInfo = (reportId: string) => {
    const report = reports.find((r) => r.reportId === reportId);
    if (!report) return null;

    const patient = patients.find(
      (p) => p.id === report.patientId,
    );
    if (!patient) return null;

    return {
      name: patient.name,
      mobile: patient.mobile,
      testName: report.testName,
      reportDate: report.reportDate,
    };
  };

  const selectedPatientInfo = selectedReportId
    ? getPatientInfo(selectedReportId)
    : null;

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          WhatsApp Notifications
        </h1>

        <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl p-6 text-white mb-6">
          <div className="flex items-center gap-3 mb-2">
            <MessageCircle className="w-8 h-8" />
            <h2 className="text-2xl font-bold">
              Send Report Ready Notification
            </h2>
          </div>
          <p className="text-white/90">
            Notify patients when their reports are ready for
            download. The system will auto-generate a message
            with Report ID and DOB.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          <div>
            <Label htmlFor="reportId">Select Report *</Label>
            <Select
              value={selectedReportId}
              onValueChange={setSelectedReportId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose a report to notify" />
              </SelectTrigger>
              <SelectContent>
                {reports.map((report) => {
                  const patient = patients.find(
                    (p) => p.id === report.patientId,
                  );
                  return (
                    <SelectItem
                      key={report.reportId}
                      value={report.reportId}
                    >
                      {report.reportId} -{" "}
                      {patient?.name || "Unknown"} -{" "}
                      {report.testName}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          {selectedPatientInfo && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2 text-blue-900 font-semibold mb-3">
                <FileCheck className="w-5 h-5" />
                Patient & Report Details
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-600">
                    Patient Name:
                  </span>
                  <p className="font-semibold text-gray-900">
                    {selectedPatientInfo.name}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600">
                    Mobile Number:
                  </span>
                  <p className="font-semibold text-gray-900">
                    {selectedPatientInfo.mobile}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600">
                    Test Name:
                  </span>
                  <p className="font-semibold text-gray-900">
                    {selectedPatientInfo.testName}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600">
                    Report Date:
                  </span>
                  <p className="font-semibold text-gray-900">
                    {new Date(
                      selectedPatientInfo.reportDate,
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="message">
              WhatsApp Message Preview
            </Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[200px] mt-2 font-mono text-sm"
              placeholder="Select a report to generate message..."
            />
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <p className="font-semibold mb-1">
                How it works:
              </p>
              <ol className="list-decimal list-inside space-y-1">
                <li>
                  Select the patient's report from the dropdown
                </li>
                <li>Review the auto-generated message</li>
                <li>
                  Click "Send on WhatsApp" to open WhatsApp with
                  pre-filled message
                </li>
                <li>Send the message to the patient</li>
                <li>
                  Patient can download report using Report ID +
                  DOB from website
                </li>
              </ol>
            </div>
          </div>

          <Button
            onClick={handleSendWhatsApp}
            disabled={!selectedReportId}
            className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-6"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Send on WhatsApp
          </Button>
        </div>

        <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="font-bold text-gray-900 mb-3">
            Demo Instructions:
          </h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>
              <strong>Step 1:</strong> Go to "Patients" and add
              a new patient with all details including DOB
            </p>
            <p>
              <strong>Step 2:</strong> Go to "Upload Report" and
              upload a dummy PDF report for that patient
            </p>
            <p>
              <strong>Step 3:</strong> Come back here and select
              the report to send WhatsApp notification
            </p>
            <p>
              <strong>Step 4:</strong> Patient can then visit
              the homepage, click "Download Report", and enter
              Report ID + DOB to download
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}