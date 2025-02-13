import { Link } from "react-router-dom";

function Nav() {
  // TODO: Add necessary code to display the navigation bar and link between the pages

  return (
    <div className="d-flex">
      <ul className="nav">
        <li className="nav-item list-unstyled">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-item list-unstyled">
          <Link to="/SavedCandidates">Potential Candidates</Link>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
