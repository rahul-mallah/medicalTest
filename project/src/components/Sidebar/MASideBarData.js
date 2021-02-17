import React from 'react'

export const menuItems = [
    {name: 'Home', to: '/', icon: '/icons/homepage.svg', 
       subMenuItems: []},

    {name: 'My Profile', to: '/myProfile', icon: '/icons/myProfile.svg', 
        subMenuItems: [
            {name: 'Change Password', to: '/changePW'}
        ]},

    {name: 'Schedule', to: '/Schedule', icon: '/icons/appointment.svg', 
        subMenuItems:[]},

    {name: 'Educational', to: '/ViewHealthArticle', icon: '/icons/healthArticle.svg', 
       subMenuItems: [
            {name: 'Create New Post', to: '/new-article'}
       ]}
 ];
