import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getAdminList = createAsyncThunk("admin/get", async (thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${process.env.REACT_APP_URL}/api/admin`, {
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
    if (response.ok) {
      return response.json();
    } else {
      throw response;
    }
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

export const deleteAdmin = createAsyncThunk(
  "admin/delete",
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.REACT_APP_URL}/api/admin/${id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token,
          },
        }
      ).then((response) => {
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
      console.log(response)
      if (response.ok) {
        return response.json();
      } else {
        throw response;
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const updateAdmin = createAsyncThunk(
  "admin/update",
  async ({ id, password, name, mail, confirm }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.REACT_APP_URL}/api/admin/${id}`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token,
          },
          body: JSON.stringify({
            password,
            name,
            mail,
            confirm,
          }),
        }
      ).then((response) => {
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
      if (response.ok) {
        return response.json();
      } else {
        throw response;
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const addAdmin = createAsyncThunk(
  "admin/add",
  async ({ name, mail, password, confirm }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.REACT_APP_URL}/api/admin`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({
          name,
          mail,
          password,
          confirm,
        }),
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
      let data = await response.text();
      if (response.ok) {
        return data;
      } else {
        throw data;
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    token: "",
    name: "",
    isError: false,
    isSuccess: false,
    isFetching: false,
    adminList: [{}],
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      return state;
    },
    clearToken: (state) => {
      state.token = "";

      return state;
    },
  },
  extraReducers: {
    [getAdminList.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.adminList = payload;
      return state;
    },
    [getAdminList.pending]: (state) => {
      state.isFetching = true;
      return state;
    },
    [getAdminList.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
      return state;
    },

    [deleteAdmin.fulfilled]: (state) => {
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [deleteAdmin.pending]: (state) => {
      state.isFetching = true;
      return state;
    },
    [deleteAdmin.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
      return state;
    },
    [updateAdmin.fulfilled]: (state) => {
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [updateAdmin.pending]: (state) => {
      state.isFetching = true;
      return state;
    },
    [updateAdmin.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
      return state;
    },
    [addAdmin.fulfilled]: (state) => {
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [addAdmin.pending]: (state) => {
      state.isFetching = true;
      return state;
    },
    [addAdmin.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
      return state;
    },
  },
});

export const { clearState, clearToken } = adminSlice.actions;

export const selectAdmin = (state) => state.admin;

export default adminSlice.reducer;
