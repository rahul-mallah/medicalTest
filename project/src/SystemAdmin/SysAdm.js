import React from 'react'
import NaviBar from "../components/Navbar/NavigationbarSA";
import Sidebar from '../components/Sidebar/Sidebar';
import * as s from '../App.styles';
import {menuItems} from '../components/Sidebar/SASideBarData';
import SARoute from '../Routes/SARoute'

class SysAdm extends React.Component
{
   constructor(props){
      super(props);
      this.state = {
         inputI: 'SysAdm'
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
                  <SARoute />
               </s.MainS>
            </s.AppS>
         </s.FinalS>
      ); 
   }
}

export default SysAdm