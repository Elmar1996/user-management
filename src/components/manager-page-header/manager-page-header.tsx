import { Box, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import { Theme } from '@mui/material/styles';

const Root = styled(Box)(({ theme, center }: { theme: Theme; center?: boolean }) => ({
    marginBottom: theme.spacing(center ? 6 : 4),
    display: 'flex',
    justifyContent: center ? 'center' : 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: center ? 0 : theme.spacing(0, 3.5, 0, 0),
    [theme.breakpoints.down('md')]: {
        paddingLeft: theme.spacing(3.5),
    },
}));

export const ManagerPageHeader: React.FC<{ title: string; center?: boolean }> = ({ title, children, center }) => {
    return (
        <Root center={center}>
            <Typography variant="h3" className="title">
                {title}
            </Typography>
            <Box>{children}</Box>
        </Root>
    );
};
