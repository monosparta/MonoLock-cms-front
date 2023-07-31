import React, { useEffect } from "react";
import {
  Box,
  Collapse,
  TextField,
  Alert,
  Stack,
  Skeleton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
  const [alertValue, setAlertValue] = React.useState({
    show: false,
    type: "success",
    text: "",
  });
  const [checkOpen, setCheckOpen] = React.useState(false);
  const [inputDescription, setInputDescription] = React.useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const [update, setUpdate] = React.useState(false);
  const [buttonClicked, setButtonClicked] = React.useState([false, false, false]);
  const { user, isFetching, isUnlocking } = useSelector(selectUser);

  const handleEdit = () => {
    props.setUserStatus("EditStatus");
  };

  const handleButtonClick = (buttonNumber) => {
    setButtonClicked((prev) => {
      const updatedButtons = prev.map((clicked, index) => {
        if (index === buttonNumber - 1) {
          return !clicked; 
        }
        return clicked;
      });
      return updatedButtons;
    });
  
    switch (buttonNumber) {
      case 1:
        setInputDescription((prev) =>
          prev.includes(t("會員到期檢查") + "\n") ? prev.replace(t("會員到期檢查") + "\n", "") : prev + t("會員到期檢查") + "\n"
        );
        break;
      case 2:
        setInputDescription((prev) =>
          prev.includes(t("設備測試") + "\n") ? prev.replace(t("設備測試") + "\n", "") : prev + t("設備測試") + "\n"
        );
        break;
      case 3:
        setInputDescription((prev) =>
          prev.includes(t("會員忘記帶卡") + "\n") ? prev.replace(t("會員忘記帶卡") + "\n", "") : prev + t("會員忘記帶卡") + "\n"
        );
        break;
      default:
        break;
    }
  };
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setInputDescription("");
    setButtonClicked([false, false, false]); 
    setOpen(false);
  };
  
  const handleClickCheckOpen = () => {
    if (inputDescription !== "") {
      setCheckOpen(true);
      setOpen(false);
    }
  };

  const handleCheckCloseAPI = async () => {
    setCheckOpen(false);
    const a = await dispatch(
      userUnlock([{ lockerNo: location.state, description: inputDescription }])
    );
    setUpdate(true);
    dispatch(lockStatus());
    if (a.payload === 0) {
      setAlertValue({
        type: "success",
        text: t("finishForced"),
        show: true,
      });
    } else {
      setAlertValue({
        type: "error",
        text: t("failedForced"),
        show: true,
      });
    }
  };

  useEffect(() => {
    if (update) {
      dispatch(userInfo(location.state));
      setInputDescription("");
      setUpdate(false);
    }
  }, [update, dispatch, location]);

  useEffect(() => {
    if (alertValue.show) {
      setTimeout(() => {
        setAlertValue({
          ...alertValue,
          show: false,
        });
      }, 3000);
    }
  }, [alertValue]);

  const handleCheckClose = () => {
    setInputDescription("");
    setCheckOpen(false);
  };
  const buttonStyle = {
    margin: '5px',
    backgroundColor: 'white',
    color: 'black',
    border:"1px solid black"
  };

  const clickedButtonStyle = {
    margin: '5px',
    backgroundColor: 'black',
    color: 'white',
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
            width: "100%",
            height: 39,
            background: "#363f4e",
            boxShadow: "none",
            fontSize: 18,
            margin: 5,
          }}
          startIcon={<EditIcon />}
        >
          {t("edit")}
        </Button>

        <LoadingButton
          loading={isUnlocking}
          disabled={isUnlocking}
          variant="contained"
          onClick={handleClickOpen}
          style={{
            width: "100%",
            height: 39,
            background: "#FFC440",
            boxShadow: "none",
            fontSize: 18,
            margin: 5,
          }}
          startIcon={<LockOpenIcon />}
        >
          {t("forced")}
        </LoadingButton>

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
                height: 400,
              },
              "& .MuiOutlinedInput-root": {
                width: 328,
                height: 156,
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
                onChange={(e) => setInputDescription(e.target.value)}
                id="input-reason"
                placeholder={t("reminderContent")}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    display: "flex",
                    alignItems: "flex-start",
                    "&.Mui-focused fieldset": {
                      borderColor: "gray", //FIELD 框
                    },
                  },
                }}
              />
            </DialogContent>
          </div>
          <Box sx={{ justifyContent: "center",marginLeft:"100px" }}>{t("causeClick")}</Box>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button
              onClick={() => handleButtonClick(1)} 
              variant="contained"
              style={buttonClicked[0] ? clickedButtonStyle : buttonStyle}
            >
              {t("memberCheck")}
            </Button>
            <Button
              onClick={() => handleButtonClick(2)} 
              variant="contained"
              style={buttonClicked[1] ? clickedButtonStyle : buttonStyle}
            >
              {t("deviceTest")}
            </Button>
            <Button
              onClick={() => handleButtonClick(3)} 
              style={buttonClicked[2] ? clickedButtonStyle : buttonStyle}
            >
              {t("forgotCard")}
            </Button>
          </DialogActions>

          <DialogActions sx={{ width: 328 }}>
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
                height: 250,
                borderRadius: "10px",
              },
              "& .MuiOutlinedInput-root": {
                width: 244,
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
      <Stack
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
      </Stack>
    </div>
  );
};

export default Readmode;
