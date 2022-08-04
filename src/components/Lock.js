import React from "react";
import Box from "@mui/material/Box";

export default function Lock(props) {
  const { sx, ...other } = props;

  return (
    <Box
      sx={{
        width: 80,
        height: 80,
        background: "#FFF",
        color: "#000",
        fontWeight: "bold",
        borderRadius: "12%",
        border: "1px solid #000",
        fontSize: "21px",
        textAlign: "center",
        lineHeight: "80px",
        margin: "5px 5px 5px 5px",
        fontFamily: "Mulish",
        ...sx,
      }}
      {...other}
    />
  );
}
