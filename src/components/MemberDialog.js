import React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Collapse from "@mui/material/Collapse";
import CheckIcon from "@mui/icons-material/Check";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteAdmin, updateAdmin } from "../redux/adminSlice";
import { useTranslation } from 'react-i18next';

const MemberDialog = (props) => {
  const [errorPassword, setErrorPassword] = React.useState(false);
  const [errorMail, setErrorMail] = React.useState(false)
  const [errorName, setErrorName] = React.useState(false)
  const [inputNewPassword, setInputNewPassword] = React.useState("");
  const [inputCheckNewPassword, setInputCheckNewPassword] = React.useState("");
  const [inputName, setInputName] = React.useState('')
  const [inputMail, setInputMail] = React.useState('')
  const [helperText, setHelperText] = React.useState("");
  const { t } = useTranslation();
  const mailRule = /^[\w!#$%&'*+/=?^_`{|}~-]+(\.[\w!#$%&'*+/=?^`{|}~-]+)*@[\w-]{1,63}(\.[\w-]{1,63})+$/;

  const dispatch = useDispatch();

  if (props.checkAction === "edit") {
    props.setCheckAction("");
    props.setAlertText(t('edit'));
  } else if (props.checkAction === "delete") {
    props.setCheckAction("");
    props.setAlertText(t('deleteUser'));
    props.setCheckOpen(false);
    props.setOpen(true);
  }

  const handelDelete = () => {
    if (props.alertText === t('deleteUser')) {
      dispatch(deleteAdmin(props.rowId));
      props.setRefresh(!props.refresh);
    } else if (props.alertText === t('edit')) {
      dispatch(
        updateAdmin({
          id: props.rowId,
          password: inputNewPassword,
          confirm: inputCheckNewPassword,
          name: inputName,
          mail: inputMail
        })
      );

      setInputCheckNewPassword("");
      setInputNewPassword("");
      props.setRefresh(!props.refresh);
    }
  };

  React.useEffect(() => {
    setInputName(props.row.name)
    setInputMail(props.row.mail)
  }, [props.row])

  return (
    <>
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
        <Collapse in={props.alertOpen}>
          <Alert
            icon={<CheckIcon fontSize="inherit" />}
            variant="filled"
            severity="info"
          >
            {props.alertText}{t('success')}
          </Alert>
        </Collapse>
      </Stack>
      <Dialog
        open={props.checkOpen}
        onClose={() => props.setCheckOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          display: "flex",
          flexDirection: "column",
          m: "auto",
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: 440,
              height: 450, // Set your width here
            },
            "& .MuiOutlinedInput-root": {
              margin: "10px auto",
              width: "60%",
              height: 45, // Set your width here
            },
            "& .MuiDialogContent-root ": {
              padding: 0,
            },
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: "center" }}>
          {t('edit')}
        </DialogTitle>
        <div className="diacontent">
          <DialogContent sx={{ m: "0 auto" }}>
            <TextField
              error={errorName}
              value={inputName}
              onChange={(e) =>
                setInputName(
                  e.target.value.replace(/[^\w!#$%&'*+-/=?^`{|}~@]|_/gi, "")
                )
              }
              required
              type="name"
              id="input-name"
              placeholder={t('name')}
              sx={{ width: "100%" }}
              inputProps={{
                style: {
                  height: "14px",
                },
              }}
            />
            <TextField
              error={errorMail}
              value={inputMail}
              onChange={(e) =>
                setInputMail(
                  e.target.value.replace(/[^\w!#$%&'*+-/=?^`{|}~@]|_/gi, "")
                )
              }
              required
              type="mail"
              id="input-mail"
              placeholder={t('mail')}
              sx={{ width: "100%" }}
              inputProps={{
                style: {
                  height: "14px",
                },
              }}
            />
            <TextField
              error={errorPassword}
              value={inputNewPassword}
              onChange={(e) =>
                setInputNewPassword(
                  e.target.value.replace(/["'˙<>;().!#$%&*+\-/=?^_`{|}~@]/g, "")
                )
              }
              required
              type="password"
              id="input-password"
              placeholder={t('inputNewPassword')}
              sx={{ width: "100%" }}
              inputProps={{
                style: {
                  height: "14px",
                },
              }}
            />
            <TextField
              error={errorPassword}
              value={inputCheckNewPassword}
              onChange={(e) =>
                setInputCheckNewPassword(
                  e.target.value.replace(/["'˙<>;().!#$%&*+\-/=?^_`{|}~@]/g, "")
                )
              }
              required
              type="password"
              id="input-newpassword"
              placeholder={t('confirmNewPassword')}
              helperText={helperText}
              sx={{ width: "100%" }}
              inputProps={{
                style: {
                  height: "14px",
                },
              }}
            />
          </DialogContent>
        </div>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            onClick={() => {
              if (inputMail.search(mailRule) === -1) {
                setErrorMail(true)
                setHelperText(t('emailFormatDoesNotMatch'))
              }
              else if (inputName.length <= 0 || inputMail.length <= 0 || inputNewPassword.length <= 0 || inputCheckNewPassword.length <= 0) {
                setErrorMail(true)
                setErrorName(true)
                setErrorPassword(true)
                setHelperText(t('fieldNotNull'))
              }
              else if (inputCheckNewPassword !== inputNewPassword) {
                setErrorPassword(true)
                setHelperText(t('comparePassword'))
              } else {
                props.setOpen(true)
                props.setCheckOpen(false)
                setErrorPassword(false)
                setErrorMail(false)
                setErrorName(false)
                setHelperText('')
              }
            }}
            style={{
              width: 108,
              height: 36,
              background: "#2F384F",
              boxShadow: "none",
              fontSize: 12,
              margin: 5,
            }}
          >
            {t('submit')}
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              props.setCheckOpen(false);
              setInputCheckNewPassword("");
              setInputNewPassword("");
              setErrorPassword(false);
              setErrorMail(false)
              setErrorName(false)
              setHelperText("");
            }}
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
            {t('cancel')}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={props.open}
        onClose={() => props.setOpen(false)}
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
          id="dialog-title"
          sx={{
            textAlign: "center",
            padding: "16px 24px 0 24px",
          }}
        >
          <div className="alert">
            <img src="./alert.png" alt="" className="alert" />
            <p>{t('sure')}{props.alertText}？</p>
          </div>
        </DialogTitle>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              console.log('click')
              props.setOpen(false);
              handelDelete();
              props.handleModify();
            }}
            style={{
              width: 108,
              height: 36,
              background: "#2F384F",
              boxShadow: "none",
              fontSize: 12,
              margin: 5,
            }}
          >
            {t('confirm')}
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              props.setOpen(false);
            }}
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
            {t('cancel')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MemberDialog;
