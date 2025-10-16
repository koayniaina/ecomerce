import { Link } from "react-router-dom";
import '../assets/css/Navbar.css'
export default function Navbar() {
  return (
    <header>
      <nav className="nav-bar">
        <div className="logo">
          <h2>
            <span>iTech</span>Store
          </h2>
        </div>
        <div className="search">
            <span className="material-symbols-outlined">search</span>
            <input type="search" placeholder="Search for products" />
        </div>

        <div className="icons">
          <Link to="/login">
            <span className="material-symbols-outlined">login</span>
          </Link>
          <Link to="/product/cart" aria-label="Cart">
            <span className="material-symbols-outlined">shopping_bag</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
