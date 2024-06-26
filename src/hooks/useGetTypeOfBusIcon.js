import { typesOfBuses } from "../utils/typesOfBuses";

export const useGetTypeOfBusIcon = (busServiceId) => {
  let busIcon = null;
  typesOfBuses.forEach(bus =>{
    parseInt(busServiceId) === parseInt(bus.busServiceId) && (busIcon = bus.icon)
  })

  return busIcon;
};