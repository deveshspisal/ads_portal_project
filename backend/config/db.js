const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://deveshpisal1008:RfRMO3OvTLMOQYn4@adsproject.bvomsve.mongodb.net/?retryWrites=true&w=majority&appName=adsproject');
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
