/**
 * Saves data to local storage
 * @param {string} key - The storage key
 * @param {any} value - The value to store
 */
export const saveToLocalStorage = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };
  
  /**
   * Retrieves data from local storage
   * @param {string} key - The storage key
   * @param {any} defaultValue - The default value to return if key doesn't exist
   * @returns {any} The stored value or defaultValue
   */
  export const getFromLocalStorage = (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error retrieving from localStorage:', error);
      return defaultValue;
    }
  };