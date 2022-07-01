const jsSHA = require("jsSHA"); 

const getHash = (input) =>{
  // eslint-disable-next-line new-cap
  const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
  const unhasedString = `${input}`;
  shaObj.update(unhasedString);

  return shaObj.getHash('HEX');
}

/**
 * checks and sets login status to restrict certain routes to unly be usable by logged-in users
 * compares the existing hash cookie to a resh hash of the raw userId cookie to verify that no changes were made by the user
 * @param {*} req - request as sent by client
 * @param {*} res - response as sent by server
 * @param {func} next - next function to execute
 */
const loginCheck = (req, res, next) => {
  if (!req.cookies.loggedin || !req.cookies.userID) {
    // req.session.message="Please login again!"
    res.redirect('/login');
  }
  next();
};
module.exports = getHash, loginCheck