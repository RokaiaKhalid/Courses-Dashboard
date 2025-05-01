import React, { createContext, useState, useEffect } from "react";

// Create Context
export const CourseContext = createContext();

// Helper to sync with localStorage
const getInitialCourses = () => {
  const stored = localStorage.getItem("courses");
  return stored ? JSON.parse(stored) : [];
};

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState(getInitialCourses);

  // Sync with localStorage on change
  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses));
  }, [courses]);

  // Add new course
  const addCourse = (course) => {
    const newCourse = {
      ...course,
      id: Date.now().toString(),
    };
    setCourses((prev) => [...prev, newCourse]);
  };

  // Update existing course
  const updateCourse = (id, updatedData) => {
    setCourses((prev) =>
      prev.map((course) => (course.id === id ? { ...course, ...updatedData } : course))
    );
  };

  // Delete course
  const deleteCourse = (id) => {
    setCourses((prev) => prev.filter((course) => course.id !== id));
  };

  // Get course by ID
  const getCourseById = (id) => {
    return courses.find((course) => course.id === id);
  };

  return (
    <CourseContext.Provider
      value={{ courses, addCourse, updateCourse, deleteCourse, getCourseById }}
    >
      {children}
    </CourseContext.Provider>
  );
};
