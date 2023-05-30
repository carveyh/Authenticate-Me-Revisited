import LoginFormPage from "./components/LoginFormPage";
import { Route, Link, NavLink, Switch, useHistory } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";

function App() {
  // const history = useHistory();
  return (
    <div>
      <h1>abnb</h1>
      <NavLink exact activeStyle={{ backgroundColor:"blue" }} to="/">Home</NavLink>
      <br/>
      <NavLink exact activeStyle={{ backgroundColor:"gray" }} to="/login">Login</NavLink>
      <br/>
      <NavLink exact activeStyle={{ backgroundColor:"teal" }} to="/signup">Signup</NavLink>
      <br/>

      <Switch>
        <Route exact path="/login">
          <LoginFormPage />
        </Route>
        <Route exact path="/signup">
          <SignupFormPage />
        </Route>
        <Route exact path="/">

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
