import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);
const NavBtns = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "1rem",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const Nav = ({ isLoggedIn, user, history }) => {
  const [data, setData] = useState();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleItems = () => {
    history.push(`/userProducts`);
  };
  const handleLogin = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };
  const handleLogout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };
  const handleListing = () => {
    history.push("/listProduct");
  };

  return (
    <Box sx={{ flexGrow: 1, marginBottom: "3rem" }}>
      <AppBar color="default">
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                flexGrow: 0,
                display: "flex",
                alignItems: "center",
                gap: "0.7rem",
              }}
            >
              {user && (
                <Tooltip title="Your Items">
                  <IconButton sx={{ p: 0 }} onClick={handleItems}>
                    <Avatar alt={user.name} src={user.img} />
                  </IconButton>
                </Tooltip>
              )}
              <Box>
                <Link
                  to={`/`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Vend-O-VIT
                  </Typography>
                </Link>
              </Box>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              {user ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <NavBtns>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleListing}
                    >
                      List Items
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </NavBtns>
                  <Box>
                    <IconButton onClick={handleMenu}>
                      <Badge
                        badgeContent={user.interests.length}
                        color="primary"
                      >
                        <ShoppingCart sx={{ color: "#333" }} />
                      </Badge>
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      {user.interests.map((interest) => (
                        <Link
                          to={`/product/${interest._id}`}
                          style={{ textDecoration: "none", color: "black" }}
                          key={interest.title}
                        >
                          <MenuItem sx={{ flexDirection: "column" }}>
                            <Typography variant="h5">
                              {interest.title}
                            </Typography>
                            <hr />
                            <Typography variant="body2">
                              {interest.desc}
                            </Typography>
                          </MenuItem>
                        </Link>
                      ))}
                    </Menu>
                  </Box>
                </Box>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleLogin}
                >
                  Login
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Offset />
    </Box>
  );
};

export default withRouter(Nav);
