
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User } from "lucide-react";
import { useState } from "react";

const Timetable = () => {
  const [selectedClass, setSelectedClass] = useState("10-A");
  const [viewMode, setViewMode] = useState("week");

  const classes = ["10-A", "10-B", "11-A", "11-B", "12-A"];
  const timeSlots = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"];
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const timetableData = {
    "Monday": {
      "08:00": { subject: "Mathematics", teacher: "Dr. Smith", room: "101" },
      "09:00": { subject: "English", teacher: "Ms. Johnson", room: "102" },
      "10:00": { subject: "Break", teacher: "", room: "" },
      "11:00": { subject: "Science", teacher: "Mr. Brown", room: "Lab 1" },
      "12:00": { subject: "History", teacher: "Ms. Davis", room: "103" },
      "13:00": { subject: "Lunch", teacher: "", room: "" },
      "14:00": { subject: "Physics", teacher: "Dr. Wilson", room: "Lab 2" },
      "15:00": { subject: "Art", teacher: "Ms. Taylor", room: "Art Room" },
    },
    "Tuesday": {
      "08:00": { subject: "Science", teacher: "Mr. Brown", room: "Lab 1" },
      "09:00": { subject: "Mathematics", teacher: "Dr. Smith", room: "101" },
      "10:00": { subject: "Break", teacher: "", room: "" },
      "11:00": { subject: "English", teacher: "Ms. Johnson", room: "102" },
      "12:00": { subject: "Chemistry", teacher: "Dr. Lee", room: "Lab 3" },
      "13:00": { subject: "Lunch", teacher: "", room: "" },
      "14:00": { subject: "Geography", teacher: "Mr. Clark", room: "104" },
      "15:00": { subject: "PE", teacher: "Coach Adams", room: "Gym" },
    },
    // Add more days as needed
  };

  const getSubjectColor = (subject: string) => {
    const colors = {
      "Mathematics": "bg-blue-100 text-blue-800",
      "English": "bg-green-100 text-green-800",
      "Science": "bg-purple-100 text-purple-800",
      "History": "bg-yellow-100 text-yellow-800",
      "Physics": "bg-red-100 text-red-800",
      "Chemistry": "bg-indigo-100 text-indigo-800",
      "Geography": "bg-pink-100 text-pink-800",
      "Art": "bg-orange-100 text-orange-800",
      "PE": "bg-teal-100 text-teal-800",
      "Break": "bg-gray-100 text-gray-600",
      "Lunch": "bg-gray-100 text-gray-600",
    };
    return colors[subject as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Timetable Management</h2>
          <p className="text-gray-600">Manage class schedules and time slots efficiently</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <Calendar className="h-4 w-4 mr-2" />
          Add Schedule
        </Button>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Card className="flex-1">
          <CardContent className="p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {classes.map(cls => (
                <option key={cls} value={cls}>Grade {cls}</option>
              ))}
            </select>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardContent className="p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">View Mode</label>
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant={viewMode === "week" ? "default" : "outline"}
                onClick={() => setViewMode("week")}
              >
                Week
              </Button>
              <Button
                size="sm"
                variant={viewMode === "day" ? "default" : "outline"}
                onClick={() => setViewMode("day")}
              >
                Day
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timetable Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Class {selectedClass} - Weekly Schedule
          </CardTitle>
          <CardDescription>Current timetable for the selected class</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-3 bg-gray-50 text-left font-medium text-gray-700 min-w-[100px]">
                    Time
                  </th>
                  {days.map(day => (
                    <th key={day} className="border border-gray-300 p-3 bg-gray-50 text-center font-medium text-gray-700 min-w-[150px]">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map(time => (
                  <tr key={time}>
                    <td className="border border-gray-300 p-3 font-medium text-gray-700 bg-gray-50">
                      {time}
                    </td>
                    {days.map(day => {
                      const classData = timetableData[day as keyof typeof timetableData]?.[time];
                      return (
                        <td key={`${day}-${time}`} className="border border-gray-300 p-2">
                          {classData ? (
                            <div className={`p-3 rounded-lg ${getSubjectColor(classData.subject)}`}>
                              <div className="font-medium text-sm">{classData.subject}</div>
                              {classData.teacher && (
                                <div className="text-xs mt-1 flex items-center">
                                  <User className="h-3 w-3 mr-1" />
                                  {classData.teacher}
                                </div>
                              )}
                              {classData.room && (
                                <div className="text-xs">{classData.room}</div>
                              )}
                            </div>
                          ) : (
                            <div className="p-3 text-center text-gray-400 text-sm">
                              Free
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex gap-2">
            <Button className="bg-blue-600 hover:bg-blue-700">Save Schedule</Button>
            <Button variant="outline">Export PDF</Button>
            <Button variant="outline">Print Timetable</Button>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle>Subject Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {Object.keys(getSubjectColor).map(subject => (
              <div key={subject} className="flex items-center space-x-2">
                <div className={`w-4 h-4 rounded ${getSubjectColor(subject)}`}></div>
                <span className="text-sm">{subject}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Timetable;
