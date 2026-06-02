import { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { toast } from 'sonner';

interface Patient {
  id: string;
  name: string;
  dob: string;
  mobile: string;
  gender: string;
  address: string;
  createdAt: string;
}

export default function AdminPatients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    mobile: '',
    gender: '',
    address: '',
  });

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = () => {
    const savedPatients = JSON.parse(localStorage.getItem('indipath_patients') || '[]');
    setPatients(savedPatients);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.dob || !formData.mobile || !formData.gender) {
      toast.error('Please fill all required fields');
      return;
    }

    const savedPatients = JSON.parse(localStorage.getItem('indipath_patients') || '[]');

    if (editingPatient) {
      const updatedPatients = savedPatients.map((p: Patient) =>
        p.id === editingPatient.id ? { ...p, ...formData } : p
      );
      localStorage.setItem('indipath_patients', JSON.stringify(updatedPatients));
      toast.success('Patient updated successfully');
    } else {
      const newPatient: Patient = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString(),
      };
      savedPatients.push(newPatient);
      localStorage.setItem('indipath_patients', JSON.stringify(savedPatients));
      toast.success('Patient added successfully');
    }

    loadPatients();
    handleCloseModal();
  };

  const handleEdit = (patient: Patient) => {
    setEditingPatient(patient);
    setFormData({
      name: patient.name,
      dob: patient.dob,
      mobile: patient.mobile,
      gender: patient.gender,
      address: patient.address,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (patientId: string) => {
    if (confirm('Are you sure you want to delete this patient?')) {
      const savedPatients = JSON.parse(localStorage.getItem('indipath_patients') || '[]');
      const updatedPatients = savedPatients.filter((p: Patient) => p.id !== patientId);
      localStorage.setItem('indipath_patients', JSON.stringify(updatedPatients));
      loadPatients();
      toast.success('Patient deleted successfully');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPatient(null);
    setFormData({
      name: '',
      dob: '',
      mobile: '',
      gender: '',
      address: '',
    });
  };

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.mobile.includes(searchTerm) ||
    patient.id.includes(searchTerm)
  );

  return (
    <AdminLayout>
      <div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Patient Management</h1>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Patient
          </Button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search by name, mobile, or ID..."
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
                <TableHead>Patient ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>DOB</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Address</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">{patient.id}</TableCell>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{new Date(patient.dob).toLocaleDateString()}</TableCell>
                    <TableCell>{patient.mobile}</TableCell>
                    <TableCell>{patient.gender}</TableCell>
                    <TableCell>{patient.address || 'N/A'}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          onClick={() => handleEdit(patient)}
                          size="sm"
                          variant="outline"
                          className="text-blue-600 border-blue-600 hover:bg-blue-50"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => handleDelete(patient.id)}
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
                    No patients found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {editingPatient ? 'Edit Patient' : 'Add New Patient'}
              </DialogTitle>
              <DialogDescription>
                {editingPatient ? 'Edit patient details' : 'Add a new patient'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter full name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="dob">Date of Birth *</Label>
                <Input
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="mobile">Mobile Number *</Label>
                <Input
                  id="mobile"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  placeholder="Enter mobile number"
                  required
                />
              </div>
              <div>
                <Label htmlFor="gender">Gender *</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => setFormData({ ...formData, gender: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Enter address"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="button" onClick={handleCloseModal} variant="outline" className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 bg-teal-600 hover:bg-teal-700 text-white">
                  {editingPatient ? 'Update' : 'Add'} Patient
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}