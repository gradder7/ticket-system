const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    // it will give us the host that we connected to.
    console.log(`mongobd connected ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`Error- ${error.message}`.red.underline.bold);
    //if fails than exit the entire process
    process.exit(1);
  }
};

module.exports=connectDB;
