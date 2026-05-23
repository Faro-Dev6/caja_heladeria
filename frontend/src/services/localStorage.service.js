export const saveData = (key, data) => {
  try {
    localStorage.setItem(
      key,
      JSON.stringify(data)
    );
  } catch (error) {
    console.error(`Error saving ${key}:`, error);
  }
};

export const loadData = (key, fallbackValue) => {
  try {
    const storedData = localStorage.getItem(key);

    return storedData
      ? JSON.parse(storedData)
      : fallbackValue;
  } catch (error) {
    console.error(`Error loading ${key}:`, error);

    return fallbackValue;
  }
};

export const removeData = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing ${key}:`, error);
  }
};