import React from "react";
import Button from "@mui/material/Button";
import { useTranslation } from 'react-i18next';

const MemberOption = (props) => {
  const { t } = useTranslation();

  return (
    <div className="memberOption">
      <Button
        onClick={() => {
          props.setAlertOpen(false);
          props.setCheckOpen(true);
          props.setCheckAction("edit");
          props.setRowId(props.id);
        }}
        style={{
          width: 108,
          height: 36,
          background: "#2F384F",
          color: "#fff",
          boxShadow: "none",
          borderRadius: "10px",
          fontSize: 14,
          margin: 5,
        }}
      >
        {t('editPassword')}
      </Button>

      <img
        onClick={() => {
          props.setAlertOpen(false);
          props.setCheckOpen(true);
          props.setCheckAction("delete");
          props.setRowId(props.id);
        }}
        src={require("../assets/delete.png")}
        alt=""
        style={{ height: "24px", width: "24px", cursor: "pointer" }}
      ></img>
    </div>
  );
};

export default MemberOption;
