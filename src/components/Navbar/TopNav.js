import React from 'react'
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { user_state } from '../../global-state';

const TopNav = () => {
    const user = useRecoilValue(user_state)

    return (
        <div className='nav-container'>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Navbar</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    

                    {!user
                    ? 
                    <>
                      <li className="nav-item">
                        <Link className="nav-link" to='/login'>Login</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to='/register'>Register</Link>
                      </li>
                    </>
                    :
                    <>
                      <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to='/'>Home</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to='/'>Jobs</Link>
                      </li>
                    </>
                    }
                   
                </ul>
                </div>
            </div>
            </nav>
        </div>
    )
}

export default TopNav;