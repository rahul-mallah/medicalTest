import React from 'react'
import NaviBar from "../components/Navbar/NavigationbarSA";
import Sidebar from '../components/Sidebar/Sidebar';
import * as s from '../App.styles';
import {menuItems} from '../components/Sidebar/MDSideBarData';
import MDRoute from '../Routes/MDRoute.js'

class MedDoc extends React.Component
{
   constructor(props){
      super(props);
      this.state = {
         inputI: 'MedDoc'
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
                  <MDRoute />
               </s.MainS>
            </s.AppS>
         </s.FinalS>
      ); 
   }
}

export default MedDoc