import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CourseContext } from "../context/CourseContext";
import CourseForm from "../components/CourseForm";

const AddEditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addCourse, updateCourse, getCourseById } = useContext(CourseContext);

  const isEdit = Boolean(id);
  const course = isEdit ? getCourseById(id) : null;

  const handleSubmit = (data) => {
    if (isEdit) {
      updateCourse(id, data);
    } else {
      addCourse(data);
    }
    navigate("/courses");
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50">
      <h2 className="text-2xl font-semibold mb-4">
        {isEdit ? "Edit Course" : "Add New Course"}
      </h2>
      <CourseForm initialData={course} onSubmit={handleSubmit} />
    </div>
  );
};

export default AddEditCourse;
