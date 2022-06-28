const jsSHA = require("jsSHA"); 

const getHash = (input) =>{
  // eslint-disable-next-line new-cap
  const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
  const unhasedString = `${input}`;
  shaObj.update(unhasedString);

  return shaObj.getHash('HEX');
}




module.exports = getHash