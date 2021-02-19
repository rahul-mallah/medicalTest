import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import * as s from './ViewDoctorSchedule.styles';
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {firestore } from '../firebase';
import moment from 'moment';
import IdleTimerContainer from '../util/IdleTimerContainer';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

function ViewDoctorScheduleUI()
{
   {/* department dropdown list */}
   const options = [
      {"id": 1,
      "value": "Anesthesiology",
      "label": "Anesthesiology"
      },

      {"id": 2,
      "value": "Cardiology", 
      "label": "Cardiology"
      },

      {"id": 3,
      "value": "Dermatology", 
      "label": "Dermatology"
      },

      {"id": 4,
      "value": "Endocrinology", 
      "label": "Endocrinology"
      },

      {"id": 5,
      "value": "Gastroenterology", 
      "label": "Gastroenterology"
      },

      {"id": 6,
      "value": "General Practitioner (Non-specialist)", 
      "label": "General Practitioner (Non-specialist)"
      },

      {"id": 7,
      "value": "Haematology", 
      "label": "Haematology"
      },

      {"id": 8,
      "value": "Immunology", 
      "label": "Immunology"
      },

      {"id": 9,
      "value": "Infectious Diseases", 
      "label": "Infectious Diseases"
      },

      {"id": 10,
      "value": "Neurology", 
      "label": "Neurology"
      },

      {"id": 11,
      "value": "Oncology", 
      "label": "Oncology"
      },

      {"id": 12,
      "value": "Orthopaedic", 
      "label": "Orthopaedic"
      },

      {"id": 13,
      "value": "Psychiatry", 
      "label": "Psychiatry"
      },

      {"id": 14,
      "value": "Rheumatology", 
      "label": "Rheumatology"
      },

      {"id": 15,
      "value": "Urology", 
      "label": "Urology"
      }
   ];

   const currentDate = new Date();

   // State ------------------------------------------
   const [selectedOptions, setSelectedOptions] = useState([]);
   const [startDate, setStartDate] = useState(new Date());
   const [appointments, setAppointments] = useState([]);
   const [doctor, setDoctor] = useState([]);
   let URI = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URI : process.env.REACT_APP_PROD_URI;

   // Effect ---------------------------------------
   useEffect(() => {
      setSelectedOptions([{label: "All", value: "*"}, ...options]);
   }, []);

   // convert 12hr clock to 24hour clock
   const convertTime12to24 = time12h => {
      const [time, modifier] = time12h.split(" ");
     
      let [hours, minutes] = time.split(":");
     
      if (hours === "12") {
        hours = "00";
      }
     
      if (modifier === "PM") {
        hours = parseInt(hours, 10) + 12;
      }
     
      return `${hours}:${minutes}`;
   };

   // Retrieve Data from Firebase
   useEffect(() => {
      //data is fetched on render
      const fetchData = async () => {
         firestore.collection("Appointment")
         .get()
         .then(function(data){
            console.log(data)
            setAppointments(data.docs.map(doc => ({ ...doc.data(), id: doc.id})));
          })
         firestore.collection("Medical Doctors")
         .get()
         .then(function(data){
            console.log(data)
            setDoctor(data.docs.map(doc => ({ ...doc.data(), id: doc.id})));
         })
      };
      fetchData();
   }, []);

   const handleDeptChange = (value) => {
      this.props.onSelectDepartment(value);
   }

   function onChange (value, event) {
      if (event.action === "select-option" && event.option.value === "*") {
          this.setState(this.options);
      }

      else if (event.action === "deselect-option" && event.option.value === "*") {
          this.setState([]);
      }

      else if (event.action === "deselect-option") {
          this.setState(value.filter((o) => o.value !== "*"));
      }

      else if (value.length === this.options.length - 1) {
          this.setState(this.options);
      }

      else {
          this.setState(value);
      } 

   }

   // filter and sort array
   const filterList = [...selectedOptions]
                     .sort((a, b) => a.value > b.value ? 1 : -1)
                     .map((item) => item.value )
                     .filter((item) => item !== "*");

   var appList = [];

   // Get Appointment
   for (var i = 0; i < filterList.length; i++)
   {
      if (i === 0)
      {
         appList = [];
      }

      appList.push(<s.departmentHeader> {filterList[i]} </s.departmentHeader>);

      for (var a = 0; a < doctor.length; a++)
      {
         var temp = filterList[i].toString().concat("\uF7FF");
         if (doctor[a].Department >= filterList[i] && doctor[a].Department <= temp)
         {
            appList.push(<h4> {doctor[a].Name} </h4>)
            var tempAppointment = [...appointments]
                              .filter((item) => item.Date === String(moment(startDate).format('YYYY-MM-DD')))
                              .filter((item) => item.DocEmail === doctor[a].Email)
                              .sort((a, b) => convertTime12to24(a.Timeslot.substring(0, 8)) > convertTime12to24(b.Timeslot.substring(0, 8)) ? 1 : -1)
            
            for (var b = 0; b < tempAppointment.length; b++)
            {
               if (Date.parse(startDate) - Date.parse(currentDate) > 0)
               {
                  appList.push(<s.appCard>
                                 <h5> Patient: {tempAppointment[b].Patient} </h5>
                                 <p> Time Slot: {tempAppointment[b].Timeslot} </p>
                                 <Link to = {{pathname: '/MedAdm/Reschedule/', state:{appointment: tempAppointment[b]}}}>
                                 <s.resButton> Reschedule </s.resButton></Link>
                                 &nbsp; &nbsp; &nbsp; 
                                 <Link to = {{pathname: '/MedAdm/Cancel/', state:{appointment: tempAppointment[b]}}}>
                                 <s.resButton> Cancel </s.resButton></Link>
                              </s.appCard>
                              )
               }

               else if (Date.parse(startDate) == Date.parse(currentDate))
               {
                  appList.push(<s.appCard>
                     <h5> Patient: {tempAppointment[b].Patient} </h5>
                     <p> Time Slot: {tempAppointment[b].Timeslot} </p>
                     <Link to = {{pathname: '/MedAdm/Reschedule/', state:{appointment: tempAppointment[b]}}}>
                     <s.resButton> Reschedule </s.resButton></Link>
                     &nbsp; &nbsp; &nbsp; 

                     <Link to = {{pathname: '/MedAdm/Cancel/', state:{appointment: tempAppointment[b]}}}>
                     <s.resButton> Cancel </s.resButton></Link>
                     &nbsp; &nbsp; &nbsp; 
                     
                     <Link to = {{pathname: '/MedAdm/Create/', state:{appointment: tempAppointment[b]}}}>
                                 <s.resButton> Create Follow Up Appointment </s.resButton></Link>
                  </s.appCard>
                  )
               }

               else 
               {
                  appList.push(<s.appCard>
                     <h5> Patient: {tempAppointment[b].Patient} </h5>
                     <p> Time Slot: {tempAppointment[b].Timeslot} </p>
                     <Link to = {{pathname: '/MedAdm/Create/', state:{appointment: tempAppointment[b]}}}>
                                 <s.resButton> Create Follow Up Appointment </s.resButton></Link>
                  </s.appCard>
                  )
               }
            }
            
            appList.push(<br />)
         }
      }

      appList.push(<hr/>)
   }

   const submitReminderAlert = () => {
      confirmAlert({
        title: 'Congratulations!',
        message: 'Reminder has been sent successfully.',
        buttons: [
          {
            label: 'OK',
          },
        ]
      });
    };


   const sendReminder = async (e) =>
   {
      if (Date.parse(startDate) - Date.parse(currentDate) > 0)
      {
         for (var i = 0; i < filterList.length; i++)
         {
            if (i === 0)
            {
               appList = [];
            }

            for (var a = 0; a < doctor.length; a++)
            {
               var temp = filterList[i].toString().concat("\uF7FF");
               if (doctor[a].Department >= filterList[i] && doctor[a].Department <= temp)
               {
                  var tempAppointment = [...appointments]
                                    .filter((item) => item.Date === String(moment(startDate).format('YYYY-MM-DD')))
                                    .filter((item) => item.DocEmail === doctor[a].Email);
                  
                  for (var b = 0; b < tempAppointment.length; b++)
                  {
                     // Send email to user
                     let details = {
                        date: tempAppointment[b].Date,
                        doctor: tempAppointment[b].Doctor,
                        timeslot: tempAppointment[b].Timeslot,
                        user: tempAppointment[b].Patient,
                        email: tempAppointment[b].PatientEmail,
                        department: doctor[a].Department
                     };
                     let response = await fetch(URI+"/sendReminder", {
                           method: "POST",
                           headers: {
                              "Content-Type": "application/json;charset=utf-8"
                           },
                           body: JSON.stringify(details)
                     });
                     let result = await response.json();
                     console.log(result.status);
                  }
               }
            }
         }
         submitReminderAlert()
      }

      else
      {
         alert("Unable to Send Reminder to Past Appointment");
      }

   } 

   return (
      <div>
         <IdleTimerContainer></IdleTimerContainer>
         {/* department selection*/}
         <div style={{display:'inline-flex'}}>
            <s.headerLabel>Department:</s.headerLabel>
            <ReactMultiSelectCheckboxes 
            options={[{label: "All", value: "*"}, ...options]}
            value={selectedOptions}
            onChange={onChange}
            setState={setSelectedOptions}/>
         </div>
         <br />

         {/* date selection */}
         <div style={{display:'inline-flex'}}>
            <s.headerLabel>Date:</s.headerLabel>
            <DatePicker 
            todayButton="Navigate to Today"
            selected={startDate} 
            onChange={date => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
            cursor= "pointer"
            />
         </div>
         <br/>

         {/* Send Reminder Button */}
         <s.newButton onClick={sendReminder}> Send Reminder </s.newButton>
         &nbsp;&nbsp;&nbsp;&nbsp;

         <br/> <br/>
         <s.docSchedule>
            <h3> Date: {startDate.toLocaleDateString('en-GB', {day: '2-digit', month: 'short', year: 'numeric'}).replace(/ /g, '-')} </h3>
            <br/>
            {/*display doctor schedule*/}
            <div style={{backgroundColor:"#488AC7"}}>
               {appList.map(item => (
                  <s.appDetails>
                  {item}
                  </s.appDetails>
               ))}
            </div>
         </s.docSchedule>
      </div>
   );
}
 

export default ViewDoctorScheduleUI