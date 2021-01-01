import React, {useState, useEffect} from 'react';
import * as s from './Sidebar.styles';
import {Link} from 'react-router-dom';

const Sidebar = props => {
    const {
        menuItems = [],
        mainI = ""
    } = props;

    // State ------------------------------------------
    const [selected, setSelectedMenuItem] = useState(menuItems[0].name);
    const [isSidebarClose, setSidebarState] = useState(true);
    const [subMenuItemStates, setSubMenus] = useState({});

    // Effects ------------------------------------------
    // Adding index of menu items with submenus to state
    useEffect(() => {
        const newSubmenus = {};

        menuItems.forEach((item, index) => {
            const hasSubMenu = !!item.subMenuItems.length;

            if (hasSubMenu)
            {
                newSubmenus[index] = {};
                newSubmenus[index]['isOpen'] = false;
                newSubmenus[index]['isSelected'] = null;
            }
        })

        setSubMenus(newSubmenus);
    }, [menuItems]);

    // Change color for font and border for selected items
    const handleMenuItemClick = (name, index) => {
        setSelectedMenuItem(name)

        const subMenusCopy = JSON.parse(JSON.stringify(subMenuItemStates));

        if (subMenuItemStates.hasOwnProperty(index))
        {
            subMenusCopy[index]['isOpen'] = !subMenusCopy[index]['isOpen']
            setSubMenus(subMenusCopy)
        }
    }

    const handleSubMenuItemClick = (menuItemIdx, subMenuItemIdx) =>
    {
        const subMenusCopy = JSON.parse(JSON.stringify(subMenuItemStates));
        subMenusCopy[menuItemIdx]['selected'] = subMenuItemIdx;
        setSubMenus(subMenusCopy);
    }

    // menu items ---------------------------------------
    const menuItemsJSX = menuItems.map((item, index) => {
        const isItemSelected = selected === item.name;

        const hasSubMenu = !!item.subMenuItems.length;

        const isOpen = subMenuItemStates[index] ? subMenuItemStates[index].isOpen : null;

        const subMenusJSX = item.subMenuItems.map((subMenuItem, subMenuItemIndex) =>
        {
            const isSubmenuItemSelected = subMenuItemStates[index]?.selected === subMenuItemIndex;
            return(
                <Link to={`/${mainI}${item.to}${subMenuItem.to}`} style={{textDecoration: 'none'}}>
                    <s.SubMenuItemStyle 
                        key={subMenuItemIndex}
                        onClick={() => handleSubMenuItemClick(index, subMenuItemIndex)}
                        selected={isSubmenuItemSelected}
                    >
                        {subMenuItem.name}
                    </s.SubMenuItemStyle>
                </Link>
            )
        });

        return(
            <s.ItemContainer key = {index}>
                <Link to={`/${mainI}${item.to}`} style={{textDecoration: 'none'}}>
                    <s.MenuItem
                        selected = {isItemSelected}
                        onClick={() => handleMenuItemClick(item.name, index)}
                        isSidebarClose={isSidebarClose}
                        isOpen={isOpen}
                    >
                        <s.Icon isSidebarClose={isSidebarClose} src={item.icon}/>
                        <s.Text isSidebarClose={isSidebarClose}>{item.name}</s.Text>
                        {hasSubMenu && (
                            <s.DropdownIcon isSidebarClose={isSidebarClose} isOpen={isOpen}/>
                        )}
                    </s.MenuItem>
                </Link>
                
                {hasSubMenu && isOpen && (
                    <s.SubMenuItemContainer isSidebarClose={isSidebarClose}>{subMenusJSX}</s.SubMenuItemContainer>
                )}
            </s.ItemContainer>
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