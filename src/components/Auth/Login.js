import React from 'react'
import useLogin from '../../customHooks/AuthHooks/useLogin'
import { useField } from '../../customHooks/Other/useField'

const Login = () => {
    const email = useField('email')
    const password = useField('password')
    const { mutate: do_login, isLoading, isSuccess} = useLogin()

    const login_form = (e) => {
        e.preventDefault()
        const payload = {
            email: email.value,
            password: password.value
        }
        do_login(payload)
    }

    return (
        <div className='login-form'>
          {/* {isLoading ? 'logging in...' : null} */}
          <p className="menu-header">Login</p>

          <form onSubmit={login_form}>
            <div className="mb-3">

                <label className="form-label">Email address</label>
                <input 
                  onChange={email.onChange}
                  value={email.value}
                  type={email.type} 
                  className="form-control" />
            </div>

            <div className="mb-3">

                <label className="form-label">Password</label>
                <input 
                  className="form-control" 
                  onChange={password.onChange}
                  value={password.value}
                  type={password.type}
                />

            </div>
        
            <button disabled={isLoading} type="submit" className="custom-button">
              {isLoading ? 'Loading...' : 'Login'}
            </button>
          </form>
          <br/>

        </div>
    )
}

export default Login;