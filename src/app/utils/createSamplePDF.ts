// Utility to create a sample PDF for demo purposes
// This creates a simple PDF-like data URL for demonstration
export function createSamplePDF(patientName: string, testName: string, reportId: string): string {
  // Create a simple HTML-based PDF representation
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Medical Report - ${reportId}</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 40px; }
    .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #14b8a6; padding-bottom: 20px; }
    .logo { font-size: 28px; font-weight: bold; color: #14b8a6; }
    .report-info { margin: 20px 0; }
    .report-info div { margin: 10px 0; }
    .label { font-weight: bold; color: #374151; }
    .value { color: #1f2937; }
    .footer { margin-top: 40px; text-align: center; color: #6b7280; font-size: 12px; }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">IndipATH Medical Laboratory</div>
    <p>Your Health, Our Priority</p>
  </div>
  <h2>Medical Test Report</h2>
  <div class="report-info">
    <div><span class="label">Report ID:</span> <span class="value">${reportId}</span></div>
    <div><span class="label">Patient Name:</span> <span class="value">${patientName}</span></div>
    <div><span class="label">Test Name:</span> <span class="value">${testName}</span></div>
    <div><span class="label">Report Date:</span> <span class="value">${new Date().toLocaleDateString()}</span></div>
  </div>
  <p>This is a sample medical report for demonstration purposes.</p>
  <div class="footer">
    <p>IndipATH Medical Laboratory | +91 99999 99999 | contact@indipath.com</p>
    <p>123 Medical Plaza, Health Street, City - 400001</p>
  </div>
</body>
</html>
  `;

  // Convert to data URL (this is a simplified version - real PDF would use libraries)
  const blob = new Blob([htmlContent], { type: 'text/html' });
  return URL.createObjectURL(blob);
}
