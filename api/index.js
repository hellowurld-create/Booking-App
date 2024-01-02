const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs'); 
const { default: mongoose } = require('mongoose');
const jwt = require('jsonwebtoken')
const UserModel = require('./models/user');

const bcryptSalt = bcrypt.genSaltSync(8);
const jwtSecret = 'weallhavesecrets'

const app = express();

require('dotenv').config();

app.use(express.json());

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));



mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req, res) => {
    res.json({ message: 'success' });
});

app.post('/register', async (req, res) => {
    const { fname, lname, email, phoneNo, password } = req.body;
    
   try {
    const user = await UserModel.create({
        fname,
        lname,
        email,
        phoneNo,
        password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(user);
   } catch (error) {
       res.status(422).json(error);
   } 
})

app.post('/login', async (req, res) => {
    const { emailOrPhone, password } = req.body;
  
    try {
      // Check if the user exists with the provided email or phone number
      const user = await UserModel.findOne({
        $or: [{ email: emailOrPhone }, { phoneNo: emailOrPhone }],
      });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the provided password is correct
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }
      jwt.sign({ email: user.email, id: user._id }, jwtSecret, {}, (err,token) => {
        if (err) throw err;
       // Send the JWT as a cookie to the client
  res.cookie('token', token).json({
    message: 'Login successful',
    user: { email: user.email, fname: user.fname },
    options: {
      maxAge: 1000 * 60 * 15, // 15 minutes
      httpOnly: true,
      sameSite: 'none'
    },
  });
      });
     
    } catch (error) {
      // Handle login error
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });


app.listen(4000, () => {
    console.log('Server is running on port 4000');
});