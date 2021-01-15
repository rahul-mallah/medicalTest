import React from 'react'

export const menuItems = [
    {name: 'Home', to: '/', icon: '/icons/homepage.svg', 
       subMenuItems: []},

    {name: 'My Profile', to: '/myProfile', icon: '/icons/myProfile.svg', 
        subMenuItems: [
            {name: 'Change Password', to: '/changePw'}
        ]},

    {name: 'Medical Profile', to: '/MedicalProfile', icon: '/icons/medicalProfile.svg', 
        subMenuItems: []},

    {name: 'Appointment', to: '/Appointment', icon: '/icons/appointment.svg', 
        subMenuItems: []},

    {name: 'Educational', to: '/ViewHealthArticle', icon: '/icons/healthArticle.svg', 
       subMenuItems: []},

    {name: 'Doctor Profile', to: '/searchDoctor', icon: '/icons/doctor.svg', 
       subMenuItems: []}
 ];
