import LoginFormPage from "./components/LoginFormPage";
import { Route, Link, NavLink, Switch, useHistory } from "react-router-dom";

function App() {
  const history = useHistory();
  return (
    <div>
      <h1>Hello from App</h1>
      <NavLink exact to="/">Home</NavLink>
      <br/>
      <NavLink exact activeStyle={{ backgroundColor:"gray" }} to="/login">Login</NavLink>

      <Switch>
        <Route exact path="/login">
          <LoginFormPage />
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
