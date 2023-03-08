import React from "react";

import { DataGrid } from "@mui/x-data-grid";
const MemberListDataGrid = (props) => {
  return (
    <>
      <DataGrid
        autoHeight{...props.adminList}
        sx={{ border: 0 }}
        rows={props.adminList}
        columns={props.columns}
        rowsPerPageOptions={[3]}
        hideFooter
      />
    </>
  );
};

export default MemberListDataGrid;
