
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, User } from "lucide-react";
import { useState } from "react";

const AttendanceTracking = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState("10-A");

  const classes = [
    { id: "10-A", name: "Grade 10-A", students: 32 },
    { id: "10-B", name: "Grade 10-B", students: 28 },
    { id: "11-A", name: "Grade 11-A", students: 30 },
    { id: "11-B", name: "Grade 11-B", students: 25 },
    { id: "12-A", name: "Grade 12-A", students: 27 },
  ];

  const attendanceData = [
    { id: "STU001", name: "Alice Johnson", status: "present", time: "08:15 AM" },
    { id: "STU002", name: "Bob Smith", status: "present", time: "08:20 AM" },
    { id: "STU003", name: "Carol Davis", status: "absent", time: "-" },
    { id: "STU004", name: "David Wilson", status: "late", time: "08:45 AM" },
    { id: "STU005", name: "Eva Brown", status: "present", time: "08:10 AM" },
    { id: "STU006", name: "Frank Miller", status: "present", time: "08:25 AM" },
  ];

  const attendanceStats = {
    present: attendanceData.filter(s => s.status === 'present').length,
    absent: attendanceData.filter(s => s.status === 'absent').length,
    late: attendanceData.filter(s => s.status === 'late').length,
    total: attendanceData.length
  };

  const toggleAttendance = (studentId: string, currentStatus: string) => {
    console.log(`Toggling attendance for ${studentId} from ${currentStatus}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Attendance Tracking</h2>
        <p className="text-gray-600">Monitor and manage student attendance efficiently</p>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {classes.map(cls => (
                <option key={cls.id} value={cls.id}>{cls.name}</option>
              ))}
            </select>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center justify-center">
            <Button className="w-full bg-green-600 hover:bg-green-700">
              <Calendar className="h-4 w-4 mr-2" />
              Mark All Present
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{attendanceStats.present}</div>
            <div className="text-sm text-gray-600">Present</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{attendanceStats.absent}</div>
            <div className="text-sm text-gray-600">Absent</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{attendanceStats.late}</div>
            <div className="text-sm text-gray-600">Late</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{Math.round((attendanceStats.present / attendanceStats.total) * 100)}%</div>
            <div className="text-sm text-gray-600">Attendance Rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Class {selectedClass} - {selectedDate}
          </CardTitle>
          <CardDescription>Mark attendance for each student</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {attendanceData.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{student.name}</h4>
                    <p className="text-sm text-gray-600">{student.id}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">{student.time}</span>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant={student.status === 'present' ? 'default' : 'outline'}
                      className={student.status === 'present' ? 'bg-green-600 hover:bg-green-700' : ''}
                      onClick={() => toggleAttendance(student.id, student.status)}
                    >
                      Present
                    </Button>
                    <Button
                      size="sm"
                      variant={student.status === 'absent' ? 'default' : 'outline'}
                      className={student.status === 'absent' ? 'bg-red-600 hover:bg-red-700' : ''}
                      onClick={() => toggleAttendance(student.id, student.status)}
                    >
                      Absent
                    </Button>
                    <Button
                      size="sm"
                      variant={student.status === 'late' ? 'default' : 'outline'}
                      className={student.status === 'late' ? 'bg-yellow-600 hover:bg-yellow-700' : ''}
                      onClick={() => toggleAttendance(student.id, student.status)}
                    >
                      Late
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex gap-2">
            <Button className="bg-blue-600 hover:bg-blue-700">Save Attendance</Button>
            <Button variant="outline">Export Report</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceTracking;
