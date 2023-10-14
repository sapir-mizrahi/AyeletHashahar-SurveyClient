import React from 'react'
import { BrowserRouter as Link } from 'react-router-dom';

function NavBar() {
  // const history = useNavigate();
    // const navigateToPages = (page) => {
    //     history.push(`/${page}`)
    // }
    return (
        <nav>
               {/* <div className="buttons-for-navigat row">
                <div className="btn-nabigate col" onClick={() => navigateToPages('courses')}>Create new course</div>
                <div className="btn-nabigate col" onClick={() => navigateToPages('packages')}>Create new Packade</div>
                <div className="btn-nabigate col" onClick={() => navigateToPages('statistic')}>Statistic</div>
                <div className="btn-nabigate-choosed col" onClick={() => navigateToPages('requests-user')}>Reqests from users</div>
            </div> */}
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/contact">Contact</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
