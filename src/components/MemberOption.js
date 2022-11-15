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
        size="small"
        sx={{
          background: "#2F384F",
          color: "#fff",
          boxShadow: "none",
          borderRadius: "10px",
          padding: { xs: "4px", sm: "4px 16px" },
          fontSize: { xs: 8, sm: 14 },
          whiteSpace: { xs: "break-spaces", md: "no-wrap" },
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
