import React from "react";
import { selectLock } from "../redux/lockSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Item from "./Lock";
import _ from "lodash";

import { Box, Skeleton, Tooltip } from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import { useTranslation } from 'react-i18next';

const LockContent = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { lockIsFetching, lockList } = useSelector(selectLock);

  const handleClick = (e) => {
    if (e.currentTarget.innerText)
      navigate("/Info?No=" + e.currentTarget.innerText, { state: e.currentTarget.innerText });
  };

  const handleClickStop = (e) => {
    e.preventDefault();
  };

  let loadingArray = new Array(42);

  return (
    <>
      {lockIsFetching ? (
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
          {_.map(loadingArray, (item, index) => (
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
            {_.map(lockList, (item, index) => (
              <Item
                key={index}
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
                        ? "none"
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
                  <Tooltip title={t('locked')} placement="top">
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
                  <Tooltip title={t('unlocked')} placement="top">
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
        </div>
      )}
    </>
  );
};

export default LockContent;
