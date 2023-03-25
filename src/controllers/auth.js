import User from '../modules/user.js';
import bcrypt, { hash } from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken'

export const signup = async(req, res) => {
  try {
    const {name, email, password, confirmPassword} = req.body;
    const userExits = await User.findOne({email})

    if(userExits) {
      return res.status(400).json({
        message: "User is already exits"
      })
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    })

    const token = jsonwebtoken.sign({_id: user._id}, 'yuongeon', {expiresIn: '1h'});
    user.password = undefined;
    return res.status(201).json({
      message: "Signup success",
      accessToken: token,
      user
    })
  } catch (error) {
    res.status(400).json({
      message: error
    })
  }
}