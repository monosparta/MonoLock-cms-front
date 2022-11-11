import React from "react";
import Box from "@mui/material/Box";

export default function Lock(props) {
  const { sx, ...other } = props;

  return (
    <Box
      sx={{
        width: "12vw",
        height: "12vw",
        minWidth: "35px",
        minHeight: "35px",
        maxWidth: "120px",
        maxHeight: "120px",
        borderRadius: "12%",
        border: "1px solid #000",
        display: "inline-flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: { xs: "2px", sm: "3px", md: "4px", lg: "5px" },
        ...sx,
      }}
      {...other}
    />
  );
}
