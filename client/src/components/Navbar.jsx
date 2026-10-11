import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav>
      <Link to="/" className="brand">
        Raiseboard
      </Link>
      <Link to="/">Home</Link>
      {user && <Link to="/raises/new">Create raise</Link>}
      {user ? (
        <>
          <span className="muted">Hi, {user.name}</span>
          <button type="button" className="secondary" onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}
