import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import ProjectDetail from './pages/ProjectDetail';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route 
                path="/*" 
                element={
                  <ProtectedRoute>
                    <Navbar />
                    <main style={{ padding: '2rem' }}>
                      <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/project/:id" element={<ProjectDetail />} />
                        <Route path="/" element={<Navigate to="/dashboard" />} />
                      </Routes>
                    </main>
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}


export default App;
