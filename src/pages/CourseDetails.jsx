import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CourseContext } from "../context/CourseContext";

import { Link } from "react-router-dom";

import {ArrowLeft, SquarePen, Trash2} from "lucide-react"

const CourseDetails = (onDelete) => {
  const { id } = useParams();
  const { getCourseById } = useContext(CourseContext);
  const navigate = useNavigate();

  const course = getCourseById(id);

  if (!course) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Course not found.</p>
        <button
          onClick={() => navigate("/courses")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Back to Courses
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 pt-0 bg-gray-50">
      <div className="shadow-xl mb-7"> 
        <button
            onClick={() => navigate("/courses")}
            className=" px-4 py-6 text-gray-700 transition-all duration-[50ms] hover:bg-gray-200"
          >
            <ArrowLeft className="mr-2" /> 
          </button>
      </div>
      <div className="flex gap-4 flex-col md:flex-row bg-white shadow-md rounded-lg overflow-hidden">
        {course.image && (
          <img
            src={course.image}
            alt={course.title}
            className="w-full md:min-w-[50%] md:max-w-[50%] h-40 md:h-[75] object-contain"
          />
        )}

        <div className="p-6 space-y-4 flex-1">
          <h2 className="text-3xl font-bold">{course.title}</h2>
          <p className="text-gray-700 sm:text-base/5 md:text-lg/7">{course.description}</p>

          <div className="text-gray-600 flex flex-col gap-2">
            <p>
              <span className="font-medium">Start Date:</span>{" "}
              {course.startDate || "N/A"}
            </p>
            <p>
              <span className="font-medium">End Date:</span>{" "}
              {course.endDate || "N/A"}
            </p>
            <p>
              <span className="font-medium">Price:</span>{" "}
              ${course.price || "0"}
            </p>
          </div>

                  <div className="flex justify-between mt-4">
                    <Link
                      to={`/courses/${course.id}/edit`}
                      className="flex text-lg bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      <SquarePen /> {" "} Edit
                    </Link>
                    <button
                      onClick={() => onDelete(course.id)}
                      className="flex text-lg bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      <Trash2 /> {" "} Delete
                    </button>
                  </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
