import React, {Component} from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';

class ParticipantDetail extends Component{

  constructor(props){
    super(props);
    this.state={
      redirect: null,
      isLoaded: 0,
      participant: null,
    }
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount(){
    const id = this.props.match.params.id;
    fetch("http://localhost:3001/participants/"+ id)
    .then(res => res.json())
    .then( (result) => {
      this.setState({
        isLoaded:1,
        participant:result
      })
    }).catch((error) => {
      this.setState({
        isLoaded:2,
        participant:null
      })
    });
  }

  handleDelete(){
    fetch('http://localhost:3001/participants/'+this.state.participant.id, {method: 'DELETE'});
    alert("Participant was deleted successfully.");
    this.setState({
      redirect: "/participants"
    });
  }

  render(){
    if(this.state.redirect){
      return <Redirect to={this.state.redirect} />
    }
    if(this.state.isLoaded === 0){
      return(
        <h1>Loading Participant details ...</h1>
      );
    }
    else if(this.state.isLoaded === 1){
      let three_digit_id = (id) => {
        var s = "00" + id.toString();
        return s.slice(-3);
      }
      let resume_url="http://localhost:3001/system/participants/resumes/000/000/"+three_digit_id(this.state.participant.id)+"/original/"+this.state.participant.resume_file_name;
      return(
        <>
        <h1> Participant Details </h1>
        <p>
        Name : {this.state.participant.name}<br/>
        Email : {this.state.participant.email}<br/>
        Role : {this.state.participant.role}<br/>
        </p>
        { this.state.participant.role === "Interviewee" &&
          <a href={resume_url} rel="noopener noreferrer" target="_blank">Resume</a>
        }
        <br/><br/>
        <Link to={`/participants/${this.state.participant.id}/edit`}> Edit </Link><br/>
        <span className="delLink" onClick={this.handleDelete}> Delete </span><br/>
        </>
      );
    }
    else{
      return(
        <h1>Unable to load Particpant details due to some error</h1>
      );
    }
  }
}

export default withRouter(ParticipantDetail);
