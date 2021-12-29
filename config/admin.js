module.exports = (req, res, next) => {
  if (!req.user.isAdmin === true)

    res.status(403).json({
      message: 'you are not allowed'
    });
  next();






}