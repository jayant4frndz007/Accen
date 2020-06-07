import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Enrollment from './Enrollment';
import StudentList from './StudentList';



export default class Header extends Component {
    constructor(props){
        super(props);
        this.state={

        }
       
    }
    render(){

    
  return (
    <Router>
      <div>
      <nav className="navbar navbar-inverse navbar-fixed-top">
            <div className="container-fluid">
                <div className="navbar-header">
                <Link className="navbar-brand" href="#">AT&T Training</Link>
                </div>
                <ul className="nav navbar-nav">
                <li className="active"><Link to="/">Enrollment</Link></li>
                <li><Link to="/sudentList">Student List</Link></li>
                </ul>
            </div>
            </nav>
        <hr />
        <Switch>
        <Route exact path="/sudentList">
            <StudentList />
          </Route>
          <Route exact path="/">
               <Enrollment />
          </Route>
          
          
        </Switch>
      </div>
    </Router>
  );
}

}




