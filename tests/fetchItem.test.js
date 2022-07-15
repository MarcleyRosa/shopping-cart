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
  it('test data structure', async () => {
    expect(await fetchItem('MLB1615760527')).toEqual(item)
  })
  it('no param fetchItem', async () => {
    const fetchFail = await fetchItem();
    expect(fetchFail).toEqual(new Error('You must provide an url'));
  })
});
