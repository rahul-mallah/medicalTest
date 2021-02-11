import React from 'react'

export const menuItems = [
   {name: 'Home', to: '/', icon: '/icons/homepage.svg', 
       subMenuItems: []},
       
   {name: 'My Profiles', to: '/myProfile', icon: '/icons/myProfile.svg', 
      subMenuItems: [
         {name: 'Change Password', to: '/changePW'}
      ]},

   {name: 'Manage Account', to: '/viewAllAccount', icon: '/icons/manageAccount.svg', 
      subMenuItems: [
         {name: 'Create New Account', to: '/createAccount'}
      ]},

   {name: 'Educational', to: '/ViewHealthArticle', icon: '/icons/healthArticle.svg', 
      subMenuItems: []}
];
