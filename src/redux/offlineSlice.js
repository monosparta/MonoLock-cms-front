import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const getStatus = async (thunkAPI) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${process.env.REACT_APP_URL}/api/offline`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                token,
            },
        }).then((response) => {
            if (response.status === 200) {
                return response;
            }
            if (response.status === 401) {
                if (token !== "") {
                    localStorage.clear();
                    alert("請重新登入");
                    window.location.reload();
                }
            }
        });
        let data = await response.json();
        if (response.ok) {
            return data;
        } else {
            throw data;
        }
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }

}
const requestSyncData = async (thunkAPI) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${process.env.REACT_APP_URL}/api/offline`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                token,
            },
        }).then((response) => {
            if (response.status === 200) {
                return response;
            }
            if (response.status === 401) {
                if (token !== "") {
                    localStorage.clear();
                    alert("請重新登入");
                    window.location.reload();
                }
            }
        });
        let data = await response.json();
        if (response.ok) {
            return data;
        } else {
            throw data;
        }
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
}

export const offlineStatus = createAsyncThunk("offline/status", getStatus);
export const requestSync = createAsyncThunk("offline/sync", requestSyncData);


export const offline = createSlice({
    name: "offline",
    initialState: {
        offlineLogs: [],
        isFetching: true,
        isSuccess: false,
        isError: false,
        errorMessage: "",
    },
    reducers: {
        clearState: (state) => {
            state.offlineLogs = [];
            state.isError = false;
            state.isSuccess = false;
            state.isFetching = true;

            return state;
        },
    },
    extraReducers: {
        [offlineStatus.fulfilled]: (state, { payload }) => {
            state.isSuccess = true;
            state.offlineLogs = payload;
            state.isFetching = false;
            return state;
        },
        [offlineStatus.pending]: (state) => {
            state.isFetching = true;
            return state;
        },
        [offlineStatus.rejected]: (state) => {
            state.isError = true;
            state.isFetching = false;
            return state;
        },
        [requestSync.fulfilled]: (state, { payload }) => {
            state.isSuccess = true;
            state.isFetching = false;
            return state;
        },
        [requestSync.pending]: (state) => {
            state.isFetching = true;
            return state;
        },
        [requestSync.rejected]: (state) => {
            state.isError = true;
            state.isFetching = false;
            return state;
        },
    },
});

export const { clearState } = offline.actions;

export const selectOffline = (state) => state.offline;

export default offline.reducer;
