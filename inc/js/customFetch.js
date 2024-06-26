const customFetch = async (url, token = null, data = {}) => {
  try {
    const baseUrl = "https://qa.sigatt.co/";
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    token && myHeaders.append("Authorization", `Bearer ${token}`);

    var raw = JSON.stringify(data);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(`${baseUrl}${url}`, requestOptions);
    const responseJson = await response.json();
    if (responseJson.statusCode !== 1) {
      throw new Error(`error: ${responseJson.message}`);
    }
    return responseJson;
  } catch (error) {
    console.error(`customFetch-error: ${error}`);
  }
};
