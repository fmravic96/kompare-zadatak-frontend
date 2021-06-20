import React, { useEffect, useState, useRef } from "react";
import { Container, Typography, Grid, makeStyles, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@material-ui/core";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { DataGrid } from "@material-ui/data-grid";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getUsers, createUser, deleteUsers } from "./store/actions/users";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: "center",
  },
  actionButtons: {
    margin: theme.spacing(4),
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: red,
  },
});

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      firstName: fnameRef.current.value,
      lastName: lnameRef.current.value,
      email: emailRef.current.value,
    };
    dispatch(createUser(data));
    toast.success(`Added user ${data.firstName} ${data.lastName}`);
    setOpen(false);
  };

  const handleDelete = () => {
    dispatch(deleteUsers(selectionModel));
    toast.success(`Deleted ${selectionModel.length} user/s`);
  };

  const fnameRef = useRef();
  const lnameRef = useRef();
  const emailRef = useRef();

  const columns = [
    { field: "firstName", headerName: "First Name", flex: 1 },
    { field: "lastName", headerName: "Last Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
  ];

  users.map((user) => {
    return rows.push({ id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email });
  });

  return (
    <>
      <Container maxWidth="sm">
        <Grid container justify="center" spacing={8} className={classes.root}>
          <Grid item xs={12}>
            <Typography variant="h3" gutterBottom>
              <b>Zadatak - Kompare</b>
            </Typography>
          </Grid>

          <div style={{ width: "100%" }}>
            <DataGrid
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
          </div>

          <Grid item xs={12}>
            <Grid container justify="center">
              <ThemeProvider theme={theme}>
                <Button variant="contained" onClick={handleClickOpen} color="primary" className={classes.actionButtons} startIcon={<AddIcon />}>
                  Add new user
                </Button>
                <Button variant="contained" onClick={handleDelete} color="secondary" className={classes.actionButtons} startIcon={<DeleteIcon />}>
                  Delete selected user/s
                </Button>
              </ThemeProvider>
              <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add new user</DialogTitle>
                <DialogContent>
                  <form noValidate autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
                    <TextField required autoFocus margin="dense" id="fname" label="First name" type="text" fullWidth inputRef={fnameRef} />
                    <TextField required margin="dense" id="lname" label="Last name" type="text" fullWidth inputRef={lnameRef} />
                    <TextField required margin="dense" id="email" label="Email Address" type="email" fullWidth inputRef={emailRef} />
                    <DialogActions>
                      <Button onClick={handleClose} color="primary">
                        Cancel
                      </Button>
                      <Button type="submit" onClick={handleClose} color="primary">
                        Add user
                      </Button>
                    </DialogActions>
                  </form>
                </DialogContent>
              </Dialog>
            </Grid>
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
