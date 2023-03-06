import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const lockStatus = createAsyncThunk("lock/lockStatus", async (thunkAPI) => {
  return getStatus();
});

export const lockStatusNoLoading = createAsyncThunk("lock/lockStatusNoLoading", async (thunkAPI) => {
  return getStatus();
});


export const lockUpdateUserId = createAsyncThunk('lock/lockUpdateUserId', async ({ userId, lockNo }, thunkAPI) => {
  try {
    {
      const token = localStorage.getItem('token')
      const response = await fetch(`${process.env.REACT_APP_URL}/api/locker/${lockNo}`, {
        method: 'PATCH',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: token,
        }, body: JSON.stringify(
          {
            userId: userId
          }
        )
      }).then(response => {
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
      })
    }
  } catch (e) {
    return thunkAPI.rejectWithValue(e)
  }
})

const getStatus = async (thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${process.env.REACT_APP_URL}/api/locker`, {
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

export const lockSlice = createSlice({
  name: "lock",
  initialState: {
    lockList: [],
    currentNumber: "",
    lockIsFetching: true,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    clearState: (state) => {
      state.lockList = [];
      state.isError = false;
      state.isSuccess = false;
      state.lockIsFetching = true;

      return state;
    },
  },
  extraReducers: {
    [lockStatus.fulfilled]: (state, { payload }) => {
      state.isSuccess = true;
      state.lockList = payload;
      state.lockIsFetching = false;
      return state;
    },
    [lockStatus.pending]: (state) => {
      state.lockIsFetching = true;
      return state;
    },
    [lockStatus.rejected]: (state) => {
      state.isError = true;
      state.lockIsFetching = false;
      return state;
    },
    [lockStatusNoLoading.fulfilled]: (state, { payload }) => {
      state.isSuccess = true;
      state.lockList = payload;
      state.lockIsFetching = false;
      return state;
    },
    [lockStatusNoLoading.pending]: (state) => {
      return state;
    },
    [lockStatusNoLoading.rejected]: (state) => {
      state.isError = true;
      return state;
    },
    [lockUpdateUserId.fulfilled]: (state, { payload }) => {
      state.isSuccess = true;
      state.lockList = payload;
      state.lockIsFetching = false;
      return state;
    },
    [lockUpdateUserId.pending]: (state) => {
      state.lockIsFetching = true;
      return state;
    },
    [lockUpdateUserId.rejected]: (state) => {
      state.isError = true;
      state.lockIsFetching = false;
      return state;
    },
  },
});

export const { clearState } = lockSlice.actions;

export const selectLock = (state) => state.lock;

export default lockSlice.reducer;
