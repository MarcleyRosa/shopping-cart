const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('saveCartItens called localStorage', () => {
    saveCartItems('<ol><li>Item</li></ol>')
    expect(localStorage.setItem).toHaveBeenCalledTimes(1)
  })
  it('saveCartItens to called with two param ', () => {
    saveCartItems('<ol><li>Item</li></ol>')
    expect(localStorage.setItem('cartItems', '<ol><li>Item</li></ol>')).toHaveBeenCalledTimes(1)
  })
});
