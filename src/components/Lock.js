import React from "react";
import Box from "@mui/material/Box";

export default function Item(props) {
  const { sx, ...other } = props;

  return (
    <Box
      sx={{
        width: "8vw",
        height: "8vw",
        minWidth: "35px",
        minHeight: "35px",
        maxWidth: "80px",
        maxHeight: "80px",
        fontWeight: "bold",
        borderRadius: "12%",
        border: "1px solid #000",
        fontSize: "21px",
        textAlign: "center",
        lineHeight: "80px",
        fontFamily: "Mulish",
        margin: { xs: "2px", sm: "3px", md: "4px", lg: "5px" },
        ...sx,
      }}
      {...other}
    />
  );
}
