import { List } from '@mui/material';
import { ReactComponent as UsersIcon } from 'assets/icons/user.svg';
import { MenuItem } from './menu-item';

export type MenuItemChildren = {
    name: string;
    route: string;
    permission?: PermissionName;
    icon?: React.ReactNode;
};
export type MenuItemAdmin = {
    name: string;
    icon: React.ReactNode;
    route?: string;
    children?: MenuItemChildren[];
    permission?: PermissionName;
    badge?: number | null;
};

type MenuListProps = {
    managerSidebarCollapsed: boolean;
}

export const MenuList: React.FC<MenuListProps> = ({managerSidebarCollapsed}) => {

    const menuItems: MenuItemAdmin[] = [
        
        {
            name: 'users',
            icon: <UsersIcon />,
            route: '/users',
        },
        {
            name: 'users',
            icon: <UsersIcon />,
            route: '/userss',
        },
        {
            name: 'users',
            icon: <UsersIcon />,
            route: '/usersss',
        },
        {
            name: 'users',
            icon: <UsersIcon />,
            route: '/usersass',
        },
        {
            name: 'users',
            icon: <UsersIcon />,
            route: '/usersa',
        },
        {
            name: 'users',
            icon: <UsersIcon />,
            route: '/usersaa',
        },
    
    ];

    return (
        <List sx={{ mb: 4 }}>
            {menuItems
                .map((menuItem, i) => (
                    <MenuItem key={i} menuItem={menuItem} managerSidebarCollapsed={managerSidebarCollapsed} />
                ))}
        </List>
    );
};
