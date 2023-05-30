import LoginFormPage from "./components/LoginFormPage";
import { Route, Link, NavLink, Switch, useHistory } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";

function App() {
  // const history = useHistory();
  return (
    <div>
      <Navigation />
      <h1>abnb</h1>
      {/* <NavLink exact activeStyle={{ backgroundColor:"blue" }} to="/">Home</NavLink>
      <br/>
      <NavLink exact activeStyle={{ backgroundColor:"gray" }} to="/login">Login</NavLink>
      <br/>
      <NavLink exact activeStyle={{ backgroundColor:"teal" }} to="/signup">Signup</NavLink>
      <br/> */}

      <Switch>
        <Route exact path="/login">
          <LoginFormPage />
        </Route>
        <Route exact path="/signup">
          <SignupFormPage />
        </Route>
        <Route exact path="/">
          <h2>home</h2>
        </Route>
        {/* <Route>
          <>
            {history.replace("/")}
          </>
        </Route> */}
        <Route>
          <h1>404 - page not found.</h1>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
