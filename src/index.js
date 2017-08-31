import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch, withRouter, Link, Redirect } from 'react-router-dom'
import promise from 'redux-promise';
import RegisterUser from './components/register_user'
import LoginUser from './components/login_user'
import AddJob from './components/add_job';
import JobsIndex from './components/jobs_index'
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);


function result() {
    if(localStorage.getItem('userId') !== null){
        return true
    }
    return false
}
const fakeAuth = {
    isAuthenticated: result(),
    signout(cb) {
        this.isAuthenticated = false
        setTimeout(cb, 100)
    }
}

const AuthButton=withRouter(({ history }) => (
    fakeAuth.isAuthenticated ? (
        <p>
            Welcome! <button onClick={() => {
            fakeAuth.signout(() => history.push('/'))
        }}>Sign out</button>
        </p>
    ) : (
        <div><p>You are not logged in.</p>
            <div><Link to="/login">LOGIN</Link></div>
            <div><Link to="/register">REGISTER</Link></div>
        </div>
    )
))

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        fakeAuth.isAuthenticated ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }}/>
        )
    )}/>
);

const PrivateRoute1 = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        fakeAuth.isAuthenticated ? (
            <Redirect to={{
                pathname: '/userdashboard',
                state: { from: props.location }
            }}/>
        ) : (
            <Component {...props}/>
        )
    )}/>
);



ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
      <BrowserRouter>
        <div>
            <Switch>
                <PrivateRoute1 path="/register" component={RegisterUser} />
              <PrivateRoute1 path="/login" component={LoginUser} />
              <PrivateRoute path="/userdashboard" component={JobsIndex} />
              <PrivateRoute path="/addjob" component={AddJob} />
                <Route path="/" component={AuthButton} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  , document.querySelector('#root'));