import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProjectForm from './pages/ProjectFormPage';
import ProjectDashboard from './pages/ProjectDashboard';
import ProjectUpdate from './pages/ProjectUpdate';
import MainPage from './pages/MainPage';
import AlertsTable from './pages/AlertsTablePage';
import ServicesPage from './pages/SerivcesPage';
import Projects from './pages/Projects';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BeforeAfterGallery from './pages/BeforeAfterGallery';
import Contectpage from './pages/ContectPage';

function App() {
  return (
    <>
      <div className="w-full mx-auto">
        <Router>
          <Routes>
            {/* Admin routes without Navbar */}
            <Route
              path="/admin/dashboard/project-form"
              element={<ProjectForm />}
            />
            <Route
              path="/admin/dashboard"
              element={<ProjectDashboard />}
            />
            <Route
              path="/admin/dashboard/project-update/:id"
              element={<ProjectUpdate />}
            />
            <Route
              path="/admin/alerts"
              element={<AlertsTable />}
            />

            {/* Public routes with Navbar */}
            <Route
              path="/*"
              element={
                <>
                  <Navbar />
                  <Routes>
                    <Route
                      path="/"
                      element={<MainPage />}
                    />
                    <Route
                      path="/services"
                      element={<ServicesPage />}
                    />
                    <Route
                      path="/contact"
                      element={<Contectpage />}
                    />
                    <Route
                      path="/projects"
                      element={<Projects />}
                    />
                    <Route
                      path="/projects/:id/before-after"
                      element={<BeforeAfterGallery />}
                    />
                  </Routes>
                  <Footer />
                </>
              }
            />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;