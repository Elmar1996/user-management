import { CssBaseline } from '@mui/material';
import { styled } from '@mui/styles';
import { Theme } from '@mui/system';
import { Header } from './header';
import { collapsedSidebarWidth, headerHeight, headerTopHeight, sidebarWidth } from './config';
import AppRouter from 'routes/AppRouter';
import { Sidebar } from './sidebar';
import { useState } from 'react';

const Root = styled('div')(({ theme,collapsed }: { theme: Theme,collapsed:boolean }) => ({
    display: 'flex',
    flexDirection: 'column',
    '& .main-wrapper': {
        display: 'flex',
        height: '100%',
        flex: '1 1 auto',
        paddingTop: headerHeight + headerTopHeight,
        paddingLeft: collapsed ? collapsedSidebarWidth  : sidebarWidth ,
        [theme.breakpoints.down('md')]: {
            paddingTop: headerHeight,
        },
    },
    '& .content': {
        width: '100%',
        flex: '1 1 auto',
    },
    '& .main': {
        paddingBottom: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        minHeight: `calc(100vh - ${headerTopHeight + headerHeight}px)`,
        [theme.breakpoints.down('md')]: {
            minHeight: `calc(100vh - ${headerHeight}px)`,
        },
    },
}));

const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    return (
        <Root collapsed={collapsed}>
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed}/>
            <CssBaseline />
            <Header collapsed={collapsed} />
            <div className="main-wrapper">
                <div className="content">
                    <div className="main">
                        <AppRouter />
                    </div>
                </div>
            </div>
        </Root>
    );
};

export default App;
