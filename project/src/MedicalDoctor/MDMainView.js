import React from 'react'
import {Link} from 'react-router-dom';
import NaviBar from "../components/Navbar/NavigationbarSA";
import Sidebar from '../components/Sidebar/Sidebar';
import * as s from './App.styles';
import {menuItems} from '../components/Sidebar/MDSideBarData';

class MDMainView extends React.Component
{
   // display UI
   render()
   {
      return (
         <s.FinalS>
            <NaviBar/>
            <s.AppS>
               <Sidebar
               menuItems={menuItems}
               />
               <s.MainS>
                  <h1> test </h1>
                  <h1> test </h1>
                  <h1> test </h1>
                  <h1> test </h1>
                  <h1> test </h1>
                  <h1> test </h1>
                  <h1> test </h1>
                  <h1> test </h1>
                  <h1> test </h1>
                  <h1> test </h1>
                  <h1> test </h1>
                  <h1> test </h1>
               </s.MainS>
            </s.AppS>
         </s.FinalS>
      ); 
   }
}

export default MDMainView