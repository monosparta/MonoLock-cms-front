import React from "react";
import { selectLock } from "../redux/lockSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Lock from "./Lock";
import _ from "lodash";

import { Box, Skeleton, Tooltip, Typography } from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import { useTranslation } from "react-i18next";

const LockContent = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { lockIsFetching, lockList } = useSelector(selectLock);

  const handleClick = (lockerNum) => {
    // console.log('===test handleClick===', lockerNum)
    if (lockerNum)
      navigate("/Info?No=" + lockerNum, {
        state: lockerNum,
      });
  };

  const handleClickStop = (e) => {
    e.preventDefault();
  };

  let loadingArray = new Array(42);

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, auto)" }}>
      {lockIsFetching
        ? _.map(loadingArray, (index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            sx={{
              width: "12vw",
              height: "12vw",
              minWidth: "30px",
              minHeight: "30px",
              maxWidth: "120px",
              maxHeight: "120px",
              borderRadius: "12%",
              padding: "1px",
              margin: { xs: "2px", sm: "3px", md: "4px", lg: "5px" },
            }}
          />
        ))
        : _.map(lockList, (item, index) => {
          let lockBackGround = "#FFFFFF";
          let lockColor = "#000000";
          let lockBorder = "1px solid #000";
          if (item.user !== null) {
            if (item.error === 1) {
              lockBackGround = "#FF5A5A";
              lockColor = "#FFFFFF";
              lockBorder = "1px solid #363F4E";
            } else {
              lockBackGround = "#363F4E";
              lockColor = "#FFFFFF";
            }
          }
          if (item.lockerNo === null) {
            lockBorder = "1px dashed";
          }
          return (
            <Lock
              key={index + item}
              onClickCapture={
                item.lockerNo !== null
                  ? () => handleClick(item.lockerNo)
                  : () => handleClickStop
              }
              sx={{
                cursor: item.lockerNo !== null ? "pointer" : "",
                position: "relative",
                background: lockBackGround,
                color: lockColor,
                border: lockBorder,
              }}
            >
              <Typography fontFamily="Mulish" fontWeight="bold" fontSize={{ xs: "h6.fontSize", md: "h5.fontSize" }}>{item.lockerNo}</Typography>
              <Typography fontFamily="Mulish" fontSize={{ xs: "6px", md: "12px" }} >{item.lockerEncoding}</Typography>
              <Typography fontFamily="Mulish" fontWeight="bold">{item.user?.name || ''}</Typography>
              <Typography fontFamily="Mulish" fontSize={{xs: "6px", md:"12px"}}>{item.user?.cardId || ''}</Typography>
              {item.user !== null && item.lockUp === 1 ? (
                <Tooltip title={t("locked")} placement="top">
                  <LockIcon
                    sx={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      height: "16px",
                      width: "16px",
                    }}
                  />
                </Tooltip>
              ) : (
                ""
              )}
              {item.user !== null && item.lockUp === 0 ? (
                <Tooltip title={t("unlocked")} placement="top">
                  <LockOpenIcon
                    sx={{
                      position: "absolute",
                      top: "8px",
                      right: "5px",
                      height: "16px",
                      width: "16px",
                    }}
                  />
                </Tooltip>
              ) : (
                ""
              )}
            </Lock>
          );
        })}
    </Box>
  );
};

export default LockContent;
