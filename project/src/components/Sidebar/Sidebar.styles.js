import styled from 'styled-components';

export const SidebarContainer = styled.div`
    width: ${p => p.isSidebarClose ? '5%' : '15%'};
    min-width: 50px;
    color: #98AFC7;
    background-image: linear-gradient(
        75deg, /* Set gradient level */
        #566D7E 40%, 
        #2B3856 60%);
    position: relative;
    transition: .2s ease-in all;
`;

export const MenuItemContainer = styled.div`
    position: absolute;
    top: 80px;
    left: 0;
    right: 0;
    margin: 0 auto; \* top&bottom left&right*/
`;

export const ItemContainer = styled.div``;

// Menu Item --------------------------------------------
export const MenuItem = styled.div`
    ${p => p.isSidebarClose && `
        text-align: center;
        ${p.selected && 'background-color: rgba(0,0,0,0.6)'};
    `};

    cursor: pointer;
    padding: 6px 10px;  /* vertical horizontal */  
    font-weight: 600;
    color: ${p => p.selected ? '#E3E4FA' : '#98AFC7'};
    //white-space: nowrap;
    position: relative;
    transition: .2s ease-in all;

    &:hover{
        color: #E5E4E2;
        transition: .1s ease-in all;
    }

    &:after{
        content: '';

        // create border
        border: 1px solid ${p => p.selected ? '#E3E4FA' : '#463E3F'};
        display: ${p => !p.isSidebarClose && p.isOpen ? 'none' : 'block'};
        margin: 8px 0 4px; /* top&bottom right left */
        transition: .2s ease-in all;
    }

    ${p => !p.selected &&`
        &:hover{
            &:after{
                border: 1px solid #646D7E;
                transition: .1s ease-in all;
            }
        }
    `}
`;

export const Text = styled.p`
    display: ${p => p.isSidebarClose ? 'none' : 'inline'};
`;

export const Icon = styled.img`
    ${p => !p.isSidebarClose && `
        padding-right: 15px;
        transition: .2s ease-in padding;
    `};
    height: 32px;
    width: 32px;
`;

// Sub Menu Items ---------------------------------------
export const SubMenuItemContainer = styled.div`
    font-size: 14px;
    padding-left: 30px;
    ${p => p.isSidebarClose && 'display: none'};
`;

export const SubMenuItemStyle = styled.p`
    color: ${p => p.selected ? '#E3E4FA' : '#98AFC7'};
    ${p => p.selected && 'font-weight: bold;'};
    transition: .2s;
    cursor: pointer;

    &:hover {
        color: #E5E4E2
    };
`;

// Dropdown Icon ----------------------------------------
export const DropdownIcon = styled.span`
    position: absolute;
    top: ${p => p.isOpen ? '16px' : '12px'};
    right: 24px;
    border: solid ${p => p.selected ? '#E3E4FA' : '#98AFC7'};
    border-width: ${p => p.isSidebarClose ? '0 0 0 0' : '0 1px 1px 0'};
    padding: 3px;
    transform: ${p => p.isOpen ? 'rotate(-135deg)' : 'rotate(45deg)'};
    transition: .4s;
`;

// Toggler ----------------------------------------------
export const TogglerContainer = styled.div`
    position: absolute;
    width: 30%;
    top: 1%;
    left: 0;
    right: 0;
    margin: 0 auto; \* top&bottom left&right*/
`;

export const Toggler = styled.div`
    height: 40px;
    cursor: pointer;
    position: relative;

    &:after{
        content: '';
        position: absolute;
        left: 0;
        top: .25em;
        height: .1em;
        width: 100%;
        background: #fff;
        box-shadow:
            0 .75em 0 0 #fff,
            0 1.5em 0 0 #fff;
    }
`;