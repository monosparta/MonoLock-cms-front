import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Skeleton from "@mui/material/Skeleton";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, userAdd, userUpdate, userList } from "../redux/userSlice";
import { lockUpdateUserId } from "../redux/lockSlice";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import "./InfoForm.css";
import { useTranslation } from "react-i18next";
import Autocomplete from "@mui/material/Autocomplete";

let parentMemberData = []; //會員系統獲取之資料

const InfoForm = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  const { user, updating } = useSelector(selectUser);
  const [inputName, setInputName] = React.useState(user.name || "");
  const [inputCard, setInputCard] = React.useState(user.cardId || "");
  const [inputPhone, setInputPhone] = React.useState(user.phone || "");
  const [inputEmail, setInputEmail] = React.useState(user.mail || "");
  const [inputId, setInputId] = React.useState(user.id || 0);
  const [errorName, setErrorName] = React.useState(false);
  const [errorCard, setErrorCard] = React.useState(false);
  const [errorPhone, setErrorPhone] = React.useState(false);
  const [errorEmail, setErrorEmail] = React.useState(false);
  const [colorName, setColorName] = React.useState("gray");
  const [colorCard, setColorCard] = React.useState("gray");
  const [colorPhone, setColorPhone] = React.useState("gray");
  const [colorEmail, setColorEmail] = React.useState("gray");
  const [helperName, setHelperName] = React.useState(false);
  const [helperCard, setHelperCard] = React.useState(false);
  const [helperPhone, setHelperPhone] = React.useState(false);
  const [helperEmail, setHelperEmail] = React.useState(false);
  const { list } = useSelector(selectUser);
  const emailRule =
    /^[\w!#$%&'*+/=?^_`{|}~-]+(\.[\w!#$%&'*+/=?^`{|}~-]+)*@[\w-]{1,63}(\.[\w-]{1,63})+$/;
  const phoneRule = "^(09)[0-9]{8}$";
  const globalPhoneRule = "^(886)[0-9]{9}$";
  const handleLeave = () => {
    props.setUserStatus("");
  };
  let InfoData = {
    id: user.id,
    name: inputName,
    email: inputEmail,
    phone: inputPhone,
    cardId: inputCard,
  };

  let AddData = {
    lockerNo: location.state,
    name: inputName,
    email: inputEmail,
    phone: inputPhone,
    cardId: inputCard,
  };

  let LinkData = {
    userId: inputId,
    lockNo: location.state,
  };

  const verifyName = (e) => {
    if (e.target.value.length <= 0) {
      setErrorName(true);
      console.log(errorName, 777);
      setColorName("#d32f2f");
      setHelperName(t("mustEnorCh"));
    } else {
      setErrorName(false);
      setColorName("gray");
      setHelperName(false);
    }
  };
  const verifyCard = (e) => {
    if (e.target.value.length <= 6 || e.target.value.length >= 16) {
      setErrorCard(true);
      setColorCard("#d32f2f");
      setHelperCard(t("cardNumberFormatDoesNotMatch"));
    } else {
      setErrorCard(false);
      setColorCard("gray");
      setHelperCard(false);
    }
  };

  const verifyPhone = (e) => {
    if (
      e.target.value.length <= 0 ||
      (e.target.value.startsWith("09") &&
        e.target.value.search(phoneRule) === -1) ||
      (e.target.value.startsWith("8869") &&
        e.target.value.search(globalPhoneRule) === -1) ||
      !(e.target.value.startsWith("8869") || e.target.value.startsWith("09"))
    ) {
      setErrorPhone(true);
      setColorPhone("#d32f2f");
      setHelperPhone(t("phoneNumberFormatDoesNotMatch"));
    } else {
      setErrorPhone(false);
      setColorPhone("gray");
      setHelperPhone(false);
    }
  };

  const verifyEmail = (e) => {
    if (e.target.value.search(emailRule) === -1 || e.target.value.length <= 0) {
      setErrorEmail(true);
      setColorEmail("#d32f2f");
      setHelperEmail(t("emailFormatDoesNotMatch"));
    } else {
      setErrorEmail(false);
      setColorEmail("gray");
      setHelperEmail(false);
    }
  };

  const handleSave = () => {
    let invalidName = false;
    let invalidCard = false;
    let invalidEmail = false;
    let invalidPhone = false;
    if (inputName.length <= 0) {
      invalidName = !errorName;
      setColorName("#d32f2f");
      setHelperName(t("mustEnorCh"));
    }
    if (inputPhone === undefined) {
      invalidPhone = !errorPhone;
      setColorPhone("#d32f2f");
      setHelperPhone(t("cardNumberFormatDoesNotMatch"));
    }
    if (inputCard === undefined) {
      invalidCard = !errorCard;
      setColorCard("#d32f2f");
      setHelperCard(t("phoneNumberFormatDoesNotMatch"));
    }
    if (inputEmail === undefined) {
      invalidEmail = !errorEmail;
      setColorEmail("#d32f2f");
      setHelperEmail(t("emailFormatDoesNotMatch"));
    }
    if (
      invalidName === false &&
      invalidCard === false &&
      invalidPhone === false &&
      invalidEmail === false &&
      inputName !== undefined &&
      inputCard !== undefined &&
      inputPhone !== undefined &&
      inputEmail !== undefined
    ) {
      switch (props.userStatus) {
        case "AddStatus":
          dispatch(userAdd(AddData));
          props.setUserStatus("");
          break;
        case "EditStatus":
          dispatch(userUpdate(InfoData));
          props.setUserStatus("");
          break;
        case "LinkStatus":
          dispatch(lockUpdateUserId(LinkData));
          props.setUserStatus("");
          break;
        default:
          props.setUserStatus("");
          return true;
      }
    } else {
      alert("請輸入正確資訊");
    }
  };

  function handleChange(e, value) {
    if (value) {
      const data = value.data;
      setErrorName(false);
      setInputName(data.name);
      setInputCard("");
      setInputPhone(data.mobile || data.phone);
      setInputId(data.id);
      setErrorPhone(false);
      setColorPhone("gray");
      setHelperPhone(false);
      setErrorCard(false);
      setColorCard("gray");
      setHelperCard(false);
      setErrorEmail(false);
      setColorEmail("gray");
      setHelperEmail(false);
    } else {
      setInputEmail("");
      setInputCard("");
      setInputPhone("");
      setInputId(0);
    }
  }

  useEffect(() => {
    (async () => {
      await window.parent.postMessage(true, "*");
      await window.addEventListener("message", async (e) => {
        if (Array.isArray(e.data)) {
          parentMemberData = e.data;
        }
      });
    })();
  }, []);

  let parentMemberOption = null;
  if (parentMemberData !== []) {
    parentMemberOption = parentMemberData.map((data) => {
      return {
        label: data.email,
        data: data,
      };
    });
  }

  useEffect(() => {
    dispatch(userList({ has_lock: 0 }));
  }, [dispatch]);

  return (
    <div>
      <div className="userInfo mail">
        <MailOutlineIcon style={{ fontSize: "30", margin: "8px 0" }} />
        {updating ? (
          <Box
            sx={{
              display: "flex",
              width: "60px",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ width: 10 }}>
              <Skeleton animation="wave" />
            </Box>
            <Box sx={{ width: 10 }}>
              <Skeleton animation="wave" />
            </Box>
            <Box sx={{ width: 10 }}>
              <Skeleton animation="wave" />
            </Box>
          </Box>
        ) : props.userStatus === "LinkStatus" ? (
          <ComboBox data={list} handleChange={handleChange} />
        ) : (
          <Autocomplete
            freeSolo
            onInputChange={(e, value) => {
              setInputEmail(value);
            }}
            onChange={(e, value) => {
              handleChange(e, value);
            }}
            disablePortal
            id="combo-box-demo"
            options={parentMemberOption ? parentMemberOption : null}
            sx={{
              width: "100%",
              margin: "6px",
              borderColor: { colorEmail }, //FIELD 框
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t("mail")}
                onBlur={(e) => {
                  verifyEmail(e);
                }}
                size="small"
                helperText={helperEmail}
              />
            )}
          />
        )}
      </div>
      <div className="userInfo name">
        <AccountCircleIcon style={{ fontSize: "30", margin: "8px 0" }} />
        {updating ? (
          <Skeleton animation="wave" width={"80%"} sx={{ marginLeft: 1 }} />
        ) : (
          <TextField
            size="small"
            error={errorName}
            value={inputName}
            onBlur={(e) => {
              verifyName(e);
            }}
            onChange={(e) => {
              setInputName(
                e.target.value.replace(/[^a-zA-Z\u4e00-\u9fa5\s]/g, "")
              );
              setErrorName(false);
            }}
            InputLabelProps={{ style: { color: colorName } }}
            sx={{
              width: "100%",
              margin: "6px",
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: { colorName }, //FIELD 框
                },
              },
            }}
            label={t("name")}
            autoComplete="current-password"
            inputProps={{
              style: {},
              readOnly: props.userStatus === "LinkStatus" ? true : false,
            }}
            helperText={helperName}
          ></TextField>
        )}
      </div>
      <div className="userInfo card">
        <CreditCardIcon style={{ fontSize: "30", margin: "8px 0" }} />
        {updating ? (
          <Skeleton animation="wave" width={"60%"} sx={{ marginLeft: 1 }} />
        ) : (
          <TextField
            size="small"
            error={errorCard}
            value={inputCard}
            onBlur={(e) => {
              verifyCard(e);
            }}
            onChange={(e) => {
              setInputCard(e.target.value.replace(/\D/g, ""));
              setErrorCard(false);
            }}
            InputLabelProps={{ style: { color: colorCard } }}
            sx={{
              width: "100%",
              margin: "6px",
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: { colorCard },

                  //FIELD 框
                },
              },
            }}
            label={t("cardId")}
            autoComplete="current-password"
            inputProps={{
              style: {},
              //   readOnly: props.userStatus === 'LinkStatus' ? true : false,
            }}
            helperText={helperCard}
          ></TextField>
        )}
      </div>
      <div className="userInfo phone">
        <PhoneAndroidIcon style={{ fontSize: "30", margin: "8px 0" }} />
        {updating ? (
          <Skeleton animation="wave" width={"40%"} sx={{ marginLeft: 1 }} />
        ) : (
          <TextField
            size="small"
            error={errorPhone}
            value={inputPhone}
            onBlur={(e) => {
              verifyPhone(e);
            }}
            onChange={(e) => {
              setInputPhone(e.target.value.replace(/[^\d.]/g, ""));
              setErrorPhone(false);
            }}
            InputLabelProps={{ style: { color: colorPhone } }}
            sx={{
              width: "100%",
              margin: "6px",
              "& .MuiInputLabel-root": {},
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: { colorPhone }, //FIELD 框
                },
              },
            }}
            label={t("phone")}
            autoComplete="current-password"
            inputProps={{
              style: {},
              readOnly: props.userStatus === "LinkStatus" ? true : false,
            }}
            helperText={helperPhone}
          ></TextField>
        )}
      </div>

      <div className="save-btn">
        <Button
          onClick={handleSave}
          variant="contained"
          style={{
            width: "41%",
            height: 39,
            background: "#363F4E",
            boxShadow: "none",
            fontSize: 18,
            margin: 5,
          }}
        >
          {t("save")}
        </Button>

        <Button
          onClick={handleLeave}
          variant="contained"
          style={{
            width: "41%",
            height: 39,
            background: "#363F4E",
            boxShadow: "none",
            fontSize: 18,
            margin: 5,
          }}
        >
          {t("cancel")}
        </Button>
      </div>
    </div>
  );
};

export default InfoForm;
const ComboBox = (props) => {
  const { t } = useTranslation();

  const option = props.data.map((data) => {
    return {
      label: data.mail,
      data: data,
    };
  });

  return (
    <Autocomplete
      onChange={(e, value) => {
        props.handleChange(e, value);
      }}
      disablePortal
      id="combo-box-demo"
      options={option}
      sx={{
        width: "100%",
        borderColor: "#000",
        margin: "6px",
      }}
      renderInput={(params) => (
        <TextField {...params} label={t("addMemberInfo")} size="small" />
      )}
    />
  );
};
