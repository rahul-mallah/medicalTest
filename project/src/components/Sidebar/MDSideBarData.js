import React from 'react'

export const menuItems = [
    {name: 'Home', to: '/', icon: '/icons/homepage.svg', 
       subMenuItems: []},

    {name: 'My Profile', to: '/myProfile', icon: '/icons/myProfile.svg', 
        subMenuItems: [
            {name: 'Change Password', to: '/myProfile'}
        ]},

    {name: 'Patient Profile', to: '/', icon: '/icons/patient.svg', 
        subMenuItems: []},

    {name: 'Schedule', to: '/', icon: '/icons/appointment.svg', 
        subMenuItems: [
            {name: 'Create New Schedule', to: '/'},
            {name: 'Approve Schedule', to: '/'}
        ]},

    {name: 'Educational', to: '/ViewHealthArticle', icon: '/icons/healthArticle.svg', 
       subMenuItems: [
            {name: 'Create New Post', to: '/'}
       ]}
 ];
