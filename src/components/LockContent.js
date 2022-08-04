import React from "react";
import { selectLock } from "../redux/lockSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Item from "./Lock";
import _ from "lodash";

import { Box, Skeleton, Tooltip } from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import { useTranslation } from "react-i18next";

const LockContent = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { lockIsFetching, lockList } = useSelector(selectLock);

  const handleClick = (e) => {
    if (e.currentTarget.innerText)
      navigate("/Info?No=" + e.currentTarget.innerText, {
        state: e.currentTarget.innerText,
      });
  };

  const handleClickStop = (e) => {
    e.preventDefault();
  };

  let loadingArray = new Array(42);

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, auto)" }}>
      {lockIsFetching
        ? _.map(loadingArray, (item, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              width="8vw"
              height="8vw"
              sx={{
                width: "8vw",
                height: "8vw",
                minWidth: "30px",
                minHeight: "30px",
                maxWidth: "80px",
                maxHeight: "80px",
                margin: "5px 5px 5px 5px",
                borderRadius: "12%",
                padding: "1px",
              }}
            />
          ))
        : _.map(lockList, (item) => (
            <Item
              key={item.id}
              onClickCapture={
                item.lockerNo !== null
                  ? (e) => handleClick(e)
                  : () => handleClickStop
              }
              sx={{
                cursor: item.lockerNo !== null ? "pointer" : "",
                position: "relative",
                background:
                  item.error === 1
                    ? "#FF5A5A"
                    : item.userId !== null
                    ? "#363F4E"
                    : "#FFFFFF",
                color:
                  item.error !== 1
                    ? item.userId !== null
                      ? "#FFFFFF"
                      : "#000000"
                    : "#FFFFFF",
                border:
                  item.error !== 1
                    ? item.userId !== null
                      ? "1px solid #000"
                      : item.lockerNo === null
                      ? "1px dashed"
                      : "1px solid #000"
                    : item.userId !== null
                    ? "none"
                    : "#363F4E",
              }}
            >
              {item.lockerNo}
              {item.userId !== null && item.lockUp === 1 ? (
                <Tooltip title={t("locked")} placement="top">
                  <LockIcon
                    sx={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      height: "20%",
                      width: "20%",
                    }}
                  />
                </Tooltip>
              ) : (
                ""
              )}
              {item.userId !== null && item.lockUp === 0 ? (
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
            </Item>
          ))}
    </Box>
  );
};

export default LockContent;
