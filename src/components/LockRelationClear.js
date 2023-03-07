import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import { lockUpdateUserId } from "../redux/lockSlice";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CheckIcon from "@mui/icons-material/Check";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";


const LockRelationClear = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const location = useLocation();
  const [checkOpen, setCheckOpen] = React.useState(false);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const { user, userClear } = useSelector(selectUser);

  const handleClearRelation = () => {
    dispatch(lockUpdateUserId({ lockNo: location.state, userId: null }));
    setCheckOpen(false);
    setAlertOpen(true);
    props.handleClickRefresh();
    setTimeout(() => {
      setAlertOpen(false);

    }, 3000);
  };

  const handleCheckOpen = () => {
    setCheckOpen(true);
  };
  const handleCheckClose = () => {
    setCheckOpen(false);
  };
  return (
    <div className="lockRelationClear">
      {user.id ? (
        <DeleteSweepIcon
          onClick={handleCheckOpen}
          sx={{
            height: "20px",
            width: "20px",
            cursor: "pointer",
          }}
        />
      ) : null}

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
            <p>{t("sureDeleteMember")}</p>
          </div>
        </DialogTitle>
        <DialogActions sx={{ width: 244 }}>
          <Button
            variant="contained"
            onClick={handleClearRelation}
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
        <Collapse in={alertOpen}>
          <Alert
            icon={<CheckIcon fontSize="inherit" />}
            variant="filled"
            severity="error"
          >
            {t("deleted")}
          </Alert>
        </Collapse>
      </Stack>
    </div>
  );
};

export default LockRelationClear;
