import { Redirect, Route, Switch } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { ErrorMessage, SuccessMessage } from './components/Other/SystemMessags';
import { error_message, success_message, user_state } from "./global-state"
import TopNav from './components/Navbar/TopNav';

import './styles/index.scss'
import './styles/natives.scss'
import './styles/layout.scss'
import './styles/forms.scss'

const NeedToAuthenticateRoute = ({ path, component}) => {
  const user = useRecoilValue(user_state)
  if(!user)
    return <Redirect to='/'/>
  return <Route exact path={path} component={component}/>
}

const LoggedOutRoute = ({path, component}) => {
  const user = useRecoilValue(user_state)
  if(!user)
    return <Route exact path={path} component={component}/>
  return <Redirect to='/js/approvallist'/>
}



function App() {
  const error = useRecoilValue(error_message)
  const success = useRecoilValue(success_message)

  return (
    <div className='main-container'>

      { success && <SuccessMessage text={success} /> }
      { error && <ErrorMessage text={error} /> }

      <TopNav/>

      <div className='content-container'>
      <Switch>
        <LoggedOutRoute exact path={'/login'} component={Login} />
        <LoggedOutRoute exact path={'/register'} component={Register} />
      </Switch>
      </div>
    </div>
  );
}

export default App;
