import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, styled } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addAdmin, selectAdmin, clearState } from "../redux/adminSlice";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from 'react-i18next';

const RegisterForm = (props) => {
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess, isError } = useSelector(selectAdmin);
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

  const onSubmit = (data) => {
    dispatch(addAdmin(data));
  };

  useEffect(() => {
    if (isError) {
      dispatch(clearState());
    }
    if (isSuccess) {
      toast.success(t("addSuccess"));
      dispatch(clearState());
      setTimeout(() => {
        navigate("/memberlist");
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess]);

  return (
    <>
      <Toaster />
      <form className="registerForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="registerFormItem">
          <div className="registerFormItemTitle">
            <h1>Sign up</h1>
          </div>
          <div className="registerFormItemUser">
            <h2>{t("userName")}</h2>
            <CssTextField
              type="text"
              id="input-text"
              placeholder={t("inputUserName")}
              sx={{ width: "100%" }}
              inputProps={{
                style: {
                  height: "14px",
                },
              }}
              {...register("name")}
            />
          </div>
          <div className="registerFormItemEmail">
            <h2>{t("account")}</h2>
            <CssTextField
              type="email"
              id="input-email"
              placeholder={t("inputAccount")}
              sx={{ width: "100%" }}
              inputProps={{
                style: {
                  height: "14px",
                },
              }}
              {...register("mail")}
            />
          </div>
          <div className="registerFormItemPassword">
            <h2>{t("password")}</h2>
            <CssTextField
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
          <div className="registerFormItemConfirm">
            <h2>{t("confirmPassword")}</h2>
            <CssTextField
              type="password"
              id="input-confirm"
              placeholder={t("inputConfirmPassword")}
              sx={{ width: "100%", borderColor: "#000" }}
              inputProps={{
                style: {
                  height: "14px",
                },
              }}
              {...register("confirm")}
            />
          </div>
          <div className="registerFormItemButton">
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
              {t("addAdmin")}
            </Button>
            <span>{isError ? toast.error(t("addFailed")) : null}</span>
          </div>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
