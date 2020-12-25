import React from 'react'
import {Form, Button, Card, Container} from 'react-bootstrap'
import {Link} from 'react-router-dom';
import NaviBar from "../components/Navbar/NavigationbarSA";
import Sidebar from "../components/Sidebar/Sidebar";
import * as s from './App.styles';

class CreateAccountUI extends React.Component
{
   // display UI
   render()
   {
      // sidebar items
      const menuItems = [
         {name: 'My Profile', to: '/myProfile', icon: 'icons/myProfile.svg', 
            subMenuItems: [
               {name: 'Change Password', to: '/myProfile'}
            ]},
         {name: 'Manage Account', to: '/viewAllAccount', icon: 'icons/manageAccount.svg', 
            subMenuItems: [
               {name: 'Create New Account', to: '/createAccount'}
            ]}
      ];

      return (
         <div style={{backgroundColor: '#98AFC7'}}>
            <NaviBar/>
            <s.AppS>
               <Sidebar
               menuItems={menuItems}
               />
               <h2>My Profile</h2>
               <h2> test </h2>
            </s.AppS>
         </div>
      );
   }
}

export default CreateAccountUI

