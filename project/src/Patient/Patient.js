import React from 'react'
import NaviBar from "../components/Navbar/NavigationbarSA";
import Sidebar from '../components/Sidebar/Sidebar';
import * as s from '../App.styles';
import {menuItems} from '../components/Sidebar/PSideBarData';
import PRoute from '../Routes/PRoute.js'

class Patient extends React.Component
{
   constructor(props){
      super(props);
      this.state = {
         inputI: 'Patient'
      }
   }
   // display UI
   render()
   {
      return (
         <s.FinalS>
            <NaviBar/>
            <s.AppS>
               <Sidebar
               menuItems={menuItems}
               mainI={this.state.inputI}
               />
               <s.MainS>
                  <PRoute />
               </s.MainS>
            </s.AppS>
         </s.FinalS>
      ); 
   }
}

export default Patient