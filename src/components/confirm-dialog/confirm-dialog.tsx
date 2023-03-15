import CloseIcon from '@mui/icons-material/Close';
import {
    Box,
    Button,
    Dialog as MUIDialog,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    Typography,
} from '@mui/material';
import { styled } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import ConfirmIcon from 'assets/icons/confirm.svg';
import DeleteIcon from 'assets/icons/delete.svg';
import clsx from 'clsx';

export type ConfirmDialogType = 'error' | 'success';
export type ConfirmDialogDescription = string | undefined;

const Dialog = styled(MUIDialog)(({ theme }: { theme: Theme }) => ({
    '& .header': {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        paddingBottom: theme.spacing(2),
        '& p': {
            fontSize: theme.spacing(3),
        },
    },
    '& .icon': {
        width: '100px',
        margin: theme.spacing(3, 0, 2, 0),
    },
    '& .closeIcon': {
        display: 'flex',
        alignSelf: 'flex-end',
    },
    '& .confirmButton': {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.error.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.error.dark,
        },
    },
    '& .headerWrapper': {
        backgroundColor: theme.dark ? theme.palette.action.hover : '',
        padding: theme.spacing(2),
    },
    '& .contentWrapper': {
        backgroundColor: theme.dark ? '' : theme.palette.action.hover,
    },
    '& .content': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        margin: theme.spacing(3),
    },
    '& .description': {
        marginBottom: theme.spacing(3),
        textAlign: 'center',
    },
    '& .buttons': {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    '& .button': {
        margin: theme.spacing(1),
        padding: theme.spacing(0.8, 2),
        width: '35%',
    },
    '& .cancel-button': {
        color: theme.palette.grey[600],
        borderColor: theme.palette.grey[400],
    },
}));

type ConfirmDialogProps = {
    open: boolean;
    onClose: (type: ConfirmDialogType, description: ConfirmDialogDescription) => void;
    onConfirm: any;
    confirmText?: string;
    description?: ConfirmDialogDescription;
    type?: ConfirmDialogType;
};

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    open,
    confirmText,
    description,
    type = 'error',
    onClose,
    onConfirm,
}) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle className="headerWrapper">
                <Box className="header">
                    <IconButton size="small" onClick={() => onClose(type, description)} className="closeIcon">
                        <CloseIcon />
                    </IconButton>
                    {type === 'success' ? (
                        <img className="icon" src={ConfirmIcon} />
                    ) : (
                        <img className="icon" src={DeleteIcon} />
                    )}
                    <Typography color={type === 'success' ? 'primary' : 'error'}>
                        {confirmText || "confirm"}
                    </Typography>
                </Box>
            </DialogTitle>
            <Divider />
            <DialogContent className="contentWrapper">
                <Box className="content">
                    <Typography className="description">
                        {description || "delete-description"}
                    </Typography>
                    <Box className="buttons">
                        <Button
                            onClick={() => onClose(type, description)}
                            variant="outlined"
                            autoFocus
                            className={clsx('button', 'cancel-button')}
                        >
                            no
                        </Button>
                        <Button
                            onClick={onConfirm}
                            variant="contained"
                            color={type === 'success' ? 'primary' : 'error'}
                            className="button"
                        >
                            yes
                        </Button>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
};
