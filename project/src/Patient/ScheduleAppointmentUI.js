import React,{useState} from 'react'
import moment from 'moment';
import ReactTimeslotCalendar from 'react-timeslot-calendar';
import { auth, firestore } from '../firebase';

function ScheduleAppointmentUI() {

    const [appointments, setAppointments] = useState([]);
    const [timeslot, setTimeSlot] = useState(new Date()); 

    React.useEffect(()=>{
        const fetchData = async () =>{
           firestore.collection("Appointment")
           .get()
           .then(function(data){
              console.log(data)
              setAppointments(data.docs.map(doc => ({ ...doc.data(), id: doc.id})));
           }); 
        };
        fetchData();
     }, [])

     let disabledTimeSlots = appointments.map(app => {
        return {startDate : moment(app.Time.toDate()).format('MMMM Do YYYY, h:mm:ss A'),
                format: 'MMMM Do YYYY, h:mm:ss A'}
     })

     let onSelectTimeslot = (allTimeslots, lastSelectedTimeslot) => {
        /**
         * All timeslot objects include `startDate` and `endDate`.
       
         * It is important to note that if timelots provided contain a single
         * value (e.g: timeslots = [['8'], ['9', '10']) then only `startDate` is filled up with
         * the desired information.
         */
        console.log(lastSelectedTimeslot.startDate); // MomentJS object.
       
      }
      let times = ["08:00 AM - 09:00 AM",
      "09:00 AM - 10:00 PM",
      "10:00 AM - 11:00 PM",
      "10:00 AM - 11:00 PM",
      "10:00 AM - 11:00 PM",
      "10:00 AM - 11:00 PM",
      "10:00 AM - 11:00 PM",
      "10:00 AM - 11:00 PM",
      "10:00 AM - 11:00 PM",
      "10:00 AM - 11:00 PM",
      "10:00 AM - 11:00 PM"
    ]

    let timeslots = [
        ['8', '9'], // 1:00 AM - 2:00 AM
        ['9', '10'], // 2:00 AM - 3:00 AM
        ['10', '11'], // 4:00 AM - 6:00 AM
        ['11', '12'],
        ['13', '14'],
        ['14', '15'],
        ['15', '16'],
        ['16', '17'],
        ['17', '18'],
        ['19', '20']
    ];
    return (
        <div>
            <div >
            {appointments.map(app => <ul><li>{moment(app.Time.toDate()).format('MMMM Do YYYY, h:mm:ss A')}</li></ul>)}
            <ReactTimeslotCalendar
                initialDate={moment().format()}
                onChange ={date => {setTimeSlot({date})}}
                timeslots={timeslots}
                disabledTimeslots = {disabledTimeSlots}
                onSelectTimeslot = {onSelectTimeslot(timeslots, timeslot)}
            />
            </div>
            <p>{timeslot.toString()}</p>

           
            {times.map(time => <div> <input type="radio" value={time} name={time} /> <label>{time}</label></div>)}
        </div>
    )
}

export default ScheduleAppointmentUI
