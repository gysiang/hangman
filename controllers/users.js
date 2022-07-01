const db = require("../models/index");
const getHash = require("../public/helper")

class userController {
  constructor(model) {
    this.model = model;
  }

  main (req,res) {
    res.render("main")
  }

  getSignUp (req,res) {
    res.render("signup");
  }

  async signUp (req,res){
    console.log("trying to signup")

    const { name, email, password } = req.body;

    try {
        const findEmail = await this.model.findOne(
          { where: { email } },
        );
        console.log('findEmail', findEmail);
        if (findEmail !==null){
          throw Error('Email has been registered before');
        }
        else {
            const newUser = await this.model.create({
                name: name,
                email: email,
                password: getHash(password),
            });
            console.log(newUser);
            res.cookie('loggedin', getHash(newUser.id));
            res.cookie('userID', newUser.id);
            res.send("success");
            }
        } 
    catch (error) {
      console.log("signup error")
      console.log('error', error);
      res.status(500).send(error)
    }
  }

  getlogin (req,res){
    res.render("login");
  }

  async login(req,res){
    console.log("trying to login");
    const { email, password } = req.body;

    try {
      const user = await this.model.findOne({
        where: {
          email: email,
        }
      });
      console.log(user);
      const hashedPassword = getHash(password);

      if (hashedPassword === user.password){
        res.cookie("loggedin", getHash(user.id));
        res.cookie("userID", user.id);
        res.send('success');
      } else {
        console.log("Wrong Email or Password");
        res.send("Wrong Email or Password");
      }  
    } catch (error) {
      console.log("login controller error")
      console.log('error', error)
      res.status(500).send({error});
    }
  }

  logout (req,res) {
      res.clearCookie("loggedin");
      res.clearCookie("gameID");
      res.clearCookie("userID");
      res.send('success')
    }
}

module.exports = userController