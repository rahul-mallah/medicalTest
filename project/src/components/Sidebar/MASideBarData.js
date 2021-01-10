import React from 'react'

export const menuItems = [
    {name: 'Home', to: '/', icon: '/icons/homepage.svg', 
       subMenuItems: []},

    {name: 'My Profile', to: '/myProfile', icon: '/icons/myProfile.svg', 
        subMenuItems: [
            {name: 'Change Password', to: '/changePW'}
        ]},

    {name: 'Patient Profile', to: '/PatientProfile', icon: '/icons/patient.svg', 
        subMenuItems: []},

    {name: 'Schedule', to: '/Schedule', icon: '/icons/appointment.svg', 
        subMenuItems: [
            {name: 'Create New Appointment', to: '/create'},
            {name: 'Assign Appointment', to: '/assign'},
            {name: 'Send Reminder', to: '/sendReminder'}
        ]},

    {name: 'Educational', to: '/ViewHealthArticle', icon: '/icons/healthArticle.svg', 
       subMenuItems: [
            {name: 'Create New Post', to: '/new-article'}
       ]}
 ];
