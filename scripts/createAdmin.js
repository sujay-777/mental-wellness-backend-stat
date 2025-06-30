const mongoose = require('mongoose');
const User = require('../models/User');
const config = require('../config/config');

const ADMIN_NAME = 'Admin';
const ADMIN_EMAIL = 'admin@gmail.com';
const ADMIN_PASSWORD = '123456';

async function createOrUpdateAdmin() {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    let admin = await User.findOne({ email: ADMIN_EMAIL });
    
    if (admin) {
      admin.name = ADMIN_NAME;
      admin.password = ADMIN_PASSWORD; // Will be hashed by pre-save middleware
      admin.role = 'admin';
      await admin.save();
      console.log('Admin user updated:', ADMIN_EMAIL);
    } else {
      admin = new User({ 
        name: ADMIN_NAME, 
        email: ADMIN_EMAIL, 
        password: ADMIN_PASSWORD, 
        role: 'admin' 
      });
      await admin.save();
      console.log('Admin user created:', ADMIN_EMAIL);
    }
    
    console.log('Admin credentials:');
    console.log('Email:', ADMIN_EMAIL);
    console.log('Password:', ADMIN_PASSWORD);
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
}

createOrUpdateAdmin(); 