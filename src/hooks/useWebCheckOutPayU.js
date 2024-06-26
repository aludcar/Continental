import { useCreateSignaturePayU } from "./useCreateSignaturePayU";
import { useFormatDate } from "./useFormatDate";
import { useSetExpirationDate } from "./useSetExpirationDate";
import { useEnvDT } from "./useEnvDT";
import { useSelectIdAccount } from "./useSelectIDAccount";

const {
  pU: { qa: environmentQa, p: environmentP },
} = useEnvDT;

const currentEnvironment = environmentP ?? null;

const TEST = "0";

const baseRequestObject = {
  merchantId: null,
  accountId: null,
  description: null,
  referenceCode: null,
  amount: null,
  tax: null,
  taxReturnBase: null,
  currency: null,
  signature: null,
  test: null,
  buyerEmail: null,
  buyerFullName: null,
  telephone: null,
  payerEmail: null,
  payerPhone: null,
  payerFullName: null,
  payerDocument: null,
  payerDocumentType: null,
  responseUrl: null,
  confirmationUrl: null,
  paymentMethods: null,
};

export const useWebCheckOutPayU = ({
  purchaseId,
  purchaseTotalPrice,
  passengers,
  meansPayUName,
  formPayment,
  outboundDetails,
}) => {
  const departureDateTime = outboundDetails?.departureDateTime ?? null;
  const { documentNumber, fullName, lastName, mainPhoneNumber, email } =
    passengers.find((passenger) => passenger.isLeadPassenger);

  const signature = useCreateSignaturePayU({
    apiKey: currentEnvironment.authenticityData?.apiKey,
    merchantId: currentEnvironment.authenticityData?.merchantId,
    referenceCode: purchaseId,
    amount: purchaseTotalPrice,
    currency: currentEnvironment.authenticityData?.currency,
    meansPayUName,
  });

  const data = {
    ...currentEnvironment.authenticityData ?? null,
    accountId: useSelectIdAccount(
      meansPayUName,
      currentEnvironment.authenticityData?.accountId
    ),
    ...{
      referenceCode: `${purchaseId}`,
      amount: `${purchaseTotalPrice}`,
      tax: "0",
      taxReturnBase: "0",
      signature,
      test: TEST,
      buyerEmail: `${email}`,
      buyerFullName: `${fullName} ${lastName}`,
      telephone: `${mainPhoneNumber}`,
      payerEmail: `${email}`,
      payerPhone: `${mainPhoneNumber}`,
      payerFullName: `${fullName} ${lastName}`,
      payerDocument: `${documentNumber}`,
      responseUrl: currentEnvironment.baseURLOrigin,
      confirmationUrl: `${currentEnvironment.baseURLOrigin}/wp-content/themes/hub-child/inc/confirmPayu/confirmation-payu.php`,
      paymentMethods: `${meansPayUName}`,
      expirationDate: useFormatDate(
        useSetExpirationDate(meansPayUName, departureDateTime)
      ),
    },
  };

  const newData = { ...baseRequestObject, ...data };

  formPayment.current.method = "post";
  formPayment.current.action = currentEnvironment.urlCheckoutPayU;
  Object.entries(newData).forEach(([key, value]) => {
    const hiddenField = document.createElement("input");
    hiddenField.type = "hidden";
    hiddenField.name = key;
    hiddenField.value = value;
    formPayment.current.appendChild(hiddenField);
  });
  formPayment.current.submit();
};
