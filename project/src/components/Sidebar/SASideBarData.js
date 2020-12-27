import React from 'react'

export const menuItems = [
    {name: 'My Profile', to: '/myProfile', icon: 'icons/myProfile.svg', 
       subMenuItems: [
          {name: 'Change Password', to: '/myProfile'}
       ]},

    {name: 'Manage Account', to: '/viewAllAccount', icon: 'icons/manageAccount.svg', 
       subMenuItems: [
          {name: 'Create New Account', to: '/createAccount'}
       ]}
 ];
