const getSavedCartItems = () => JSON.parse(localStorage.getItem('Item'));

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
