import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLock } from "../redux/lockSlice";

import LockRelationClear from "./LockRelationClear";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import Skeleton from "@mui/material/Skeleton";
import { useTranslation } from 'react-i18next';

const UserInfoTitle = (props) => {
  const location = useLocation();
  const { lockIsFetching } = useSelector(selectLock);
  const { t } = useTranslation();

  return (
    <div className="userInfoLockNumber">
      {lockIsFetching ? (
        <Skeleton
          animation="wave"
          sx={{ width: "90%", height: "30px" }}
        />
      ) : (
        <>
          {props.luckIconStatus === 1 ? <LockIcon /> : <LockOpenIcon />}
          <h1>{t('locker')} - {location.state}</h1>

          <LockRelationClear
            setLuckIconStatus={props.setLuckIconStatus}
            setUserStatus={props.setUserStatus}
            user={props.user}
            handleClickRefresh={props.handleClickRefresh}
          />
        </>
      )}
    </div>
  );
};

export default UserInfoTitle;
