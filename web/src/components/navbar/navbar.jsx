/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/auth-context";
import { useState } from "react";
import "./navbar.css";

function Navbar() {
  const { user, logout } = useAuthContext();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const toggleNavbar = () => setIsNavCollapsed(!isNavCollapsed);
  const closeNavbar = () => setIsNavCollapsed(true);

  return (
    <nav className="navbar fixed-top transparent-navbar collapsed">
      <div className="container navbar-container">
        <div className="nav-left">
          <Link className="nav-link" to="/novedades" onClick={closeNavbar}>
            Novedades
          </Link>
          <Link className="nav-link" to="/categorias" onClick={closeNavbar}>
            Categorías
          </Link>
          <Link className="nav-link" to="/autores" onClick={closeNavbar}>
            Autores
          </Link>
        </div>
        <div className="nav-center">
          <Link className="navbar-brand" to="/">
            <img
              className="logo"
              src="./ptatapad.png"
              alt="PtataPad Logo"
            />
          </Link>
        </div>
        <div className="nav-right">
        <i className="fa-solid fa-magnifying-glass"></i>
          {user ? (
            <>
              <Link className="nav-link fa-solid fa-user" to="/profile" onClick={closeNavbar}>
                {user.email}
              </Link>
              <button
                className="btn login-btn"
                onClick={() => {
                  logout();
                  closeNavbar();
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link className="btn login-btn" to="/login" onClick={closeNavbar}>
              Iniciar sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
