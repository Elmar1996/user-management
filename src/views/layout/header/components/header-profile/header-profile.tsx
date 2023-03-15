import {
    Box, BoxProps, Typography, useTheme
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import { styled } from '@mui/system';

const Root = styled(Box)(({ theme, collapsed }: { theme: Theme; collapsed: boolean }) => ({
    display: 'flex',
    cursor: 'pointer',
    backgroundColor:"rgba(59, 67, 242, 0.1)",
    [theme.breakpoints.up('sm')]: !collapsed && {
        padding: theme.spacing(1.5),
        borderRadius: '10px',
        border: `1px solid ${theme.dark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'} `,
    },
    '& .profile-content': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginLeft: theme.spacing(1),
    },
    '& .user': {
        minWidth: 52,
        minHeight: 52,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: theme.spacing(2),
        backgroundColor: theme.dark ? 'rgba(36, 36, 36, 1)' : 'rgba(248, 248, 248, 1)',
        '& > p': {
            color: theme.palette.text.secondary,
        },
    },
    '& .customer-name': {
        color: theme.palette.text.secondary,
    },
    '& .customer-code': {
        color: 'rgba(231, 109, 79, 1)',
    },
    '& .arrow-button': {
        width: 'max-content',
        height: 'max-content',
        marginLeft: theme.spacing(3),
    },
    '& .arrow-icon': {
        transition: 'all .3s',
        width: '24px',
        height: '24px',
    },
}));


export const HeaderProfile: React.FC<{ collapsed: boolean; userClassName?: string } & BoxProps> = ({
    collapsed,
}) => {

    return (
        <>
            <Root theme={useTheme()} collapsed={collapsed} >
                <Box sx={{ display: 'flex'}}>
                    <Typography fontWeight="600" fontSize="0.875rem">
                       Super Admin
                    </Typography>
                </Box>
               
            </Root>
        </>
    );
};
