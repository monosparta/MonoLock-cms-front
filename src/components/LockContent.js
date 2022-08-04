import React from "react";
import { selectLock } from "../redux/lockSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Lock from "./Lock";
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
    <>
      {lockIsFetching ? (
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
          {_.map(loadingArray, (index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              width="82px"
              height="82px"
              sx={{ margin: "5px 5px 5px 5px", borderRadius: "12%" }}
            />
          ))}
        </Box>
      ) : (
        <div className="lockItem" style={{ width: " 100 %" }}>
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
            {_.map(lockList, (item, index) => {
              let lockBackGround = "#FFFFFF";
              let lockColor = "#000000";
              let lockBorder = "1px solid #000";
              if (item.userId !== null) {
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
                  key={index}
                  onClickCapture={
                    item.lockerNo !== null
                      ? (e) => handleClick(e)
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
                  {item.lockerNo}
                  {item.userId !== null && item.lockUp === 1 ? (
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
                </Lock>
              );
            })}
          </Box>
        </div>
      )}
    </>
  );
};

export default LockContent;
