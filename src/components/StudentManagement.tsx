
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, User, Calendar } from "lucide-react";
import { useState } from "react";

const StudentManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const students = [
    { id: "STU001", name: "Alice Johnson", grade: "10th", email: "alice@school.edu", phone: "555-0123", status: "Active" },
    { id: "STU002", name: "Bob Smith", grade: "11th", email: "bob@school.edu", phone: "555-0124", status: "Active" },
    { id: "STU003", name: "Carol Davis", grade: "10th", email: "carol@school.edu", phone: "555-0125", status: "Active" },
    { id: "STU004", name: "David Wilson", grade: "12th", email: "david@school.edu", phone: "555-0126", status: "Inactive" },
    { id: "STU005", name: "Eva Brown", grade: "11th", email: "eva@school.edu", phone: "555-0127", status: "Active" },
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Student Management</h2>
          <p className="text-gray-600">Manage student enrollment, profiles, and information</p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)} className="bg-blue-600 hover:bg-blue-700">
          <User className="h-4 w-4 mr-2" />
          Add Student
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search students by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Button variant="outline">Filter by Grade</Button>
            <Button variant="outline">Export Data</Button>
          </div>
        </CardContent>
      </Card>

      {/* Add Student Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Student</CardTitle>
            <CardDescription>Register a new student to the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input placeholder="Full Name" />
              <Input placeholder="Student ID" />
              <Input placeholder="Email Address" />
              <Input placeholder="Phone Number" />
              <Input placeholder="Grade/Class" />
              <Input placeholder="Date of Birth" type="date" />
            </div>
            <div className="flex gap-2 mt-4">
              <Button className="bg-green-600 hover:bg-green-700">Save Student</Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Students List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Students ({filteredStudents.length})
          </CardTitle>
          <CardDescription>All registered students in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Student ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Grade</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Email</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Phone</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-mono text-sm">{student.id}</td>
                    <td className="py-3 px-4 font-medium">{student.name}</td>
                    <td className="py-3 px-4">{student.grade}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{student.email}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{student.phone}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        student.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm" variant="outline">View</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentManagement;
