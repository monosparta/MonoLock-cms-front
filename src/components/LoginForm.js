import React from "react";
import { useForm } from "react-hook-form";
import { selectUser } from "../redux/userSlice";
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import { TextField, Button, styled } from "@mui/material";

const LoginForm = (props) => {
  const { register, handleSubmit } = useForm();
  const { t } = useTranslation();

  const { isFetching, isError } = useSelector(selectUser);

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
            <h1>Sign in</h1>
          </div>
          <div className="loginFormItemUser">
            <h2>{t('account')} Email</h2>
            <CssTextField
              required
              type="email"
              id="input-email"
              placeholder={t('inputAccount')}
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
            <h2>{t('password')} Password</h2>
            <CssTextField
              required
              type="password"
              id="input-password"
              placeholder={t('inputPassword')}
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
                ? props.toast.loading(t('logining'), { id: "loading" })
                : props.toast.remove("loading")}
              {isError ? props.toast.error(t('accountOrPasswordIncorrect')) : null}
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
