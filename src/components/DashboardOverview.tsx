
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, BookOpen, FileText } from "lucide-react";

const DashboardOverview = () => {
  const stats = [
    { title: "Total Students", value: "2,847", icon: Users, change: "+12%", color: "text-blue-600" },
    { title: "Present Today", value: "2,543", icon: Calendar, change: "+5%", color: "text-green-600" },
    { title: "Study Materials", value: "1,246", icon: BookOpen, change: "+8%", color: "text-purple-600" },
    { title: "Pending Grades", value: "89", icon: FileText, change: "-15%", color: "text-orange-600" },
  ];

  const recentActivities = [
    { action: "New student enrolled", student: "Sarah Johnson", time: "2 hours ago" },
    { action: "Grade submitted", student: "Math Class - Final Exam", time: "4 hours ago" },
    { action: "Attendance marked", student: "Class 10-A", time: "6 hours ago" },
    { action: "Study material uploaded", student: "Chemistry Notes", time: "1 day ago" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h2>
        <p className="text-gray-600">Welcome back! Here's what's happening at your institution today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-sm ${stat.color}`}>{stat.change} from last month</p>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-50`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest updates from your institution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.student}</p>
                  </div>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks to get you started</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <button className="w-full p-4 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
              <h4 className="font-medium text-blue-900">Add New Student</h4>
              <p className="text-sm text-blue-700">Register a new student to the system</p>
            </button>
            <button className="w-full p-4 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
              <h4 className="font-medium text-green-900">Mark Attendance</h4>
              <p className="text-sm text-green-700">Take attendance for today's classes</p>
            </button>
            <button className="w-full p-4 text-left bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
              <h4 className="font-medium text-purple-900">Upload Materials</h4>
              <p className="text-sm text-purple-700">Add new study materials for students</p>
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
