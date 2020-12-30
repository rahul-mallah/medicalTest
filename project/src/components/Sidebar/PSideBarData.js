import React from 'react'

export const menuItems = [
    {name: 'Home', to: '/', icon: 'icons/homepage.svg', 
       subMenuItems: []},

    {name: 'My Profile', to: '/myProfile', icon: 'icons/myProfile.svg', 
        subMenuItems: [
            {name: 'Change Password', to: '/myProfile'}
        ]},

    {name: 'Medical Profile', to: '/medicalProfilePatientView', icon: 'icons/medicalProfile.svg', 
        subMenuItems: []},

    {name: 'Appointment', to: '/userAppointment', icon: 'icons/appointment.svg', 
        subMenuItems: [
            {name: 'Make New Appointment', to: '/'}
        ]},

    {name: 'Educational', to: '/ViewHealthArticle', icon: 'icons/healthArticle.svg', 
       subMenuItems: []},

    {name: 'Doctor Profile', to: '/searchDoctor', icon: 'icons/doctor.svg', 
       subMenuItems: []}
 ];
