import { Box, Button, Card, Container, Grid, Theme } from "@mui/material";
import { styled } from "@mui/styles";
import axios from "axios";
import { ManagerPageHeader, Page } from "components";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import { useDispatch, useSelector } from "react-redux";
import { addUser, User } from "redux/user-slice";
import browserHistory from "utils/browser-utils";

const Root = styled(Container)(({ theme }: { theme: Theme }) => ({
  "& .card": {
    padding: theme.spacing(4, 8),
    borderRadius: theme.spacing(3),
  },
  "& .inputButton": {
    whiteSpace: "nowrap",
    backgroundColor: "#DEE0FD",
    color: "#3B43F2",
    display: "flex",
    justifyContent: "space-around",
    borderRadius: "15px",
    padding: "6px 16px",
    [theme.breakpoints.down("sm")]: {
      borderRadius: "16px",
      padding: "5px 32px",
    },
  },

  "& .category-field .MuiOutlinedInput-root": {
    paddingBottom: 0,
  },
  "& .upload-icon": {
    width: theme.spacing(15),
    [theme.breakpoints.down("sm")]: {
      width: theme.spacing(5),
    },
  },
  "& .buttons": {
    textAlign: "end",
    marginTop: "5px",
    "& .MuiButton-root:first-child": {
      marginRight: theme.spacing(2),
    },
    "& .MuiButton-root:last-child": {
      marginLeft: theme.spacing(0),
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      "& .MuiButton-root": {
        width: "100%",
      },
      "& .MuiButton-root:first-child": {
        marginLeft: 0,
        marginBottom: theme.spacing(2),
      },
      "& .MuiButton-root:last-child": {
        marginLeft: 0,
      },
    },
  },
}));

export const CreateNewUser: React.FC = () => {
  const users = useSelector((state: { users: User[] }) => state.users);
  const dispatch = useDispatch()
  const initialValues = {
    name: "",
    username: "",
    email: "",
    phone: "",
  };

  const postUser = async (data) => {
    const { data: userData } = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      data
    );
   
    const newData = { ...userData, id: users.length + 1 };
    dispatch(addUser(newData))
    browserHistory.push("/users")
  };

  return (
    <Root>
      <Page title="newsCategory">
        <ManagerPageHeader title="newsCategory" center />
        <Formik initialValues={initialValues} onSubmit={postUser}>
          {() => (
            <Card className="card">
              <Form>
                <Grid container spacing={3} mb={4}>
                  <Grid item xs={12} md={6}>
                    <Field
                      variant="outlined"
                      label="categoryName"
                      component={TextField}
                      name="name"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      variant="outlined"
                      label="categoryName"
                      component={TextField}
                      name="username"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      variant="outlined"
                      label="categoryName"
                      component={TextField}
                      name="email"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      variant="outlined"
                      label="categoryName"
                      component={TextField}
                      name="phone"
                    />
                  </Grid>
                </Grid>

                <Box className="buttons">
                  <Button
                    variant="outlined"
                    onClick={() => browserHistory.goBack()}
                    sx={{ ml: 2 }}
                  >
                    cancel
                  </Button>
                  <Button variant="contained" type="submit" sx={{ ml: 2 }}>
                    save
                  </Button>
                </Box>
              </Form>
            </Card>
          )}
        </Formik>
      </Page>
    </Root>
  );
};
