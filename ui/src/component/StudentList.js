import React, { Component } from 'react';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    
  } from "react-router-dom";
  import { Redirect } from 'react-router';

export default class StudentList extends Component {

    constructor(props){
        super(props);
        this.state={
            user:[]
        }
    }

    componentDidMount(){
            axios.get('http://localhost:4000/employee').then((data)=>{
                console.log(data.data);
                this.setState({user:data.data});
            })
    }
   editData=(id)=>{
        console.log(id);
        localStorage.setItem('id',id);
        window.location.href='/';
   }
   deleteData=(id)=>{
    console.log(id);
    axios.delete('http://localhost:4000/employee/'+id).then((data)=>{
        console.log(data.data);
        axios.get('http://localhost:4000/employee').then((data)=>{
        console.log(data.data);
        this.setState({user:data.data});
    })
        
    });
    
    
   }
    render(){
        if(this.state.user.length <= 0){
            return(
                <div className="container">
                <div className="col-sm-2">
                  </div>
                  <div className="col-sm-10">
                          <h2>Student List </h2>
                          <div>No Students Enrolled</div>
                  </div>
                  
                </div>
            )
           
            
        }else{
        return (<React.Fragment>
            <div className="container">
            <div className="col-sm-2">
              </div>
              <div className="col-sm-10">
                      <h2>Student List </h2>
              </div>
              
            </div>
            <div className="container">
                  <div className="row">
                      <div className="col-sm-12">
                              <div className="col-sm-3">
      
                              </div>
                              <div className="col-sm-6">
                                 
                                 <hr/>
                  <table className="table table-striped table-hover">
                      <thead>
                      <tr>
                      <th key='fname'>FNAME</th>
                      <th key='lname'>LNAME</th>
                      <th key='project'>PROJECT</th>
                      <th key='skills'>SKILLS</th>
                      <th key='modify'>MODIFY</th>
                      <th key='remove'>Remove</th>
                      </tr>
                      </thead>  
                      <tbody>
                      {
                          this.state.user.map((row)=>{
                          return <React.Fragment>
                              <tr>
                    
                              <td>{row.fname}</td>
                              <td>{row.lname}</td>
                              <td>{row.project}</td>
                              <td>{row.skills}</td>
                              <td><button key={row.id} onClick={this.editData.bind(this,row.id)}>Edit</button></td>
                              <td><button key={row.id} onClick={this.deleteData.bind(this,row.id)}>Delete</button></td>
                              
                              </tr>
                          </React.Fragment>
                          })
                      }    
                      </tbody>  
                  </table>
                  
                  <div><h1>Populated Student List</h1></div>
                              </div>
                              <div className="col-sm-3">
      
                              </div>
                      </div>
                  </div>
            </div>
            </React.Fragment>
          );
    }
}
  }