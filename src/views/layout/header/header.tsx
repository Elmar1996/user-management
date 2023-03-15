import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { styled } from '@mui/styles';
import { useEffect, useState } from 'react';
import { collapsedSidebarWidth, headerHeight, scrolledHeaderHeight, sidebarWidth } from '../config';
import { HeaderProfile } from './components/header-profile';

const Root = styled(Box)(
    ({
        theme,
        managerSidebarCollapsed,
        isMobile,
        scrolledDown,
    }: {
        theme: Theme;
        managerSidebarCollapsed: boolean;
        isMobile: boolean;
        scrolledDown: boolean;
    }) => ({
        height: scrolledDown ? scrolledHeaderHeight : headerHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'fixed',
        boxShadow: theme.dark ? theme.shadows[2] : theme.shadows[1],
        paddingLeft: isMobile
            ? theme.spacing(6)
            : managerSidebarCollapsed
            ? collapsedSidebarWidth + 48
            : sidebarWidth + 48,
        paddingRight: theme.spacing(3.5),
        width: '100%',
        backgroundColor: theme.palette.background.default,
        zIndex: 10,
        transition: 'all .2s',

        '& .header-actions': {
            display: 'flex',
        },
        '& .theme-box': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        '& .profile-icon-box': {
            marginLeft: theme.spacing(4),
            minWidth: 40,
            minHeight: 40,
            borderRadius: theme.spacing(1.25),
            backgroundColor: 'rgba(59, 67, 242, 0.1)',
        },
        '& .language-menu': {
            '& .MuiSelect-select': {
                padding: theme.spacing(1, 0, 1, 1.5),
                borderRadius: '14px',
                marginLeft: theme.spacing(4),
            },
        },
    }),
);

export const Header: React.FC<{collapsed:boolean}> = ({collapsed}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));


    const [scrolledDown, setScrolledDown] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 10) {
            setScrolledDown(true);
        } else {
            setScrolledDown(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Root managerSidebarCollapsed={collapsed} isMobile={isMobile} scrolledDown={scrolledDown}>
            <Typography
                variant="h4"
                sx={{ color: (theme) => (theme.dark ? theme.palette.text.primary : theme.palette.primary.dark) }}
            >
                Welcome
            </Typography>
            <Box className="header-actions">
                <HeaderProfile collapsed={collapsed} userClassName="profile-icon-box" />
            </Box>
        </Root>
    );
};
