import React from "react";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import { selectUser } from "../redux/userSlice";
import { useSelector } from "react-redux";
import Skeleton from "@mui/material/Skeleton";
import { useTranslation } from "react-i18next";
const Adduser = (props) => {
  const { isFetching } = useSelector(selectUser);
  const { t } = useTranslation();

  const handleAdd = () => {
    props.setUserStatus("AddStatus");
  };

  return (
    <div className="add-btn">
      {isFetching ? (
        <Skeleton animation="wave" width={"50%"} sx={{ marginLeft: 1 }} />
      ) : (
        <Button
          onClick={handleAdd}
          variant="contained"
          style={{
            width: "100%",
            height: 39,
            background: "#363F4E",
            boxShadow: "none",
            fontSize: 18,
            margin: 5,
            fontFamily: "Roboto",
          }}
          startIcon={<EditIcon />}
        >
          {t('addMemberInfo')}
        </Button>
      )}
    </div>
  );
};

export default Adduser;
