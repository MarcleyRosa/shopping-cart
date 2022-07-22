const saveCartItems = (conteudo) => localStorage.setItem('Item', JSON.stringify(conteudo));

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
