import React from 'react'
import {Form, Button, Card, Container} from 'react-bootstrap'
import {Link} from 'react-router-dom';
import NaviBar from "../components/Navbar/NavigationbarSA";
import Sidebar from '../components/Sidebar/Sidebar';
import * as s from './App.styles';
import {menuItems} from '../components/Sidebar/SASideBarData';

class ViewAllAccountUI extends React.Component
{
   // state
   //const [isSideBarOpen, setSidebarState] = useState(menuItems[0].name);

   // display UI
   render()
   {
      return (
         <div style={{backgroundColor: '#98AFC7'}}>
            <NaviBar/>
            <s.AppS>
               <Sidebar
               menuItems={menuItems}
               />
               <s.MainS>
                  <h2>My Profile</h2>

                  <h2>test</h2>
               </s.MainS>
            </s.AppS>
         </div>
      );
   }
}

export default ViewAllAccountUI