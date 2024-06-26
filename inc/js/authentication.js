const authentication = async () => {
  try {
    const authentication = await customFetch(
      "authentication/V1/Authentication/UserLogin",
      null,
      {
        username: "CBUS-85271",
        password: "Tst!8u774C",
      }
    );
    return authentication;
  } catch (error) {
    console.error(`Authentication-error: ${error} `);
  }
};