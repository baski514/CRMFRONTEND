import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./ui_components/Home"
import Base from "./ui_components/Base";
import Fields from "./ui_components/operations/Fields"
import Objects from "./ui_components/operations/Objects";
import CreateObjects from "./ui_components/operations/CreateObjects"
import CreateFields from "./ui_components/operations/CreateFields";
import Records from "./ui_components/operations/Records"
import RecordDetails from "./ui_components/operations/RecordDetails";
import PrivateRoute from "./PrivateRoutes";
import Signin from "./ui_components/auth/Signin";
import Signup from "./ui_components/auth/Signup";


class Routes extends Component {
    constructor(props) {
        super(props);
        console.log("Routesprops",this.props);
    }
    render(){
        return(
            <BrowserRouter>
                <div className="App h-screen">
                    <Switch>
                        <Route path='/signin' component={Signin} />
                        <Route path="/signup" component={Signup} />

                        <PrivateRoute exact path="/" component={()=><Home selectedTab={this.props.selectedTab} />}>
                                {/* <Home/> */}
                            </PrivateRoute>
                        <PrivateRoute path="/record/:obj_name" component={Records} />
                        <PrivateRoute path="/details/:obj_name/:recordId" component={RecordDetails} />
                        <PrivateRoute path="/setup/layout/LayoutFieldList/:objName" component={Fields} />
                        <PrivateRoute path="/setup/customObjectPage" component={Objects} />
                        <PrivateRoute path="/createObject" component={CreateObjects} />
                        <PrivateRoute path="/createField/:objName" component={CreateFields} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default Routes;