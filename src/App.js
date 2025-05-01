
import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import CoursesList from "./pages/CoursesList";
import AddEditCourse from "./pages/AddEditCourse";
import CourseDetails from "./pages/CourseDetails";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <CoursesList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/courses/new"
          element={
            <ProtectedRoute>
              <AddEditCourse />
            </ProtectedRoute>
          }
        />

        <Route
          path="/courses/:id/edit"
          element={
            <ProtectedRoute>
              <AddEditCourse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses/:id"
          element={
            <ProtectedRoute>
              <CourseDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
