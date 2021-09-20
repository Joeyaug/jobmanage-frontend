import React from 'react'
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { user_state } from '../../global-state';

const TopNav = () => {
    const [user, set_user] = useRecoilState(user_state)

    const handle_logout = () => {
      set_user(null);
      window.localStorage.clear('token');
    }

    return (
       <div className='nav-container'>
       <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Navbar</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">

            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {user &&
                <>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/jobs">Jobs</Link>
                </li>
                </>
              }
            </ul>

            <div className="d-flex">
              <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                {user
                ?
                <li className="nav-item" type="submit">
                  <span onClick={handle_logout} className="nav-link">Logout</span>
                </li>
                :
                <>
                <li className="nav-item" type="submit">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item" type="submit">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>`
                </>
                }
              </ul>
            </div>
            
          </div>
        </div>
      </nav>
      </div>
    )
}

export default TopNav;