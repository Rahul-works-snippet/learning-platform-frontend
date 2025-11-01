import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import Header from "../../components/ui/Header";

export default function InstructorDashboard() {
  const [courses, setCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    instructor: "",
    category: "",
    price: "",
    rating: "",
    duration: "",
    studentscount: "",
    image_url: ""
  });

  // Fetch courses
  const fetchCourses = async () => {
    const { data, error } = await supabase.from("courses").select("*");
    if (error) console.error("❌ Error fetching courses:", error);
    else setCourses(data || []);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or Update course
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingCourse) {
      const { error } = await supabase
        .from("courses")
        .update(formData)
        .eq("id", editingCourse.id);
      if (!error) alert("✅ Course updated successfully!");
    } else {
      const { error } = await supabase.from("courses").insert([formData]);
      if (!error) alert("✅ Course added successfully!");
    }
    setIsModalOpen(false);
    setEditingCourse(null);
    setFormData({
      title: "",
      description: "",
      instructor: "",
      category: "",
      price: "",
      rating: "",
      duration: "",
      studentscount: "",
      image_url: ""
    });
    fetchCourses();
  };

  // Delete course
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      const { error } = await supabase.from("courses").delete().eq("id", id);
      if (!error) {
        alert("🗑️ Course deleted successfully!");
        fetchCourses();
      }
    }
  };

  // Open edit modal
  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData(course);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6">Instructor Dashboard</h1>

        <div className="flex justify-between items-center mb-6">
          <p className="text-muted-foreground">Manage your uploaded courses</p>
          <button
            onClick={() => {
              setEditingCourse(null);
              setFormData({
                title: "",
                description: "",
                instructor: "",
                category: "",
                price: "",
                rating: "",
                duration: "",
                studentscount: "",
                image_url: ""
              });
              setIsModalOpen(true);
            }}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
          >
            ➕ Add New Course
          </button>
        </div>

        {/* Courses Grid */}
        {courses.length === 0 ? (
          <p className="text-muted-foreground text-center mt-12">
            No courses found. Start by adding one!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-card rounded-xl p-4 shadow-md hover:shadow-lg transition"
              >
                <img
                  src={course.image_url || "https://via.placeholder.com/400x250?text=No+Image"}
                  alt={course.title}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
                <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                  {course.description || "No description provided."}
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-medium">₹{course.price}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(course)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(course.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add/Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-card rounded-xl p-6 w-full max-w-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">
                {editingCourse ? "Edit Course" : "Add New Course"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-3">
                {[
                  "title",
                  "description",
                  "instructor",
                  "category",
                  "price",
                  "rating",
                  "duration",
                  "studentscount",
                  "image_url"
                ].map((field) => (
                  <input
                    key={field}
                    type="text"
                    name={field}
                    placeholder={field.replace("_", " ").toUpperCase()}
                    value={formData[field] || ""}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 bg-background"
                    required={field !== "image_url"}
                  />
                ))}
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-300 px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-primary text-white px-4 py-2 rounded-lg"
                  >
                    {editingCourse ? "Update" : "Add"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
