import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Sidebar from "./Sidebar";
import AddPost from "./AddPost";
import Modal from "@material-ui/core/Modal";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";
import { Paper } from "@material-ui/core";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    position: "absolute",
    width: 600,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: "center",
  },
  paper2: {
    marginRight: theme.spacing(2),
  },
}));

export default function ButtonAppBar({ mode, setMode }) {
  const classes = useStyles();

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Create Post</h2>
      <p id="simple-modal-description">Please add title and Image Url</p>
      <AddPost handleClose={handleClose} />
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <Sidebar />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Link to="/signin">
            <Button
              style={{ marginRight: 10 }}
              variant="contained"
              color="primary"
            >
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button
              style={{ marginRight: 10 }}
              color="secondary"
              variant="outlined"
            >
              Sign up
            </Button>
          </Link>
          <Fab
            color="primary"
            size="small"
            aria-label="add"
            onClick={handleOpen}
          >
            <AddIcon />
          </Fab>
          <IconButton
            onClick={handleMenuClick}
            aria-controls="simple-menu"
            aria-haspopup="true"
          >
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          </IconButton>
          <Paper className={classes.paper2}>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleMenuClose}>My account</MenuItem>
              <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
            </Menu>
          </Paper>
          <IconButton
            onClick={() => {
              setMode(!mode);
            }}
          >
            {mode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
