import { efecty, mastercard, pse, visa, sured, baloto } from "../image/SVG";

export const useCreatePaymentMethodCollection = (
  paymentMethods,
  currentPaymentMethod
) => {
  const newPaymentMethodsCollection = paymentMethods.map(
    (paymentMethodData) => {
      const { isAllowed, icon } = selectPaymentMethodIcon(paymentMethodData);
      if (isAllowed) {
        return {
          value: paymentMethodData.meansPayuId,
          name: "payment",
          hasLabelBackground: icon !== null,
          imageBackground: icon ?? null,
          labelText: icon ?? paymentMethodData.meansName, 
          isCenterElement: true,
          checked: currentPaymentMethod === paymentMethodData.meansPayuId,
          require: true,
        };
      }
    }
  ).filter(notUndefined => notUndefined !== undefined);

  return newPaymentMethodsCollection;
};

const selectPaymentMethodIcon = (paymentMethod) => {
  const { meansPayuName } = paymentMethod;

  switch (meansPayuName) {
    case "MASTERCARD":
      return { isAllowed: true, icon: mastercard };
    case "VISA":
      return { isAllowed: true, icon: visa };
    case "BALOTO":
      return { isAllowed: false, icon: baloto };
    case "PSE":
      return { isAllowed: true, icon: pse };
    case "EFECTY":
      return { isAllowed: true, icon: efecty };
    case "OTHERS_CASH":
      return { isAllowed: true, icon: sured };
  }
};
