import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import CreateRaise from './pages/CreateRaise.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import RaiseDetail from './pages/RaiseDetail.jsx';
import Register from './pages/Register.jsx';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/raises/new"
          element={
            <ProtectedRoute>
              <CreateRaise />
            </ProtectedRoute>
          }
        />
        <Route path="/raises/:id" element={<RaiseDetail />} />
      </Routes>
    </>
  );
}
