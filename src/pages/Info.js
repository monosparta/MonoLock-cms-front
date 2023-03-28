import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import _ from "lodash";
import "./Info.css";
import { userInfo, userInfoNoLoading, selectUser, clearState, clearMsg } from "../redux/userSlice";
import { selectLock, lockStatus, lockStatusNoLoading } from "../redux/lockSlice";
import UserRecord from "../components/UserRecord";
import Readmode from "../components/Readmode";
import InfoForm from "../components/InfoForm";
import Adduser from "../components/Adduser";
import UserInfoTitle from "../components/UserInfoTitle";
import toast, { Toaster } from "react-hot-toast";
import {
  CancelIconStyle,
  CheckCircleIconStyle,
  AccessTimeFilledIconStyle,
} from "../components/IconStyle";
import UserRecordSkeleton from "../components/UserRecordSkeleton";

import { Grid } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import Skeleton from "@mui/material/Skeleton";
import { useTranslation } from 'react-i18next';

const Info = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [luckIconStatus, setLuckIconStatus] = React.useState(null);
  const [userStatus, setUserStatus] = React.useState(null);
  const [error, setError] = React.useState(false);

  const { user, records, isFetching, isError, isSuccess, errorMessage } =
    useSelector(selectUser);
  const { lockList, lockIsFetching } = useSelector(selectLock);
  if (isError) {
    toast.error(errorMessage);
  } else {
    toast.remove("loading");
  }
  useEffect(() => {
    dispatch(clearState());
    dispatch(clearMsg());
    dispatch(userInfo(location.state));
    const state = _.find(lockList, (item) => item.lockerNo === location.state);
    if (state) {
      setLuckIconStatus(state.lockUp);
      setError(state.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userStatus]);

  useEffect(() => {
    const state = _.find(lockList, (item) => item.lockerNo === location.state);
    if (state) {
      setLuckIconStatus(state.lockUp);
      setError(state.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lockList]);

  useEffect(() => {
    dispatch(lockStatus());
    dispatch(userInfo(location.state));
    let refresh = setInterval(() => {
      dispatch(lockStatusNoLoading());
      dispatch(userInfoNoLoading(location.state));
    }, 30000);
    return () => clearInterval(refresh);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    navigate("/");
  };

  const handleClickRefresh = () => {
    dispatch(userInfo(location.state));
  };

  const selectFormMode = () => {
    if (userStatus === "AddStatus" || userStatus === "EditStatus" || userStatus === 'LinkStatus') {
      return <InfoForm setUserStatus={setUserStatus} userStatus={userStatus} />;
    }
    else if (user.id === undefined) {
      return <Adduser setUserStatus={setUserStatus} />;
    } else {
      return <Readmode setUserStatus={setUserStatus} />;
    }
  };


  const selectIconStyle = () => {
    if (error) {
      return <CancelIconStyle />;
    } else if (user.id !== undefined) {
      return <CheckCircleIconStyle />
    } else {
      return <AccessTimeFilledIconStyle />
    }
  };

  useEffect(() => {
    if (isError) {
      dispatch(clearState());
    }
    if (isFetching) {
      dispatch(clearState());
    }
    if (isSuccess) {
      dispatch(clearState());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess]);

  return (
    <div id="Info">
      <Toaster />
      <div className="previousPage">
        <button className="previousPageButton" onClick={handleClick}>
          <img src="./chevron.png" alt="" />
        </button>
      </div>

      <div className="userInfoSection">
        <Grid container spacing={2} sx={{ padding: "2vh 0" }}>
          <Grid item xs={12} sm={5} md={4}>
            <div className="userInfoContainer">
              <UserInfoTitle
                luckIconStatus={luckIconStatus}
                setUserStatus={setUserStatus}
                user={user}
                handleClickRefresh={handleClickRefresh}
              />
              <div className="userInfoLockState">
                {lockIsFetching ? (
                  <Skeleton
                    animation="wave"
                    sx={{
                      width: "50%",
                      height: "24px",
                      marginLeft: `${24 + 15}px`,
                      display: "flex",
                      alignItems: "center",
                    }}
                  />
                ) : selectIconStyle()}
              </div>
              <div className="userInfoMode">{lockIsFetching ? "" : selectFormMode()}</div>
            </div>
          </Grid>

          <Grid item xs={12} sm={7} md={8}>
            <div className="userRecordSection">
              <p className="userRecordTitle">
                <span>{t('operationRecord')}</span>
                <RefreshIcon
                  sx={{ cursor: "pointer", height: "20px" }}
                  onClick={handleClickRefresh}
                />
              </p>

              <div className="userRecord">
                {isFetching ? (
                  <UserRecordSkeleton />
                ) : (
                  <UserRecord records={records} />
                )}
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Info;
