import React, { Component } from 'react';
import axios from 'axios';

export default class  Enrollment extends Component {
  constructor(props){
    super(props);
    this.state={
      fname:undefined,
      lname:undefined,
      project:undefined,
      skills:[],
      result:undefined,
      fullData:undefined,
      resutl:undefined

    }
    console.log('data is coming',localStorage.getItem('id'));
  }
 name=(val,e)=>{
    if(val === 'FNAME'){
      this.setState({fname:e.target.value})
    }
    if(val === 'LNAME'){
      this.setState({lname:e.target.value})
    }
 }
 submit=async()=>{
   console.log(this.state.fname,this.state.lname,this.state.skills.length,this.state.result,this.state.project);
   if(this.state.fname == undefined || this.state.lname== undefined ||  this.state.skills.length ==0 || this.state.result== undefined || this.state.project == undefined ){
     alert('Please fill all field');
     return;
   }
   
   console.log(localStorage.getItem("id"))
   if(localStorage.getItem("id") != undefined){
    const res= await axios.put('http://localhost:4000/employee/'+localStorage.getItem("id"),{

      "fname": this.state.fname,
      "lname": this.state.lname,
      "project": this.state.project,
      "skills": this.state.skills.join(','),
      "result": this.state.result

    }).then((res)=>{
      localStorage.removeItem("id");
    console.log(res);
});

this.setState({resutl:'Data Succesfully Updated'});
   }else{
    const res= await axios.post('http://localhost:4000/employee/',{

      "fname": this.state.fname,
      "lname": this.state.lname,
      "project": this.state.project,
      "skills": this.state.skills.join(','),
      "result": this.state.result

    }).then((res)=>{
 
    console.log(res);
});

this.setState({resutl:'Data Succesfully Submitted'});
   }
  
 }
 change=(e)=>{
  console.log(e.target.value);
  this.setState({project:e.target.value});
 }
 skilsSelect=(id)=>{
      console.log(document.getElementById(id+'').checked);
      let newArr=this.state.skills;
      if(document.getElementById(id+'').checked){
          newArr.push(id);
          console.log(newArr);
          this.setState({skills:newArr}) ;
      }else{
        console.log(newArr.length)
       this.setState({skills:this.remove(id,newArr)}) ;
      }
 }
 remove=(id,newArr)=>{
   let arr=[];
   for(let i=0;i<newArr.length;i++){
     if(newArr[i] != id){
          arr.push(newArr[i]);
     }
   }
  console.log(arr);
   return arr;
 }

 radioChange=(val)=>{
  console.log(val);
  this.setState({result:val});
 }

 componentDidMount(){
   console.log('component did mount');
   if(localStorage.getItem('id')){
    axios.get('http://localhost:4000/employee/'+localStorage.getItem('id')).then((data)=>{
      console.log('afeter id',data.data.fname);
      this.setState({fname:data.data.fname,
        lname:data.data.lname,
        project:data.data.project,
        skills:[],
        result:undefined
      
      });
     
      /*fname:undefined,
      lname:undefined,
      project:undefined,
      skills:[],
      result:undefined,*/
    })
   }
   
 }
  render(){
    return (
      <React.Fragment>
      <div className="container">
      <div className="col-sm-2">
        </div>
        <div className="col-sm-10">
                <h1>Enrollment Form </h1>
        </div>
        
      </div>
      <div className="container">
            <div className="row">
                <div className="col-sm-12">
                        <div className="col-sm-3">

                        </div>
                        <div className="col-sm-9" >
                        
                               <div className="form-horizontal" >
                                  <div className="form-group">
                                    <label className="control-label col-sm-2" for="email"><sup>*</sup>First Name:</label>
                                        <div className="col-sm-6">
                                          <input type="text" className="form-control" id="fname" value={this.state.fname} onChange={this.name.bind(this,'FNAME')} placeholder="Enter First name" name="fname"/>
                                        </div>
                                  </div>
                                  <div className="form-group">
                                    <label className="control-label col-sm-2" for="pwd"><sup>*</sup>Last Name:</label>
                                          <div className="col-sm-6">          
                                            <input type="text" className="form-control" id="lname" value={this.state.lname} onChange={this.name.bind(this,'LNAME')} placeholder="Enter Last Name" name="lname"/>
                                          </div>
                                  </div>
                                  <div className="form-group">
                                    <label className="control-label col-sm-2" for="pwd"><sup>*</sup>Project Name:</label>
                                          <div className="col-sm-6">          
                                            <select onChange={this.change} value={this.state.project} style={{backgroundColor:'lightblue',width:'150px',height:'30px', borderRadius:'5px'}}>
                                            <option  >Select the Project</option>
                                              <option value="ABC">ABC</option>
                                              <option value="BCD">BCD</option>
                                              <option value="XYZ">XYZ</option>
                                            </select>
                                          </div>
                                  </div>
                                  <div className="form-group">
                                    <label className="control-label col-sm-2" for="pwd">Skills:</label>
                                          <div className="col-sm-6" style={{display:'flex',flexWrap: 'wrap'}}>          
                                          <div className="checkbox" style={{marginRight:'20px'}}>
                                            <label><input type="checkbox" id="React"  onClick={this.skilsSelect.bind(this,'React')}/> Reactjs</label>
                                          </div>
                                          <div className="checkbox" style={{marginRight:'20px'}}>
                                            <label><input type="checkbox" id="Node" onClick={this.skilsSelect.bind(this,'Node')}/> NodeJS</label>
                                          </div>
                                          <div className="checkbox" style={{marginRight:'20px'}}>
                                            <label><input type="checkbox" id="Mongo" onClick={this.skilsSelect.bind(this,'Mongo')}/> MongoDB</label>
                                          </div>
                                          <div className="checkbox" style={{marginRight:'20px'}}>
                                            <label><input type="checkbox" id="Javascript" onClick={this.skilsSelect.bind(this,'Javascript')}/> JavaScript</label>
                                          </div>
                                          </div>
                                  </div>
                                  <div className="form-group" >
                                    <label className="control-label col-sm-2" for="pwd">Result:</label>
                                          <div className="col-sm-6" style={{display:'flex',flexWrap: 'wrap'}}>          
                                          <div className="radio">
                                            <label><input type="radio" name="result" onChange={this.radioChange.bind(this,'Pass')}/> Pass</label>
                                         </div>
                                         &nbsp;
                                        <div className="radio">
                                          <label><input type="radio" name="result" onChange={this.radioChange.bind(this,'Fail')}/> fail</label>
                                        </div>
                                          </div>
                                  </div>
                                 
                                  <div className="form-group" style={{display:'flex'}}>        
                                    <div className=" col-sm-offset-2 col-sm-2">
                                      <button type="submit" className="btn btn-default" onClick={this.submit}>Submit</button>
                                    </div>
                                    <div className=" col-sm-2">
                                      <button type="button" className="btn btn-default">Cancel</button>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  {this.state.resutl}
                                </div>
                              </div>
                       
                        <div className="col-sm-1">

                        </div>
                </div>
            </div>
      </div>
      <div className="container">
         <div className="row">
           <div className="col-sm-12">
           <div className="col-sm-4"></div>
                <div className="col-sm-4" ><h1 style={{borderBottom:'5px solid lightblue',color:'lightblue'}}>Enrollment Screen</h1></div>
           </div>
         </div>
      </div>
      </React.Fragment>
    );
  }
}