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
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import "./Appbar.css";
import { useTranslation } from "react-i18next";

const Appbar = () => {
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [languageAnchorEl, setLanguageAnchorEl] = React.useState(false);
  const [userAnchorEl, setUserAnchorEl] = React.useState(false);
  const [language, setLanguage] = React.useState(i18n.language);
  const name = localStorage.getItem("name");

  const handleClick = () => {
    dispatch(logout());
    localStorage.clear();
    dispatch(clearToken());
    navigate("/login");
  };
  const languageOpen = Boolean(languageAnchorEl);
  const handleLanguageAnchor = (event) => {
    setLanguageAnchorEl(event.currentTarget);
  };
  const userOpen = Boolean(userAnchorEl);
  const handleUserAnchor = (event) => {
    setUserAnchorEl(event.currentTarget);
  };
  const handleChangeLanguageClose = (e) => {
    const lang = e.target.innerText;
    if (lang != null) {
      setLanguage(lang);
      i18n.changeLanguage(lang);
      setLanguageAnchorEl(null);
      setUserAnchorEl(null);
    } else {
      setLanguageAnchorEl(null);
      setUserAnchorEl(null);
    }
  };
  const handleChangeLanguageCancel = () => {
    setLanguageAnchorEl(null);
  };
  const handleUserCancel = () => {
    setUserAnchorEl(null);
  };
  return (
    <div className="Appbar">
      <AppBar position="static" elevation={0} style={{ background: "#363F4E" }}>
        <Toolbar>
          <Link to="/" className="appbarHomePage">
            <img src="./mono.png" alt="" className="appbarLogo" />
            <p className="appbarTitle">{t("systemName")}</p>
          </Link>
          <Box className="appbar">
            <Box className="appbarUser" sx={{ display: { xs: 'none', sm: 'flex' } }}>
              <Button
                id="fade-language-button"
                sx={{ color: '#fff' }}
                aria-controls={languageOpen ? "fade-language-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={languageOpen ? "true" : undefined}
                onClick={handleLanguageAnchor}
              >
                <PublicIcon />
                <p className="appbarUsername">{language}</p>
                <ArrowDropDownIcon />
              </Button>
              <Menu
                id="fade-language-menu"
                MenuListProps={{
                  "aria-labelledby": "fade-language-button",
                }}
                anchorEl={languageAnchorEl}
                open={languageOpen}
                onClose={handleChangeLanguageCancel}
                TransitionComponent={Fade}
              >
                <MenuItem onClick={handleChangeLanguageClose}>zh-tw</MenuItem>
                <MenuItem onClick={handleChangeLanguageClose}>en</MenuItem>
                <MenuItem onClick={handleChangeLanguageClose}>de</MenuItem>
              </Menu>
            </Box>
            <Box className="appbarUser" sx={{ display: { xs: 'none', sm: 'flex' } }}>
              <Link to="/memberlist">
                <PersonIcon />
                <p className="appbarUsername"> {name} </p>
              </Link>
            </Box>
            <Box className="appbarUser" sx={{ display: { xs: 'flex', sm: 'none' } }}>
              <Button
                id="fade-user-button"
                sx={{ color: '#fff' }}
                aria-controls={userOpen ? "fade-user-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={userOpen ? "true" : undefined}
                onClick={handleUserAnchor}
              >
                <PersonIcon />
                <p className="appbarUsername"> {name} </p>
                <ArrowDropDownIcon />
              </Button>
              <Menu
                id="fade-user-menu"
                MenuListProps={{
                  "aria-labelledby": "fade-button",
                }}
                anchorEl={userAnchorEl}
                open={userOpen}
                onClose={handleUserCancel}
                TransitionComponent={Fade}
              >
                <MenuItem className="menuUser">
                  <Link
                    id="fade-user-language-button"
                    aria-controls={languageOpen ? "fade-language-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={languageOpen ? "true" : undefined}
                    onClick={handleLanguageAnchor}
                  >
                    <PublicIcon />
                    {language}
                    <ArrowDropDownIcon />
                  </Link>
                </MenuItem>
                <MenuItem className="menuUser" onClick={handleUserCancel}>
                  <Link to="/memberlist">
                    <PersonIcon />
                    {t('adminList')}
                  </Link>
                </MenuItem>
                <MenuItem className="menuUser" onClick={handleClick}>
                  <LogoutIcon />
                  {t("SignOut")}
                </MenuItem>
              </Menu>
            </Box>
            <Box className="appbarLogout" sx={{ display: { xs: 'none', sm: 'flex' } }} >
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
                onClick={handleClick}
              >
                <LogoutIcon className="appbarLogoutIcon"></LogoutIcon>
                {t("SignOut")}
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Outlet />
    </div>
  );
};

export default Appbar;
