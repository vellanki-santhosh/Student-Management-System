
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, FileText, Calendar } from "lucide-react";
import { useState } from "react";

const StudyMaterials = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = ["All", "Mathematics", "Science", "English", "History", "Chemistry", "Physics"];

  const materials = [
    { id: 1, title: "Algebra Fundamentals", category: "Mathematics", type: "PDF", size: "2.4 MB", uploadDate: "2024-01-15", downloads: 45 },
    { id: 2, title: "Cell Biology Notes", category: "Science", type: "PDF", size: "3.1 MB", uploadDate: "2024-01-12", downloads: 67 },
    { id: 3, title: "Grammar Exercises", category: "English", type: "DOC", size: "1.8 MB", uploadDate: "2024-01-10", downloads: 23 },
    { id: 4, title: "World War II Timeline", category: "History", type: "PPT", size: "5.2 MB", uploadDate: "2024-01-08", downloads: 34 },
    { id: 5, title: "Chemical Reactions Lab", category: "Chemistry", type: "PDF", size: "4.7 MB", uploadDate: "2024-01-05", downloads: 56 },
    { id: 6, title: "Physics Formulas", category: "Physics", type: "PDF", size: "1.2 MB", uploadDate: "2024-01-03", downloads: 89 },
  ];

  const filteredMaterials = materials.filter(material => {
    const matchesCategory = selectedCategory === "All" || material.category === selectedCategory;
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalMaterials = materials.length;
  const totalDownloads = materials.reduce((sum, m) => sum + m.downloads, 0);
  const recentUploads = materials.filter(m => new Date(m.uploadDate) > new Date('2024-01-10')).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Study Materials</h2>
          <p className="text-gray-600">Organize and share educational resources with students</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <BookOpen className="h-4 w-4 mr-2" />
          Upload Material
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{totalMaterials}</div>
            <div className="text-sm text-gray-600">Total Materials</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{totalDownloads}</div>
            <div className="text-sm text-gray-600">Total Downloads</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{recentUploads}</div>
            <div className="text-sm text-gray-600">Recent Uploads</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <Button variant="outline">Sort by Date</Button>
          </div>
        </CardContent>
      </Card>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map((material) => (
          <Card key={material.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-purple-600" />
                  <div>
                    <CardTitle className="text-lg">{material.title}</CardTitle>
                    <CardDescription>{material.category}</CardDescription>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  material.type === 'PDF' ? 'bg-red-100 text-red-800' :
                  material.type === 'DOC' ? 'bg-blue-100 text-blue-800' :
                  'bg-orange-100 text-orange-800'
                }`}>
                  {material.type}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Uploaded: {material.uploadDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Size: {material.size}</span>
                  <span>Downloads: {material.downloads}</span>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button size="sm" className="flex-1">Download</Button>
                <Button size="sm" variant="outline">Preview</Button>
                <Button size="sm" variant="outline">Share</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMaterials.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No materials found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StudyMaterials;
