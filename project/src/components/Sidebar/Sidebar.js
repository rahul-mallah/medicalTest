import React, {useState, useEffect, useLayoutEffect} from 'react';
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
    // Set selected menu item based on URL pathname
    useLayoutEffect(() => {
        const path = window.location.pathname;
        const parts = path.split('/');
    
        if (parts[2] !== '') {
            var a = "/" + parts[2];
            var currentSelected = menuItems.findIndex(obj => obj.to === a);
            const selectedItem = menuItems[currentSelected]?.name;
            setSelectedMenuItem(selectedItem)
        }
      }, [menuItems])

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

        // set selected submenu based on URL
        const path = window.location.pathname;
        const parts = path.split('/');

        if (parts.length === 4)
        {
            var a = "/" + parts[2];
            var b = "/" + parts[3];
            var currentSelected = menuItems.findIndex(obj => obj.to === a);
            var currentSubSelected = menuItems[currentSelected]?.subMenuItems.findIndex(subItem => subItem.to === b);

            if (currentSelected !== -1) newSubmenus[currentSelected]['isOpen'] = true;
            if (currentSelected !== -1 && currentSubSelected !== -1) newSubmenus[currentSelected]['selected'] = currentSubSelected;
        }

        Object.keys(subMenuItemStates).length === 0 && setSubMenus(newSubmenus);
    }, [menuItems, subMenuItemStates]);

    // Change color for font and border for selected items
    const handleMenuItemClick = (name, index) => {
        setSelectedMenuItem(name)

        const subMenusCopy = JSON.parse(JSON.stringify(subMenuItemStates));

        for (let item in subMenuItemStates)
            {
                subMenusCopy[item]['isOpen'] = false;
                subMenusCopy[item]['selected'] = null;
            }

        if (subMenuItemStates.hasOwnProperty(index))
        {
            subMenusCopy[index]['isOpen'] = !subMenusCopy[index]['isOpen']
        }

        setSubMenus(subMenusCopy);
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
                <Link to={`/${mainI}${item.to}${subMenuItem.to}`} style={{textDecoration: 'none'}} key={subMenuItemIndex}>
                    <s.SubMenuItemStyle 
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