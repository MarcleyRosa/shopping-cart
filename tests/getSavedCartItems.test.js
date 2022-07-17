const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('getSavedCartItems called localStorage.getItem', () => {
    getSavedCartItems()
    expect(localStorage.getItem).toHaveBeenCalledTimes(1)
  })
  it('getSavedCartItems to called with param cartItems', () => {
    saveCartItems()
    expect(localStorage.setItem('cartItems')).toHaveBeenCalledTimes(1)
  })
});
