import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { Box, ButtonBase, Drawer as MuiDrawer, useMediaQuery, useTheme } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { styled } from '@mui/styles';
import logo from "assets/icons/logo.png";
import minLogo from "assets/icons/min-logo.png";
import { Link } from 'components';
import { Dispatch, SetStateAction } from 'react';
import { collapsedSidebarWidth, sidebarWidth } from '../config';
import { MenuList } from './menu-list';

const Root = styled(Box)(({ theme, managerSidebarCollapsed }: { theme: Theme; managerSidebarCollapsed: boolean }) => ({
    position: 'fixed',
    height: `calc(var(--vh, 1vh) * 100)`,
    display: 'flex',
    zIndex: 11,
    boxShadow: theme.dark ? theme.shadows[2] : 'none',
    '& .collapsed-button': {
        width: 24,
        height: 54,
        backgroundColor: 'rgba(59, 67, 242, 0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 16,
        borderBottomRightRadius: 16,
        marginTop: theme.spacing(4.5),
        position: 'absolute',
        right: -24,
    },
    '& .collapsed-icon': {
        color: 'text.secondary',
        transform: managerSidebarCollapsed ? 'rotate(-90deg)' : 'rotate(90deg)',
    },
}));

const Drawer = styled(MuiDrawer)(
    ({
        theme,
        managerSidebarCollapsed,
        isMobile,
    }: {
        theme: Theme;
        managerSidebarCollapsed: boolean;
        isMobile: boolean;
    }) => ({
        width:  managerSidebarCollapsed ? collapsedSidebarWidth : sidebarWidth,
        '& .MuiDrawer-paper': {
            transition: isMobile ? 'none' : 'all .2s',
            borderRight: 'none',
            width: managerSidebarCollapsed ? collapsedSidebarWidth : sidebarWidth,
        },
        '& .dashboard-menu': {
            '&::-webkit-scrollbar': {
                width: '0.3em',
                height: '0.1em',
            },
            '&::-webkit-scrollbar-thumb': {
                borderRadius: '8px',
                backgroundColor: 'rgba(59, 67, 242, .25)',
            },
            backgroundColor: theme.dark ? theme.palette.background.default : 'rgba(59, 67, 242, 0.02)',
            overflowY: 'auto',
            overflowX: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            '& .logo': {
                minHeight: 32,
                width: 'auto',
                margin: theme.spacing(6, 0),
                display: 'flex',
                justifyContent: 'center',
            },
            '& .logout-button': {
                display: 'flex',
                padding: theme.spacing(2, 0),
                color: theme.palette.primary.main,
                justifyContent: 'flex-start',
                marginBottom: theme.spacing(2),
            },
        },
        '& .logout-icon': {
            marginLeft: managerSidebarCollapsed ? theme.spacing(4) : theme.spacing(3),
            marginRight: managerSidebarCollapsed ? theme.spacing(4) : theme.spacing(3),
        },
    }),
);

export const Sidebar: React.FC<{collapsed:boolean;setCollapsed:Dispatch<SetStateAction<boolean>>}> = ({collapsed,setCollapsed}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
   

    return (
        <Root managerSidebarCollapsed={collapsed}>
            <Drawer
                variant={ 'permanent'}
                anchor="left"
                open={collapsed}
                onClose={() =>  setCollapsed(true)}
                managerSidebarCollapsed={!isMobile && collapsed}
                isMobile={isMobile}
            >
                <Box className="dashboard-menu">
                    <Link to="/" className="logo">
                        {collapsed ? (
                            <img style={{width:"70px", height:"70px"}} src={minLogo} alt="bestcomp logo" />
                        ) : (
                            <img src={logo} alt="bestcomp logo" />
                        )}
                    </Link>

                    <MenuList managerSidebarCollapsed={collapsed} />
                    
                </Box>
            </Drawer>

            <ButtonBase className="collapsed-button" onClick={() => setCollapsed(!collapsed)}>
                <KeyboardArrowDownOutlinedIcon className="collapsed-icon" />
            </ButtonBase>
        </Root>
    );
};
