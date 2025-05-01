import { Link } from "react-router-dom";

import {SquarePen ,Trash2} from "lucide-react"
const CourseCard = ({ course, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden min-w-[250px] max-w-[350px] mx-auto mb-6">
      <Link to={`/courses/${course.id}`} className="block">
        <img
          src={course.image || "https://via.placeholder.com/400x200"}
          alt={course.title}
          className="w-full h-48 object-cover rounded-t-xl"
        />
      </Link>
      <div className="p-4 space-y-2">
        <h3 className="text-xl font-semibold">{course.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>
        <p className="text-sm text-gray-500">
          {course.startDate} - {course.endDate}
        </p>
        <p className="font-bold text-blue-600">${course.price}</p>
        <div className="flex justify-between mt-4">
          <Link
            to={`/courses/${course.id}/edit`}
            className="text-sm bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
          >
            <SquarePen />
          </Link>
          <button
            onClick={() => onDelete(course.id)}
            className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            <Trash2 />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
