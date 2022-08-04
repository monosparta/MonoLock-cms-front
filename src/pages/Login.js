import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { login, clearState, selectUser } from "../redux/userSlice";
import { useTranslation } from 'react-i18next';

import "./Login.css";
import LoginForm from "../components/LoginForm";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { isFetching, isSuccess, isError } = useSelector(selectUser);

  const onSubmit = (data) => {
    if (data.email === null || data.password === null) {
      toast.error(t('accountOrPasswordIncorrect'));
    }
    dispatch(login(data));
  };

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isError) {
      dispatch(clearState());
    }
    if (isFetching) {
      dispatch(clearState());
    }
    if (isSuccess) {
      dispatch(clearState());
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess]);

  return (
    <div id="login">
      <Toaster />
      <div className="loginBoard">
        <p className="loginBoardTitle">{t('systemName')}</p>
        <img src="./mono-l.png" alt="" className="loginBoardLogo" />
      </div>
      <div className="loginArea">
        <LoginForm onSubmit={onSubmit} toast={toast} />
      </div>
    </div>
  );
};

export default Login;
