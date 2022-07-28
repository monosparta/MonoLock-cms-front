import React from "react";
import "./UserRecord.css";
import _ from "lodash";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import { useTranslation } from 'react-i18next';

const Record = (props) => {
  const { t } = useTranslation();

  return (
    <div>
      {_.map(props.records, (item, index) => (
        <div key={index}>
          {item.user.permission !== 0 ? (
            <Box
              sx={{
                marginBottom: "16px",
                border: "1px solid #363F4E",
                boxShadow: "none",
                borderRadius: "4px",
              }}
            >
              <AccordionSummary sx={{ height: 64 }}>
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  {item.user.name}
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                {t("openAt",item.time)}
                </Typography>
              </AccordionSummary>
            </Box>
          ) : (
            <div className="recordBox">
              <Accordion
                sx={{
                  border: "1px solid #363F4E",
                  boxShadow: "none",
                  borderRadius: "4px",
                }}
              >
                <AccordionSummary
                  sx={{ height: 64 }}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  {t("admin")} - {item.user.name}
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                  {t("forcedOpenAt",item.time)}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    border: "1px solid black",
                    borderRadius: "4px",
                    margin: 2,
                  }}
                >
                  <Typography>{item.description}</Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Record;
