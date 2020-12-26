import React, {useState, useEffect} from 'react';
import * as s from './Sidebar.styles';

const Sidebar = props => {
    const {
        menuItems = []
    } = props;

    // State
    const [selected, setSelectedMenuItem] = useState(menuItems[0].name);
    const [isSidebarClose, setSidebarState] = useState(true);

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
                isSidebarClose={isSidebarClose}
            >
                <s.Icon isSidebarClose={isSidebarClose} src={item.icon}/>
                <s.Text isSidebarClose={isSidebarClose}>{item.name}</s.Text>
                {hasSubMenu && (
                    <s.DropdownIcon isSidebarClose={isSidebarClose}/>
                )}
            </s.MenuItem>
        )
    });



    return ( 
        <s.SidebarContainer isSidebarClose={isSidebarClose}> 
            <s.TogglerContainer onClick={() => setSidebarState(!isSidebarClose)}>
                <s.Toggler />
            </s.TogglerContainer>
            <s.MenuItemContainer>{menuItemsJSX}</s.MenuItemContainer>
        </s.SidebarContainer>
    );

}

export default Sidebar