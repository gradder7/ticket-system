// user model is a schema of user
const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name!"],
  },
  email: {
    type: String,
    required: [true, "Please add an email!"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please add an password!"],
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
},
// to add the time stamp automatically
{
    timestamps:true,
});

// model export
module.exports=mongoose.model('User',userSchema)
