import React from "react";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import MenuIcon from '@mui/icons-material/Menu';
import { selectUser } from "../redux/userSlice";
import { useSelector } from "react-redux";
import Skeleton from "@mui/material/Skeleton";
import { useTranslation } from "react-i18next";
const Adduser = (props) => {
  const { isFetching } = useSelector(selectUser);
  const { t } = useTranslation();

  const handleAdd = (status) => {
    switch (status) {
      case 'add':
        props.setUserStatus("AddStatus");
        break
      case 'link':
        props.setUserStatus('LinkStatus')
        break
      default:
    }

  };

  return (
    <div>
      <div className="add-btn">
        {isFetching ? (
          <Skeleton animation="wave" width={"50%"} sx={{ marginLeft: 1 }} />
        ) : (
          <Button
            onClick={() => handleAdd('add')}
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
      <div className="add-btn">
        {isFetching ? (
          <Skeleton animation="wave" width={"50%"} sx={{ marginLeft: 1 }} />
        ) : (
          <Button
            onClick={() => handleAdd('link')}
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
            startIcon={<MenuIcon />}
          >
            {t('bindExistingMembers')}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Adduser;
