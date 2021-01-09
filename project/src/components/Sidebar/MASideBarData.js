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

    {name: 'Schedule', to: '/', icon: '/icons/appointment.svg', 
        subMenuItems: [
            {name: 'Create New Appointment', to: '/'},
            {name: 'Assign Appointment', to: '/'},
            {name: 'Send Reminder', to: '/'}
        ]},

    {name: 'Educational', to: '/ViewHealthArticle', icon: '/icons/healthArticle.svg', 
       subMenuItems: [
            {name: 'Create New Post', to: '/'}
       ]}
 ];
