import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import "./MemberList.css";
import MemberDialog from "../components/MemberDialog";
import MemberListDataGrid from "../components/MemberListDataGrid";
import { useDispatch, useSelector } from "react-redux";
import { selectAdmin, getAdminList, clearState } from "../redux/adminSlice";
import { userList, selectUser, clearState as userClearState } from "../redux/userSlice"
import MemberOption from "../components/MemberOption";
import { useTranslation } from 'react-i18next';

const MemberList = () => {
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [checkOpen, setCheckOpen] = React.useState(false);
  const [checkAction, setCheckAction] = React.useState("");
  const [alertText, setAlertText] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [userRows, setUserRows] = React.useState([])
  const [rowId, setRowId] = React.useState("");
  const [row, setRow] = React.useState({ name: '', mail: '' })
  const [refresh, setRefresh] = React.useState(false);
  const { t } = useTranslation();

  const dispatch = useDispatch();


  const { adminList, isFetching, isError, isSuccess } =
    useSelector(selectAdmin);
  const { list, isError: userIsError, isFetching: userIsFetching, isSuccess: userIsSuccess } = useSelector(selectUser)

  const handleModify = () => {
    setCheckOpen(false);
    setAlertOpen(true);
    setTimeout(() => {
      setAlertOpen(false);
    }, 3000);
  };

  useEffect(() => {
    if (isError) dispatch(clearState());
    if (isFetching) dispatch(clearState())
    if (isSuccess) {
      setRows(adminList)
      dispatch(clearState())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching, isSuccess]);

  useEffect(() => {
    if (userIsError) dispatch(userClearState())
    if (userIsFetching) dispatch(userClearState())
    if (userIsSuccess) {
      const listWithLockNo = list.map((user, index) => {
        if (user.locker !== null)
          return { ...user, lockerNo: user.locker.lockerNo }
        return user
      })
      setUserRows(listWithLockNo)
      dispatch(userClearState())
    }
  }, [userIsFetching, userIsSuccess])

  useEffect(() => {
    dispatch(getAdminList())
    dispatch(userList({ has_lock: null }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  useEffect(() => {
    const user = rows.find(user => {
      if (user.id === rowId) return user
    })
    if (!user)
      return
    setRow(user)
  }, [rowId])
  const columns = (prop) => (prop ? [
    {
      field: "name",
      headerName: t('userName'),
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: "mail",
      headerName: t('mail'),
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
    }, {
      field: "lockerNo",
      headerName: t('lockerNo'),
      flex: 1,
      disableColumnMenu: false,
      sortable: true,
    },
    {
      field: "button",
      headerName: "",
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <MemberOption
            setRowId={setRowId}
            id={params.id}
            setAlertOpen={setAlertOpen}
            setCheckOpen={setCheckOpen}
            setCheckAction={setCheckAction}
            isUser={prop}
          />
        );
      },
    },
  ] : [
    {
      field: "name",
      headerName: t('userName'),
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: "mail",
      headerName: t('mail'),
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: "button",
      headerName: "",
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <MemberOption
            setRowId={setRowId}
            id={params.id}
            setAlertOpen={setAlertOpen}
            setCheckOpen={setCheckOpen}
            setCheckAction={setCheckAction}
            isUser={prop}
          />
        );
      },
    },
  ])
  return (
    <div id="memberList">
      <MemberDialog
        refresh={refresh}
        setRefresh={setRefresh}
        rowId={rowId}
        row={row}
        setCheckOpen={setCheckOpen}
        checkOpen={checkOpen}
        handleModify={handleModify}
        checkAction={checkAction}
        setAlertText={setAlertText}
        alertText={alertText}
        alertOpen={alertOpen}
        open={open}
        setOpen={setOpen}
        setCheckAction={setCheckAction}
      />
      <div className="memberHeader">
        <p>{t('adminList')}</p>
        <div>
          <Link to="/register">
            <Button
              variant="contained"
              style={{
                border: "1px solid #2F384F",
                background: "transparent",
                color: "#2F384F",
                boxShadow: "none",
                borderRadius: "10px",
                fontSize: { xs: 10, md: 16 },
                textAlign: "left",
                textDecoration: "none",
              }}
            >
              {t('addAdmin')}
            </Button>
          </Link>
        </div>
      </div>
      <div className="memberList">
        <Box sx={{ width: "100%" }}>
          <MemberListDataGrid adminList={rows} columns={columns()} />
        </Box>
      </div>
      <div className="memberHeader">
        <p>{t('userList')}</p>

      </div>
      <div className="memberList">
        <Box sx={{ width: "100%" }}>
          <MemberListDataGrid adminList={userRows} columns={columns(true)} />
        </Box>
      </div>
    </div>
  );
};

export default MemberList;
