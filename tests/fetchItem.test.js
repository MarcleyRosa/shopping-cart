require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('fetchItem is a function', () => {
    expect(typeof(fetchItem)).toEqual('function');
  })
  it('fetchItem is a called', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledTimes(1)
  })
});
