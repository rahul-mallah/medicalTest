import React from 'react'
import NaviBar from "../components/Navbar/NavigationbarSA";
import Sidebar from '../components/Sidebar/Sidebar';
import * as s from '../App.styles';
import {menuItems} from '../components/Sidebar/MASideBarData';
import MARoute from '../Routes/MARoute.js'

class MedAdm extends React.Component
{
   constructor(props){
      super(props);
      this.state = {
         inputI: 'MedAdm'
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
                  <MARoute />
               </s.MainS>
            </s.AppS>
         </s.FinalS>
      ); 
   }
}

export default MedAdm