import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import DimensionsForm from './DimensionsForm';
import LoginForm from './LoginForm';
import AdminLoginForm from "./AdminLoginForm";
import RegisterForm from "./RegisterForm";
import About from "./About";
import Logout from "./Logout";
import Navbar from "./Navbar";



function App() {

  return (
      <div className="App">
          <BrowserRouter>
              <Navbar />
              <Switch>
                  <Route exact path="/">
                      <DimensionsForm />
                  </Route>
                  <Route exact path="/loginform">
                      <LoginForm />
                  </Route>
                  <Route exact path="/adminloginform">
                      <AdminLoginForm />
                  </Route>
                  <Route exact path="/registerform">
                      <RegisterForm />
                  </Route>
                  <Route exact path="/about">
                      <About />
                  </Route>
                  <Route exact path="/logout">
                      <Logout />
                  </Route>
                  <Redirect to="/" />
              </Switch>
          </BrowserRouter>
      </div>
  );
}

export default App;
