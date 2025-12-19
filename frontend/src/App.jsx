import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Layout from './components/Layout';
 
import Home from './pages/Home';
import Admission from './pages/Admission';
import AddTeacher from './pages/AddTeacher';
import Fee from './pages/Fee';
import Notice from './pages/Notice';
import Attendance from './pages/Attendance';
import Classes from './pages/Classes';
import Teachers from './pages/Teachers';

 
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/" element={
            <ProtectedRoute>
              <Layout>
                <Home />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/admission" element={
            <ProtectedRoute>
              <Layout>
                <Admission />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/add-teacher" element={
            <ProtectedRoute>
              <Layout>
                <AddTeacher />
              </Layout>
            </ProtectedRoute>
          } />

          { }
          <Route path="/classes" element={
            <ProtectedRoute>
              <Layout>
                <Classes />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/teachers" element={
            <ProtectedRoute>
              <Layout>
                <Teachers />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/fee" element={
            <ProtectedRoute>
              <Layout>
                <Fee />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/notice" element={
            <ProtectedRoute>
              <Layout>
                <Notice />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/attendance" element={
            <ProtectedRoute>
              <Layout>
                <Attendance />
              </Layout>
            </ProtectedRoute>
          } />

        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
