import React, { useEffect, useRef } from "react";
import ExpandMore from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  Collapse,
  TextField,
  Alert,
  Stack,
  Skeleton,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  AccordionSummary,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { userUnlock, selectUser, userInfo } from "../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { lockStatus } from "../redux/lockSlice";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Readmode.css";

const Readmode = (props) => {
  const { t } = useTranslation();

  const [open, setOpen] = React.useState(false);
  const [submittedReason, setSubmittedReason] = React.useState(''); // 提交後的原因
  const [isSubmitted, setIsSubmitted] = React.useState(false); // 是否已經提交
  const [locked, setLocked] = React.useState(true);
  // const [alertValue, setAlertValue] = React.useState({
  //   show: false,
  //   type: "success",
  //   text: "",
  // });
  const [checkOpen, setCheckOpen] = React.useState(false);
  const [inputDescription, setInputDescription] = React.useState("");
  // const dispatch = useDispatch();
  // const location = useLocation();
  // const [update, setUpdate] = React.useState(false);
  const [expandedAccordionIndex, setExpandedAccordionIndex] = React.useState(-1);
  const accordionRef = useRef(null); // 步驟2：新增 useRef


  const { user, isFetching, isUnlocking } = useSelector(selectUser);

  const handleEdit = () => {
    props.setUserStatus("EditStatus");
  };

  const inputRef = useRef(null);

  const handleButtonClick = (event) => {
    const buttonText = event.target.innerText;
    const updatedInputDescription = `${inputDescription}${buttonText}\n`;
    setInputDescription(updatedInputDescription);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setInputDescription("");
    setOpen(false);
  };

  const handleClickCheckOpen = () => {
    if (inputDescription !== "") {
      setCheckOpen(true);
      setOpen(false);
    }
  };

  const handleCheckCloseAPI = () => {
    setCheckOpen(false);
    setSubmittedReason(inputDescription); // 提交後將原因保存
    setIsSubmitted(true); // 將 isSubmitted 設為 true
    setCheckOpen(false); // 提交後關閉對話框
    setInputDescription("")
    setLocked(!locked);
    alert("已解鎖");
    setSubmitCount(submitCount + 1);




    // const a = await dispatch(
    //   userUnlock([{ lockerNo: location.state, description: inputDescription }])
    // );
    // setUpdate(true);
    // dispatch(lockStatus());
    // if (a.payload === 0) {
    //   setAlertValue({
    //     type: "success",
    //     text: t("finishForced"),
    //     show: true,
    //   });
    // } else {
    //   setAlertValue({
    //     type: "error",
    //     text: t("failedForced"),
    //     show: true,
    //   });
    // }
  };

    // 操作時間
    const [currentTime, setCurrentTime] = React.useState(new Date()); 
    const [submitCount, setSubmitCount] = React.useState(0);
  

    useEffect(() => {
      // 只有在提交次數改變時才更新時間
      setCurrentTime(new Date());
    }, [submitCount]);
  
    const formattedTime = currentTime.toLocaleTimeString();




  useEffect(() => {
    if (expandedAccordionIndex !== -1 && accordionRef.current) {
      accordionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [expandedAccordionIndex]);

  const handleClickAccordion = (index) => {
    if (index === expandedAccordionIndex) {
      // 如果手風琴已經展開，則關閉它
      setExpandedAccordionIndex(-1);

    } else {
      // 如果手風琴未展開，則展開它
      setExpandedAccordionIndex(index);
    }
  };

  // useEffect(() => {
  //   if (update) {
  //     dispatch(userInfo(location.state));
  //     setInputDescription("");
  //     setUpdate(false);
  //   }
  // }, [update, dispatch, location]);

  // useEffect(() => {
  //   if (alertValue.show) {
  //     setTimeout(() => {
  //       setAlertValue({
  //         ...alertValue,
  //         show: false,
  //       });
  //     }, 3000);
  //   }
  // }, [alertValue]);

  const handleCheckClose = () => {
    setInputDescription("");
    setCheckOpen(false);
  };

  return (
    <div style={{}}>
      <div className="userInfo name">
        <AccountCircleIcon style={{ fontSize: "30", margin: "8px 0" }} />
        {isFetching ? (
          <Skeleton animation="wave" width={"50%"} sx={{ marginLeft: 1 }} />
        ) : (
          <p className="detail">{user.name}</p>
        )}
      </div>
      <div className="userInfo card">
        <CreditCardIcon style={{ fontSize: "30", margin: "8px 0" }} />
        {isFetching ? (
          <Skeleton animation="wave" width={"60%"} sx={{ marginLeft: 1 }} />
        ) : (
          <p className="detail">{user.cardId}</p>
        )}
      </div>
      <div className="userInfo phone">
        <PhoneAndroidIcon style={{ fontSize: "30", margin: "8px 0" }} />
        {isFetching ? (
          <Skeleton animation="wave" width={"40%"} sx={{ marginLeft: 1 }} />
        ) : (
          <p className="detail">{user.phone}</p>
        )}
      </div>
      <div className="userInfo mail">
        <MailOutlineIcon style={{ fontSize: "30", margin: "8px 0" }} />
        {isFetching ? (
          <Skeleton animation="wave" width={"80%"} sx={{ marginLeft: 1 }} />
        ) : (
          <p className="detail">{user.mail}</p>
        )}
      </div>
      <div className="control-btn">
        <Button
          onClick={handleEdit}
          variant="contained"
          style={{
            width: "40%",
            height: 39,
            background: "#363f4e",
            boxShadow: "none",
            fontSize: 18,
            // marginTop: 10,
            marginRight: 10,
          }}
          startIcon={<EditIcon />}
        >
          {t("edit")}
        </Button>

        {/* 強制開鎖按鈕 */}
        <LoadingButton
          loading={isUnlocking}
          disabled={isUnlocking}
          variant="contained"
          onClick={handleClickOpen}
          style={{
            width: "40%",
            height: 39,
            background: "#FFC440",
            boxShadow: "none",
            fontSize: 18,
            // marginTop: 10,
            marginRight: 10,
          }}
          startIcon={<LockOpenIcon />}
        >
          {t("forced")}
        </LoadingButton>

        {/* 強制開鎖原因介面 */}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{
            display: "flex",
            flexDirection: "column",
            m: "auto",
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                width: 440,
                height: 400, // Set your width here
              },
              "& .MuiOutlinedInput-root": {
                width: 328,
                height: 156, // Set your width here
              },
              "& .MuiDialogContent-root ": {
                padding: 0,
              },
            },
          }}
        >
          <DialogTitle id="alert-dialog-title" sx={{ textAlign: "center" }}>
            {t("forcedReason")}
          </DialogTitle>
          <div className="diacontent">
            <DialogContent sx={{ m: "0 auto", width: 328, height: 156 }}>
              <TextField
                required
                multiline
                value={inputDescription}
                onChange={(event) => setInputDescription(event.target.value)}
                id="input-reason"
                placeholder={t("reminderContent")}
                inputRef={inputRef}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    display: "flex",
                    alignItems: "flex-start",
                    "&.Mui-focused fieldset": {
                      borderColor: "gray",
                    },
                  },
                }}
              />
            </DialogContent>
          </div>
          <Typography variant="h6" sx={{ textAlign: "center" }} >{t("cause_click")}</Typography>
          {/* 選項button */}
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button
              onClick={handleButtonClick}
              variant="contained"
              style={{
                background: "#516EC5",
                width: 108,
                heow: "none",
                fontSize: 12,
                margin: 5,
              }}
            >{t("memberCheck")}</Button>
            <Button
              onClick={handleButtonClick}
              variant="contained"
              style={{
                background: "#516EC5",
                width: 108,
                heow: "none",
                fontSize: 12,
                margin: 5,
              }}>{t("deviceTest")}</Button>
            <Button
              onClick={handleButtonClick}
              variant="contained"
              style={{
                background: "#516EC5",
                width: 108,
                heow: "none",
                fontSize: 12,
                margin: 5,
              }}>{t("forgot card")}</Button>
          </DialogActions>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button
              variant="contained"
              onClick={handleClickCheckOpen}
              style={{
                width: 108,
                height: 36,
                background: "#2F384F",
                boxShadow: "none",
                fontSize: 12,
                margin: 5,
              }}
            >
              {t("submit")}
            </Button>
            <Button
              variant="contained"
              onClick={handleClose}
              style={{
                width: 108,
                height: 36,
                background: "#fff",
                color: "#2F384F",
                boxShadow: "none",
                fontSize: 12,
                margin: 5,
                border: "1px solid #2F384F",
              }}
            >
              {t("cancel")}
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={checkOpen}
          onClose={handleCheckClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{
            display: "flex",
            flexDirection: "column",
            m: "auto",
            borderRadius: "10px",
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                width: 375,
                height: 250, // Set your width here
                borderRadius: "10px",
              },
              "& .MuiOutlinedInput-root": {
                width: 244, // Set your width here
                height: 150,
              },
              "& .MuiDialogContent-root ": {
                padding: 0,
              },
              "& .MuiDialogActions-root ": {
                margin: "0 auto",
              },
            },
          }}
        >
          <DialogTitle
            id="alert-dialog-title"
            sx={{ textAlign: "center", padding: "16px 24px 0 24px" }}
          >
            <div className="alert">
              <img src="./alert.png" alt="" className="alert" />
              <p>{t("performForcedUnlocking")}</p>
            </div>
          </DialogTitle>
          <DialogActions sx={{ width: 244 }}>
            <Button
              variant="contained"
              onClick={handleCheckCloseAPI}
              style={{
                width: 108,
                height: 36,
                background: "#2F384F",
                boxShadow: "none",
                fontSize: 12,
                margin: 5,
              }}
            >
              {t("confirm")}
            </Button>
            <Button
              variant="contained"
              onClick={handleCheckClose}
              style={{
                width: 108,
                height: 36,
                background: "#fff",
                color: "#2F384F",
                boxShadow: "none",
                fontSize: 12,
                margin: 5,
                border: "1px solid #2F384F",
              }}
            >
              {t("cancel")}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      {/* <Stack
        className="success"
        sx={{
          width: "478px",
          height: "52px",
          top: "107px",
          position: "absolute",
          right: "24px",
        }}
        spacing={2}
      >
        <Collapse in={alertValue.show}>
          <Alert variant="filled" severity={alertValue.type}>
            {alertValue.text}
          </Alert>
        </Collapse>
      </Stack> */}

      {/* 將提交後的原因渲染到頁面上 */}

      {isSubmitted && (
        <Accordion
          id="accordion"
          ref={accordionRef} // 步驟4：將 ref 綁定到手風琴
          expanded={expandedAccordionIndex === 0} // 當索引為 0 時展開第一個手風琴
          onChange={() => handleClickAccordion(0)}  // 點擊時切換展開狀態
          sx={{
            width: "1000px", marginTop: "100px", backgroundColor: "rgb(112, 112, 112)"
          }}>

          <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel-content" id="panel-header">
            <Typography sx={{ fontSize: "18px" }}>{t("unlocked cause")}</Typography>
          </AccordionSummary>
          <Collapse in={expandedAccordionIndex === 0}>
            <Typography sx={{ p: 2 }}>
              root: {submittedReason} 
            </Typography>
            <span>&nbsp;&nbsp;&nbsp;操作時間:{formattedTime}</span>
          </Collapse>
        </Accordion>


      )}



    </div>

  );
};

export default Readmode;