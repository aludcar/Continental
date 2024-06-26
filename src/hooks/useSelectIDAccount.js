export const useSelectIdAccount = (meansPayUName, accountIdObj) => {
  if (
    meansPayUName.toUpperCase() === "EFECTY" ||
    meansPayUName.toUpperCase() === "OTHERS_CASH"
  ) {
    return accountIdObj.efecty_suRed;
  } else {
    return accountIdObj.card_pse;
  }
};
