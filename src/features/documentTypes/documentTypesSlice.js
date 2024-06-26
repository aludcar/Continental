import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllDocumentTypesThunk} from "./documentTypesThunk"

const initialState = {
  isLoading:false,
  documentTypesData:[]
};

export const getAllDocumentTypes = createAsyncThunk(
  "documentTypes/documentTypesSlice",
  async (_, thunkAPI) => getAllDocumentTypesThunk(thunkAPI)
);

const documentTypesSlice = createSlice({
  name: "documentTypes",
  initialState,
  reducers: {},
  extraReducers: (builder) =>{
    builder
    .addCase(getAllDocumentTypes.pending, (state)=>{
      state.isLoading = true;
    })
    .addCase(getAllDocumentTypes.fulfilled, (state,{payload:{data}}) =>{
      state.isLoading = false;
      state.documentTypesData = data ?? [];
    })
    .addCase(getAllDocumentTypes.rejected, (state, {payload}) =>{
      state.isLoading = false;
      console.log(payload);
    })
  },
});

export default documentTypesSlice.reducer;
