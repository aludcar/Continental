import customFetch from "../../utils/axios";
import { urlDictionary } from "../../utils/urlDictionary";

export const getAllDocumentTypesThunk = async (thunkAPI) =>{

    try {
        const resp = await customFetch.post(
          urlDictionary.documentTypeEndpoint,
        );
        return resp.data;
      } catch (error) {
        console.log(error.response);
        return thunkAPI.rejectWithValue("something went wrong");
      }
}