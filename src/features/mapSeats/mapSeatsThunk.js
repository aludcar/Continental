import customFetch from "../../utils/axios";
import { urlDictionary } from "../../utils/urlDictionary";

export const getMapSeatsOrientationThunk = async(data, thunkAPI) =>{
    try {
      const {request} = thunkAPI.getState().mapSeat;
      const newData = {...request, ...data}
        const resp = await customFetch.post(
          urlDictionary.mapSeatsTypeEndpoint,
          newData
        );
        return resp.data;
      } catch (error) {
        console.log(error.response);
        return thunkAPI.rejectWithValue("something went wrong");
      }
}