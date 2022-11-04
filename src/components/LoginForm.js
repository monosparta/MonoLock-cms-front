import React from "react";
import { useForm } from "react-hook-form";
import { selectUser } from "../redux/userSlice";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  TextField,
  Button,
  styled,
  Grid,
  Menu,
  MenuItem,
  Fade,
} from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const LoginForm = (props) => {
  const { register, handleSubmit } = useForm();
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(false);
  const [language, setLaungue] = React.useState(i18n.language);

  const { isFetching, isError } = useSelector(selectUser);

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

  const CssTextField = styled(TextField)({
    "& .MuiFormHelperText-root": {
      "&.Mui-focused": {
        //提示文字
        color: "#02A2EE",
      },
    },
    "& label.Mui-focused": {
      //上排文字
      color: "#02A2EE",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "black",
      },
      "&:hover fieldset": {
        borderColor: "black",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#363F4E", //FIELD 框
      },
    },
  });
  return (
    <>
      <form className="loginForm" onSubmit={handleSubmit(props.onSubmit)}>
        <div className="loginFormItem">
          <div className="loginFormItemTitle">
            <Grid container direction="row" justifyContent="space-between">
              <h1>Sign in</h1>
              <Button
                id="fade-button"
                aria-controls={open ? "fade-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleChangeLaungue}
                style={{ padding: "0" }}
              >
                <Grid
                  container
                  direction="row"
                  gap={1}
                  justifyContent="flex-start"
                  style={{ width: "5rem" }}
                >
                  <PublicIcon />
                  <p>{language}</p>
                  <ArrowDropDownIcon />
                </Grid>
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
            </Grid>
          </div>
          <div className="loginFormItemUser">
            <h2>{t("account")} Email</h2>
            <CssTextField
              required
              type="email"
              id="input-email"
              placeholder={t("inputAccount")}
              sx={{ width: "100%" }}
              inputProps={{
                style: {
                  height: "14px",
                },
              }}
              {...register("email")}
            />
          </div>
          <div className="loginFormItemPassword">
            <h2>{t("password")} Password</h2>
            <CssTextField
              required
              type="password"
              id="input-password"
              placeholder={t("inputPassword")}
              sx={{ width: "100%", borderColor: "#000" }}
              inputProps={{
                style: {
                  height: "14px",
                },
              }}
              {...register("password")}
            />
          </div>
          <div className="loginFormItemButton">
            <span>
              {isFetching
                ? props.toast.loading(t("logining"), { id: "loading" })
                : props.toast.remove("loading")}
              {isError
                ? props.toast.error(t("accountOrPasswordIncorrect"))
                : null}
            </span>
            <Button
              type="submit"
              variant="contained"
              style={{
                width: "100%",
                height: 47,
                background: "#363F4E",
                boxShadow: "none",
                fontSize: 24,
              }}
            >
              {t("signInNow")}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
