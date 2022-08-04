import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import CancelIcon from "@mui/icons-material/Cancel";
import { useTranslation } from 'react-i18next';

const divStyle = {
  width: "100%",
  marginLeft: "15%",
  display: "flex",
  alignItems: "center",
};

export const CheckCircleIconStyle = () => {
  const { t } = useTranslation();

  return (
    <div style={divStyle}>
      <CheckCircleIcon style={{ color: "green", padding: "0px 8px 0px 0px" }} />
      <h2>{t('using')}</h2>
    </div>
  );
};
export const AccessTimeFilledIconStyle = () => {
  const { t } = useTranslation();

  return (
    <div style={divStyle}>
      <AccessTimeFilledIcon
        style={{ color: "grey", padding: "0px 8px 0px 0px" }}
      />
      <h2>{t('canUse')}</h2>
    </div>
  );
};

export const CancelIconStyle = () => {
  const { t } = useTranslation();

  return (
    <div style={divStyle}>
      <CancelIcon style={{ color: "Red", padding: "0px 8px 0px 0px" }} />
      <h2>{t('error')}</h2>
    </div>
  );
};
