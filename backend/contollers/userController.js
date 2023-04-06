const asyncHandler=require('express-async-handler');


//@description-> register a new user
//@route   /api/users
//@acess public
const registerUser =asyncHandler( async(req, res) => {
    const {name,email,password}=req.body;

    // validation
    if(!name || !email || !password){
    //    return res.status(400).json({message:'Please include all fields'})
    res.status(400)
    // this will return us a html file in request
    throw new Error('Please include all fields')
    }
    
  res.send("Register-User");
});

//@description-> login a new user
//@route   /api/users/login
//@acess public
const loginUser =asyncHandler( async (req, res) => {
  res.send("Login-User");
});

module.exports = {
  registerUser,
  loginUser
};
