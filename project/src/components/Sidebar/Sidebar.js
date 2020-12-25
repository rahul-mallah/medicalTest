import React, {useState, useEffect} from 'react';
import * as s from './Sidebar.styles';

const Sidebar = props => {
    const {
        menuItems = []
    } = props;

    // State
    const [selected, setSelectedMenuItem] = useState(menuItems[0].name);
    const [isSidebarOpen, setSidebarState] = useState(true);

    // Change color for font and border for selected items
    const handleMenuItemClick = name => {
        setSelectedMenuItem(name)
    }

    // menu items
    const menuItemsJSX = menuItems.map((item, index) => {
        const isItemSelected = selected === item.name;

        const hasSubMenu = !!item.subMenuItems.length;

        return(
            <s.MenuItem 
                key = {index}
                selected = {isItemSelected}
                onClick={() => handleMenuItemClick(item.name)}
                isSidebarOpen={isSidebarOpen}
            >
                <s.Icon isSidebarOpen={isSidebarOpen} src={item.icon}/>
                <s.Text isSidebarOpen={isSidebarOpen}>{item.name}</s.Text>
                {hasSubMenu && (
                    <s.DropdownIcon isSidebarOpen={isSidebarOpen}/>
                )}
            </s.MenuItem>
        )
    });



    return ( 
        <s.SidebarContainer isSidebarOpen={isSidebarOpen}> 
            <s.TogglerContainer onClick={() => setSidebarState(!isSidebarOpen)}>
                <s.Toggler />
            </s.TogglerContainer>
            <s.MenuItemContainer>{menuItemsJSX}</s.MenuItemContainer>
        </s.SidebarContainer>
    );

}

export default Sidebar