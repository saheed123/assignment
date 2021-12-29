const { Assign} = require('../models/user');
const Token = require('../models/token');
const changePassword = async (req, res, next) => {
  try {
    const user = await Assign.findOne({ _id: req.params.userId });
    if (!user) return res.status(400).send('invalid link or expired link');
    const token = await Token.findOne({ _userId: user._id, token: req.params.token });
    if (!token) return res.status(400).send('invalid link or expired');
    user.password = req.body.password;
    await user.save();
    await token.deleteOne();
    res.send('password reset successfully');

    
  } catch (error) {
    console.log(error.message);
    
  }
  
}
module.exports = changePassword;