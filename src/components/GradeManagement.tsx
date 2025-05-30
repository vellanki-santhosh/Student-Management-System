
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Users } from "lucide-react";
import { useState } from "react";

const GradeManagement = () => {
  const [selectedSubject, setSelectedSubject] = useState("Mathematics");
  const [selectedExam, setSelectedExam] = useState("Mid-term");

  const subjects = ["Mathematics", "Science", "English", "History", "Chemistry", "Physics"];
  const exams = ["Mid-term", "Final", "Quiz 1", "Quiz 2", "Assignment 1"];

  const grades = [
    { id: "STU001", name: "Alice Johnson", grade: "A", score: 92, total: 100, percentage: 92 },
    { id: "STU002", name: "Bob Smith", grade: "B+", score: 87, total: 100, percentage: 87 },
    { id: "STU003", name: "Carol Davis", grade: "A-", score: 89, total: 100, percentage: 89 },
    { id: "STU004", name: "David Wilson", grade: "B", score: 83, total: 100, percentage: 83 },
    { id: "STU005", name: "Eva Brown", grade: "A", score: 95, total: 100, percentage: 95 },
  ];

  const classStats = {
    average: grades.reduce((sum, g) => sum + g.percentage, 0) / grades.length,
    highest: Math.max(...grades.map(g => g.percentage)),
    lowest: Math.min(...grades.map(g => g.percentage)),
    passing: grades.filter(g => g.percentage >= 60).length
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Grade Management</h2>
        <p className="text-gray-600">Manage student grades, assessments, and academic performance</p>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Exam/Assessment</label>
            <select
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {exams.map(exam => (
                <option key={exam} value={exam}>{exam}</option>
              ))}
            </select>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center justify-center">
            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              <FileText className="h-4 w-4 mr-2" />
              Add New Assessment
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Grade Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{classStats.average.toFixed(1)}%</div>
            <div className="text-sm text-gray-600">Class Average</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{classStats.highest}%</div>
            <div className="text-sm text-gray-600">Highest Score</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{classStats.lowest}%</div>
            <div className="text-sm text-gray-600">Lowest Score</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{classStats.passing}/{grades.length}</div>
            <div className="text-sm text-gray-600">Passing Students</div>
          </CardContent>
        </Card>
      </div>

      {/* Grades Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            {selectedSubject} - {selectedExam} Results
          </CardTitle>
          <CardDescription>Enter and manage student grades for this assessment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Student ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Score</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Total</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Percentage</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Grade</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {grades.map((student) => (
                  <tr key={student.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-mono text-sm">{student.id}</td>
                    <td className="py-3 px-4 font-medium">{student.name}</td>
                    <td className="py-3 px-4">
                      <Input 
                        type="number" 
                        value={student.score} 
                        className="w-20" 
                        min="0" 
                        max={student.total}
                      />
                    </td>
                    <td className="py-3 px-4">{student.total}</td>
                    <td className="py-3 px-4">
                      <span className={`font-medium ${
                        student.percentage >= 90 ? 'text-green-600' :
                        student.percentage >= 80 ? 'text-blue-600' :
                        student.percentage >= 70 ? 'text-yellow-600' :
                        student.percentage >= 60 ? 'text-orange-600' : 'text-red-600'
                      }`}>
                        {student.percentage}%
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        student.grade.startsWith('A') ? 'bg-green-100 text-green-800' :
                        student.grade.startsWith('B') ? 'bg-blue-100 text-blue-800' :
                        student.grade.startsWith('C') ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {student.grade}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Button size="sm" variant="outline">Save</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 flex gap-2">
            <Button className="bg-green-600 hover:bg-green-700">Save All Grades</Button>
            <Button variant="outline">Generate Report</Button>
            <Button variant="outline">Email Results</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GradeManagement;
