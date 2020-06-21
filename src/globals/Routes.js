import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import AppliedRoute from "./components/AppliedRoute";
import Buyer from "./containers/buyer";
import Company from "./containers/company";
import Vendor from "./containers/vendor";
import Item from "./containers/Item";

class Routes extends React.Component {
  render() {
    return(
    <Switch>
      <AppliedRoute path="/" exact component={Home} props={this.props.childProps} />
      <AppliedRoute path="/login" exact component={Login} props={this.props.childProps} />
      <AppliedRoute path="/company" exact component={Company} props={this.props.childProps} />
      <AppliedRoute path="/buyer" exact component={Buyer} props={this.props.childProps} />
      <AppliedRoute path="/vendor" exact component={Vendor} props={this.props.childProps} />
      <AppliedRoute path="/item" exact component={Item} props={this.props.childProps} />
      { /* Finally, catch all unmatched routes */ }
      <Route component={NotFound} />
    </Switch>
    )
  }
}
export default Routes ;

