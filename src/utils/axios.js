import axios from "axios";
import { useEnvDT } from "../hooks/useEnvDT";
import {
  getItemLocalStorageWithExpiry,
  setItemLocalStorageWithExpiry,
} from "./localStorage";

const {
  env: { qa: environmentQa, p: environmentP },
} = useEnvDT;

const currentEnvironment = environmentP ?? null;

const customFetch = axios.create({
  baseURL: currentEnvironment.baseURL,
  headers: {
    Accept: "application/json",
  },
});

customFetch.interceptors.request.use(async (config) => {
  try {
    const itemToken =
      JSON.parse(getItemLocalStorageWithExpiry("token")) ??
      (await getAuthenticationToken());

    const { token } = itemToken.data;
    config.headers["Authorization"] = `Bearer ${token}`;

    return config;
  } catch (error) {
    console.log({ error });
  }
});

const getAuthenticationToken = async () => {
  try {
    const resp = await axios.post(
      `${currentEnvironment.baseURL}/authentication/V1/Authentication/UserLogin`,
      {
        username: currentEnvironment?.n,
        password: currentEnvironment?.p,
      }
    );
    const { token } = resp?.data?.data;
    setItemLocalStorageWithExpiry("token", token);
    return resp.data;
  } catch (err) {
    console.error(err);
  }
};

export default customFetch;
