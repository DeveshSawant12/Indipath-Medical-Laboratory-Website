// Initialize demo data for testing
export function initializeDemoData() {
  // Check if data already exists
  if (localStorage.getItem('indipath_demo_initialized')) {
    return;
  }

  // Demo patients
  const demoPatients = [
    {
      id: '1001',
      name: 'Rajesh Kumar',
      dob: '1985-05-15',
      mobile: '9876543210',
      gender: 'Male',
      address: '123 MG Road, Bangalore',
      createdAt: new Date().toISOString(),
    },
    {
      id: '1002',
      name: 'Priya Sharma',
      dob: '1990-08-22',
      mobile: '9876543211',
      gender: 'Female',
      address: '456 Park Street, Mumbai',
      createdAt: new Date().toISOString(),
    },
  ];

  // Demo appointments
  const demoAppointments = [
    {
      id: 'APT001',
      patientId: '1001',
      patientName: 'Rajesh Kumar',
      testName: 'Complete Blood Count',
      packageName: 'Basic Health Checkup',
      preferredDate: new Date().toISOString(),
      preferredTime: '10:00 AM',
      status: 'Confirmed',
      notes: 'Home collection requested',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'APT002',
      patientId: '1002',
      patientName: 'Priya Sharma',
      testName: 'Thyroid Profile',
      packageName: 'Women Wellness Package',
      preferredDate: new Date().toISOString(),
      preferredTime: '11:00 AM',
      status: 'Processing',
      notes: '',
      createdAt: new Date().toISOString(),
    },
  ];

  localStorage.setItem('indipath_patients', JSON.stringify(demoPatients));
  localStorage.setItem('indipath_appointments', JSON.stringify(demoAppointments));
  localStorage.setItem('indipath_reports', JSON.stringify([]));
  localStorage.setItem('indipath_demo_initialized', 'true');
}
