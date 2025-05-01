import { useContext, useState } from "react";
import { CourseContext } from "../context/CourseContext";
import CourseCard from "../components/CourseCard";
import { Link } from "react-router-dom";

import { Plus, Search } from "lucide-react";

const CoursesList = () => {
  const { courses, deleteCourse } = useContext(CourseContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const COURSES_PER_PAGE = 6;

  // Filter by search
  const filteredCourses = courses.filter((course) => {
    const text = searchTerm.toLowerCase();
    return (
      course.title.toLowerCase().includes(text) ||
      course.description.toLowerCase().includes(text)
    );
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredCourses.length / COURSES_PER_PAGE);
  const startIndex = (currentPage - 1) * COURSES_PER_PAGE;
  const currentCourses = filteredCourses.slice(
    startIndex,
    startIndex + COURSES_PER_PAGE
  );

  const handlePageChange = (page) => setCurrentPage(page);

  // Responsive search input
  const [mobile, setMobile] = useState(false);
  const show = () => setMobile(!mobile);
  return (
    <div className="p-6">
      <div className="pb-5 px-5 mb-6  shadow-xl">
        <div className="flex flex-row justify-between items-center gap-4">
          <h2 className="text-2xl font-bold">Courses</h2>
          <input
            type="text"
            placeholder="Search courses..."
            className=" sm:hidden md:block rounded px-3 py-2 w-full md:w-72"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to page 1 when searching
            }}
          />
          <div className="flex gap-2">
            <Search
              className="sm:inline-block md:hidden"
              onClick={() => show()}
            />
            <Link
              to="/courses/new"
              className="flex bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              <Plus />{" "}
              <span className="sm:hidden md:block"> Add New Course</span>
            </Link>
          </div>
        </div>
        <div className={`flex md:hidden ${mobile ? "block" : "hidden"} mt-3`}>
          <input
            type="text"
            placeholder="Search courses..."
            className="rounded px-3 py-2 w-full md:w-72"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to page 1 when searching
            }}
          />
        </div>
      </div>

      {currentCourses.length === 0 ? (
        <p>No matching courses found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {currentCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onDelete={deleteCourse}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded border ${
                  page === currentPage
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CoursesList;
