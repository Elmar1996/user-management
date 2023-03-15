import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {
    Box,
    Button,
    Dialog as MuiDialog, Grid,
    IconButton, Typography
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import { styled } from '@mui/styles';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import { useDispatch, useSelector } from 'react-redux';
import { Filter, filterUsers } from "redux/filter-slice";


type FilterDialogProps = {
    filterDialogOpen: boolean;
    onClose: () => void;
};

const Dialog = styled(MuiDialog)(({ theme }: { theme: Theme }) => ({
    '& .close-button': {
        position: 'absolute',
        right: 0,
        top: 0,
        margin: theme.spacing(3),
    },
    '& .store .MuiOutlinedInput-root': {
        paddingBottom: 0,
    },
}));

export const FilterDialog: React.FC<FilterDialogProps> = ({ filterDialogOpen, onClose }) => {
    const filters = useSelector((state: { filter: Filter }) => state.filter);
    const dispatch = useDispatch()
    const filterUsersData = (data) => {
        dispatch(filterUsers(data))
        onClose()
    }
    return (
        <Dialog open={filterDialogOpen} onClose={onClose}>
            <IconButton onClick={onClose} className="close-button">
                <CloseOutlinedIcon />
            </IconButton>
            <Box sx={{ py: 4, px: 6 }}>
                <Typography sx={{ textAlign: 'center', mb: 4 }} variant="h3">
                  User filter
                </Typography>
                <Formik
                    initialValues={filters}
                    enableReinitialize
                    onSubmit={filterUsersData}
                >
                    {(): React.ReactNode => {
                        return (
                            <Form>
                                <Box>
                                    <Grid container spacing={3} mb={3}>
                                        <Grid item xs={12} sm={6}>
                                            <Field
                                                name="name"
                                                component={TextField}
                                                label="storeName"
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Field
                                                name="username"
                                                component={TextField}
                                                label="storeName"
                                                variant="outlined"
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <Field
                                                name="email"
                                                component={TextField}
                                                label="email"
                                                variant="outlined"
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <Field
                                                name="phone"
                                                component={TextField}
                                                label="phone"
                                                variant="outlined"
                                            />
                                        </Grid>
                                    </Grid>
                                    <Box sx={{ textAlign: 'end' }}>
                                        <Button
                                            variant="outlined"
                                            sx={{ ml: 3 }}
                                            onClick={() => {
                                                filterUsersData({name:"",username:"",email:"",phone:""})
                                                onClose()
                                            }}
                                               
                                        >
                                           reset
                                        </Button>
                                        <Button variant="contained" sx={{ ml: 3 }} type="submit">
                                            filter
                                        </Button>
                                    </Box>
                                </Box>
                            </Form>
                        );
                    }}
                </Formik>
            </Box>
        </Dialog>
    );
};
