import React, {Component} from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';

class InterviewDetail extends Component{

  constructor(props){
    super(props);
    this.state={
      redirect: null,
      isLoaded: 0,
      interview: null,
    }
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount(){
    const id = this.props.match.params.id;
    fetch("http://localhost:3001/interviews/"+ id)
    .then(res => res.json())
    .then( (result) => {
      this.setState({
        isLoaded:1,
        interview:result
      })
    }).catch((error) => {
      this.setState({
        isLoaded:2,
        interview:null
      })
    });
  }

  handleDelete(){
    fetch('http://localhost:3001/interviews/'+this.state.interview.id, {method: 'DELETE'});
    alert("Interview was deleted successfully.");
    this.setState({
      redirect: "/"
    });
  }

  render(){
    if(this.state.redirect){
      return <Redirect to={this.state.redirect} />
    }
    if(this.state.isLoaded === 0){
      return(
        <h1>Loading Interview details ...</h1>
      );
    }
    else if(this.state.isLoaded === 1){
      return(
        <>
        <h1> Interview Details </h1>
        <p>
        Interviewer : {this.state.interview.interviewer.name}<br/>
        Interviewee : {this.state.interview.interviewee.name}<br/>
        Start Time : {this.state.interview.start_time}<br/>
        End Time : {this.state.interview.end_time}<br/>
        </p><br/><br/>
        <Link to={`/interviews/${this.state.interview.id}/edit`}> Edit </Link><br/>
        <span className="delLink" onClick={this.handleDelete}> Delete </span><br/>
        </>
      );
    }
    else{
      return(
        <h1>Unable to load Interview Details due to some error</h1>
      );
    }
  }
}

export default withRouter(InterviewDetail);
