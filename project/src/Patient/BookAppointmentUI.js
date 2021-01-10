import React,{useState} from 'react'
import {Link, withRouter} from 'react-router-dom';
import {menuItems} from '../components/Sidebar/SASideBarData';

class BookAppointmentUI extends React.Component
{
   constructor(props){
      super(props)
      this.state={
         user: {},
         doctor: {},
         isLoaded : false
     }
   }

   componentDidMount(){
      if(typeof this.props.location.state !== 'undefined'){
          if(this.props.location.state.hasOwnProperty('user')){
              this.setState({
                  user: this.props.location.state.user
              }, () => {
                  this.setState({
                      isLoaded: true //Check if our article is loaded
                  })
              })
          }
          if(this.props.location.state.hasOwnProperty('doctor')){
            this.setState({
                doctor: this.props.location.state.doctor
            }, () => {
                this.setState({
                    isLoaded: true //Check if our article is loaded
                })
            })
        }
      }

  }
   // display UI
   render()
   {
      return (
          <div>
         <h1> {this.state.user.FirstName} {this.state.user.LastName} </h1>
         <h1> {this.state.doctor.Name} </h1>
         </div>
      );
   }
}

export default withRouter(BookAppointmentUI)