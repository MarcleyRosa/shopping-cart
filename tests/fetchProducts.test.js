require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('fetchProducts is a function', () => {
    expect(typeof(fetchProducts)).toEqual('function');
  })
  it('fetchProducts to called',() => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledTimes(1)
  })
  it('test data structure', async () => {
    expect(await fetchProducts('computador')).toEqual(computadorSearch)
  })
  it('no param fetchProducts', async () => {
    const fetchFail = await fetchProducts();
    expect(fetchFail).toEqual(new Error('You must provide an url'));
  })
});
