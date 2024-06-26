export const setItemLocalStorage = (name, data) => {
  const typeOfName = typeof data;
  localStorage.setItem(
    name,
    typeOfName === "string" ? data : JSON.stringify(data)
  );
};

export const setItemLocalStorageWithExpiry = (name, data) => {
  if(!data){
    removeItemLocalStorage(name);
    return;
  }

  const typeOfName = typeof data;

  const now = new Date().getTime();
  let currentTime = new Date().getTime();
  let updatedTIme = new Date(currentTime + 2 * 60 * 60 * 1000);

  const item = {
    data: {
      [name]: typeOfName === "string" ? data : JSON.stringify(data),
      expiry: updatedTIme,
    },
  };

  localStorage.setItem(name, JSON.stringify(item));
};

export const removeItemLocalStorage = (name) => localStorage.removeItem(name);

export const getItemLocalStorage = (name) => {
  const item = localStorage.getItem(name);
  return (item && JSON.parse(item)) || null;
};

export const getItemLocalStorageWithExpiry = (name) => {
  let item = localStorage.getItem(name);
  if (item) {
    const now = new Date().getTime();
    const {data:{expiry}} = JSON.parse(item);
    if (now > new Date(expiry).getTime()) {
      localStorage.removeItem(name);
      return null;
    } else {
      return item;
    }
  }
  return null;
};