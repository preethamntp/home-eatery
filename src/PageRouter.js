import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/Login";

function PageRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/home" component={Home} exact />
        <Route path="/signin" component={SignIn} exact />
      </Switch>
    </Router>
  );
}

export default PageRouter;
