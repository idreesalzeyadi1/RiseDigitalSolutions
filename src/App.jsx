import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicLayout from "./components/layout/PublicLayout";

// Public pages
import Home from "./pages/public/Home";
import Services from "./pages/public/Services";
import ServiceDetail from "./pages/public/ServiceDetail";
import Academy from "./pages/public/Academy";
import CourseDetail from "./pages/public/CourseDetail";
import Internships from "./pages/public/Internships";
import InternshipApply from "./pages/public/InternshipApply";
import About from "./pages/public/About";
import Contact from "./pages/public/Contact";
import Login from "./pages/public/Login";
import Signup from "./pages/public/Signup";
import LegalPage from "./pages/public/LegalPage";

// Student
import StudentDashboard from "./pages/student/StudentDashboard";

// Intern
import InternDashboard from "./pages/intern/InternDashboard";
import InternTasks from "./pages/intern/InternTasks";
import InternCertificate from "./pages/intern/InternCertificate";

// Admin
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ServiceRequests from "./pages/admin/ServiceRequests";
import ManageCourses from "./pages/admin/ManageCourses";
import Enrollments from "./pages/admin/Enrollments";
import InternshipApplications from "./pages/admin/InternshipApplications";
import ManageInterns from "./pages/admin/ManageInterns";
import Certificates from "./pages/admin/Certificates";
import Testimonials from "./pages/admin/Testimonials";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public site */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/academy" element={<Academy />} />
            <Route path="/academy/:courseId" element={<CourseDetail />} />
            <Route path="/internships" element={<Internships />} />
            <Route path="/internships/apply" element={<InternshipApply />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/terms" element={<LegalPage title="Terms of Use" />} />
            <Route path="/privacy" element={<LegalPage title="Privacy Policy" />} />

            {/* Student portal (signup required, lives under public layout-less dashboard) */}
            <Route
              path="/student/dashboard"
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Intern portal */}
          <Route
            path="/intern/dashboard"
            element={
              <ProtectedRoute allowedRoles={["intern"]}>
                <InternDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/intern/tasks"
            element={
              <ProtectedRoute allowedRoles={["intern"]}>
                <InternTasks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/intern/certificate"
            element={
              <ProtectedRoute allowedRoles={["intern"]}>
                <InternCertificate />
              </ProtectedRoute>
            }
          />

          {/* Admin portal */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/service-requests"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ServiceRequests />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/courses"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ManageCourses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/enrollments"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Enrollments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/internship-applications"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <InternshipApplications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/interns"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ManageInterns />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/certificates"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Certificates />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/testimonials"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Testimonials />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
