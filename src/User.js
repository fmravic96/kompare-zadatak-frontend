import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  makeStyles,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Paper,
} from "@material-ui/core";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { GridOverlay, DataGrid } from "@material-ui/data-grid";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as yup from "yup";

import { getUsers, createUser, deleteUsers } from "./store/actions/users";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
  },
  root: {
    flexGrow: 1,
    textAlign: "center",
  },
  actionButtons: {
    margin: theme.spacing(4),
  },
  noRowsOverlay: {
    width: "100%",
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: red,
  },
});

const CustomNoRowsOverlay = () => {
  const classes = useStyles();

  return (
    <GridOverlay>
      <div className={classes.noRowsOverlay}>
        <Typography variant="body2" gutterBottom>
          <b>There are currently no users in database.</b>
        </Typography>
        <Typography variant="body2">
          <b>Add one by pressing the button below.</b>
        </Typography>
      </div>
    </GridOverlay>
  );
};

const User = () => {
  const [open, setOpen] = useState(false);
  const [selectionModel, setSelectionModel] = useState([]);

  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  let rows = [];

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    dispatch(deleteUsers(selectionModel));
    toast.success(`Deleted ${selectionModel.length} user/s`);
    setSelectionModel([]);
  };

  const validationSchema = yup.object({
    fname: yup.string("Enter your first name").min(2, "Minimum 2 characters").required("First name is required."),
    lname: yup.string("Enter your last name").min(2, "Minimum 2 characters").required("Last name is required"),
    email: yup.string("Enter your email").email("Enter a valid email").required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const data = {
        firstName: values.fname,
        lastName: values.lname,
        email: values.email,
      };
      dispatch(createUser(data));
      toast.success(`Added user ${data.firstName} ${data.lastName}`);
      setOpen(false);
    },
  });

  const columns = [
    { field: "firstName", headerName: "First Name", flex: 1 },
    { field: "lastName", headerName: "Last Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
  ];

  if (users) {
    users.map((user) => {
      return rows.push({ id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email });
    });
  }

  return (
    <>
      <Container maxWidth="sm" className={classes.container}>
        <Grid container justify="center" spacing={8} className={classes.root}>
          <Grid item xs={12}>
            <Typography variant="h3" gutterBottom>
              <b>Zadatak - Kompare</b>
            </Typography>
          </Grid>

          <Paper elevation={3} style={{ width: "100%" }}>
            <DataGrid
              components={{ NoRowsOverlay: CustomNoRowsOverlay }}
              rows={rows}
              columns={columns}
              autoHeight
              checkboxSelection
              pageSize={10}
              pagination
              loading={users === null}
              onSelectionModelChange={(newSelection) => {
                setSelectionModel(newSelection.selectionModel);
              }}
              selectionModel={selectionModel}
            />
          </Paper>

          <Grid item xs={12}>
            <Grid container justify="center">
              <ThemeProvider theme={theme}>
                <Button variant="contained" onClick={handleClickOpen} color="primary" className={classes.actionButtons} startIcon={<AddIcon />}>
                  Add new user
                </Button>
                <Button
                  disabled={selectionModel.length === 0}
                  variant="contained"
                  onClick={handleDelete}
                  color="secondary"
                  className={classes.actionButtons}
                  startIcon={<DeleteIcon />}
                >
                  Delete selected user/s
                </Button>
              </ThemeProvider>
              <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add new user</DialogTitle>
                <DialogContent>
                  <form onSubmit={formik.handleSubmit}>
                    <TextField
                      fullWidth
                      margin="dense"
                      id="fname"
                      name="fname"
                      label="First name"
                      value={formik.values.fname}
                      onChange={formik.handleChange}
                      error={formik.touched.fname && Boolean(formik.errors.fname)}
                      helperText={formik.touched.fname && formik.errors.fname}
                    />
                    <TextField
                      fullWidth
                      margin="dense"
                      id="lname"
                      name="lname"
                      label="Last name"
                      value={formik.values.lname}
                      onChange={formik.handleChange}
                      error={formik.touched.lname && Boolean(formik.errors.lname)}
                      helperText={formik.touched.lname && formik.errors.lname}
                    />
                    <TextField
                      fullWidth
                      margin="dense"
                      id="email"
                      name="email"
                      label="Email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                    />

                    <DialogActions>
                      <Button onClick={handleClose} color="primary">
                        Cancel
                      </Button>
                      <Button type="submit" color="primary">
                        Add user
                      </Button>
                    </DialogActions>
                  </form>
                </DialogContent>
              </Dialog>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              <b>Made by Filip Mravić</b>
            </Typography>
          </Grid>
        </Grid>
      </Container>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default User;
