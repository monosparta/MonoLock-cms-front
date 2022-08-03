import React from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate, Link } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Menu,
  MenuItem,
  Fade,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { clearToken, logout } from "../redux/userSlice";
import PersonIcon from "@mui/icons-material/Person";
import PublicIcon from "@mui/icons-material/Public";
import "./Appbar.css";
import { useTranslation } from "react-i18next";

const Appbar = () => {
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(false);
  const [laungue, setLaungue] = React.useState(i18n.language);
  const name = localStorage.getItem("name");

  const handleClick = () => {
    dispatch(logout());
    localStorage.clear();
    dispatch(clearToken());
    navigate("/login");
  };
  const open = Boolean(anchorEl);
  const handleChangeLaungue = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleChangeLaungueClose = (e) => {
    const lang = e.target.innerText;
    if (lang != null) {
      setLaungue(lang);
      i18n.changeLanguage(lang);
      setAnchorEl(null);
    } else {
      setAnchorEl(null);
    }
  };
  const handleChangeLaungueCancel = () => {
    setAnchorEl(null);
  };
  return (
    <div className="Appbar">
      <AppBar position="static" elevation={0} style={{ background: "#363F4E" }}>
        <Toolbar>
          <Link to="/" className="appbarHomePage">
            <img src="./mono.png" alt="" className="appbarLogo" />
            <p className="appbarTitle">{t("systemName")}</p>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <div className="appbar">
            <div className="appbarUser">
              <Button
                id="fade-button"
                aria-controls={open ? "fade-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleChangeLaungue}
              >
                <PublicIcon />
                <p className="appbarUsername">{laungue}</p>
              </Button>
              <Menu
                id="fade-menu"
                MenuListProps={{
                  "aria-labelledby": "fade-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleChangeLaungueCancel}
                TransitionComponent={Fade}
              >
                <MenuItem onClick={handleChangeLaungueClose}>zh-tw</MenuItem>
                <MenuItem onClick={handleChangeLaungueClose}>en</MenuItem>
                <MenuItem onClick={handleChangeLaungueClose}>de</MenuItem>
              </Menu>
            </div>
            <div className="appbarUser">
              <Link to="/memberlist">
                <PersonIcon />
                <p className="appbarUsername"> {name} </p>
              </Link>
            </div>
            <div className="appbarLogout">
              <Button
                variant="appbarLogout"
                className="appbarLogoutButton"
                style={{
                  border: "1px solid",
                  borderColor: "#fff",
                  borderSize: "border-box",
                  borderRadius: "4px",
                  height: 36,
                  width: 116,
                  textTransform: "none",
                }}
                onClick={(e) => handleClick(e)}
              >
                <LogoutIcon className="appbarLogoutIcon"></LogoutIcon>
                {t("SignOut")}
              </Button>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Outlet />
    </div>
  );
};

export default Appbar;
