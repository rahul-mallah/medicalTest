import React, {useState, useEffect} from 'react';
import * as s from './Sidebar.styles';

const Sidebar = props => {
    const {
        menuItems = []
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

    // menu items ---------------------------------------
    const menuItemsJSX = menuItems.map((item, index) => {
        const isItemSelected = selected === item.name;

        const hasSubMenu = !!item.subMenuItems.length;

        const isOpen = subMenuItemStates[index] ? subMenuItemStates[index].isOpen : null;

        const subMenusJSX = item.subMenuItems.map((subMenuItem, subMenuItemIndex) =>
        {
            return(
                <s.SubMenuItemStyle key={subMenuItemIndex}>{subMenuItem.name}</s.SubMenuItemStyle>
            )
        });

        return(
            <s.ItemContainer key = {index}>
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
                
                {hasSubMenu && isOpen && (
                    <s.SubMenuItemContainer isSidebarClose={isSidebarClose}>{subMenusJSX}</s.SubMenuItemContainer>
                )}

            </s.ItemContainer>
        )
    });

    console.log(subMenuItemStates);

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