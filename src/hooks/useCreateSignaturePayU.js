import md5 from "md5";

export const useCreateSignaturePayU = (data) => {
    const { merchantId, referenceCode, amount, currency, meansPayUName, apiKey } = data;
    return md5(
      `${apiKey}~${merchantId}~${referenceCode}~${amount}~${currency}~${meansPayUName}`
    );
  }