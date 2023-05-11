import { useState, useEffect } from "react";
import { Box, Button, Link, List, ListItem, ListItemText, Modal, Typography } from "@mui/material";
import { offlineStatus, requestSync, selectOffline } from "../redux/offlineSlice";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: "1rem",
};

const parseTime = (timeString) => {
    const time = new Date(timeString);
    const year = time.getFullYear();
    const month = (time.getMonth() + 1).toString().padStart(2, '0');
    const date = time.getDate().toString().padStart(2, '0');
    const hour = time.getHours().toString().padStart(2, '0');
    const minute = time.getMinutes().toString().padStart(2, '0');
    const second = time.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
}

const OfflineBar = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { offlineLogs } = useSelector(selectOffline);
    const handleClickSync = () => {
        dispatch(requestSync());
    };
    const [open, setOpen] = useState(false);

    const latestSync = (list) => {
        if (list.length === 0) return t('sync.latest.not-synced');
        const data = list[0]
        return t('sync.latest.data', {
            time: parseTime(data.time),
            mode: t('sync.' + data.mode), 
            status: ((data.error === 1) ? t('sync.failed') : '')
        });
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        dispatch(offlineStatus());
        let refresh = setInterval(() => {
            dispatch(offlineStatus());
        }, 3000);
        return () => clearInterval(refresh);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0.5rem",
                gap: "0.5rem",
            }}>
                <Typography variant="h6">
                    <Link href="#" onClick={handleOpen} color="inherit" underline="hover">
                        {latestSync(offlineLogs)}
                    </Link>
                </Typography>
                <Button variant="contained" onClick={handleClickSync}>{t('sync.sync_now')}</Button>
            </Box>

            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "8px 16px",
                        gap: "0.5rem",
                    }}>
                        <Typography variant="h5">
                            {t('sync.history.title')}
                        </Typography>
                        <Button variant="contained" onClick={handleClickSync}>{t('sync.sync_now')}</Button>
                    </Box>
                    <List sx={{ maxHeight: 500, overflow: "scroll"}} >
                        {offlineLogs.map((data) => (
                            <ListItem key="data.id">
                                <ListItemText
                                    primary={t('sync.history.list-primary', {
                                        time: parseTime(data.time),
                                        mode: t('sync.' + data.mode), 
                                        status: ((data.error === 1) ? t('sync.failed') : '')})}
                                    secondary={((data.user) ? t('sync.history.triggered-by', { user: data.user.name }) : null)} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Modal>
        </div>
    )
}
export default OfflineBar;