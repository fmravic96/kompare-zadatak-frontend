import React, { useEffect } from "react";
import { Container, Typography, Grid, makeStyles, Button } from "@material-ui/core";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { DataGrid } from "@material-ui/data-grid";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";

import { getUsers } from "./store/actions/users";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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

const User = ({ users, getUsers }) => {
  useEffect(() => {
    setTimeout(() => {
      getUsers();
    }, 2000);
  }, [getUsers]);

  const classes = useStyles();

  const columns = [
    { field: "firstName", headerName: "First Name", flex: 1 },
    { field: "lastName", headerName: "Last Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
  ];

  let rows = [];
  if (users) {
    users.map((user) => {
      return rows.push({ id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email });
    });
  }

  return (
    <>
      <Container maxWidth="sm">
        <Grid container justify="center" spacing={8} className={classes.root}>
          <Grid item xs={12}>
            <Typography variant="h3" gutterBottom>
              <b>Zadatak - Kompare</b>
            </Typography>
          </Grid>
          {users ? (
            <>
              {users.length === 0 ? (
                <Typography variant="h3">No users available.</Typography>
              ) : (
                <>
                  <div style={{ width: "100%" }}>
                    <DataGrid rows={rows} columns={columns} autoHeight checkboxSelection hideFooterPagination />
                  </div>

                  <Grid item xs={12}>
                    <Grid container justify="center">
                      <ThemeProvider theme={theme}>
                        <Button variant="contained" color="primary" className={classes.actionButtons} startIcon={<AddIcon />}>
                          Add new user
                        </Button>
                        <Button variant="contained" color="secondary" className={classes.actionButtons} startIcon={<DeleteIcon />}>
                          Delete selected user/s
                        </Button>
                      </ThemeProvider>
                    </Grid>
                  </Grid>
                </>
              )}
            </>
          ) : (
            <ClipLoader color="teal" size={150} />
          )}
        </Grid>
      </Container>
    </>
  );
};

export default connect((store) => ({ users: store.users }), { getUsers })(User);
