import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AdminLayout from "./admin/AdminLayout";
import DashboardOverview from "./admin/DashboardOverview";
import ProjectsManagement from "./admin/ProjectsManagement";
import TestimonialsManagement from "./admin/TestimonialsManagement";
import BlogManagement from "./admin/BlogManagement";
import AdminProfile from "./admin/AdminProfile";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        <Route path="/admin" element={
          <AdminLayout>
            <DashboardOverview />
          </AdminLayout>
        } />
        <Route path="/admin/projects" element={
          <AdminLayout>
            <ProjectsManagement />
          </AdminLayout>
        } />
        <Route path="/admin/testimonials" element={
          <AdminLayout>
            <TestimonialsManagement />
          </AdminLayout>
        } />
        <Route path="/admin/blog" element={
          <AdminLayout>
            <BlogManagement />
          </AdminLayout>
        } />
        <Route path="/admin/profile" element={
          <AdminLayout>
            <AdminProfile />
          </AdminLayout>
        } />
      </Routes>
    </Router>
  );
}
