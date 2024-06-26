import { toast } from "react-toastify";

export const useControlErrors = (responsEreror) => {
  console.error(responsEreror);
  toast.error('Opps se ha generado un error');
};
