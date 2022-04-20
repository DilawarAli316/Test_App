import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
// import User from '../models/User.js'

// const protect = asyncHandler(async (req, res, next) => {
//   let token

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     try {
//       token = req.headers.authorization.split(' ')[1]

//       const decoded = jwt.verify(token, process.env.JWT_SECRET)

//       //   console.log(decoded)

//       req.user = await User.findById(decoded.id).select('-password')

//       //   console.log(req.user)
//       next()
//     } catch (err) {
//       console.error(err)
//       res.status(401)
//       throw new Error('Not Authorized , token failed')
//     }
//   }

//   if (!token) {
//     res.status(401)
//     throw new Error('Not Authorized, no token')
//   }
// })

// const admin = asyncHandler(async (req, res, next) => {
//   // without asyncHandler it will throw error in console.log || with async it will throw it on response
//   if (req.user && req.user.isAdmin) {
//     // console.log('user is admin')
//     // if user is logged in then check if he's an admin
//     next()
//   } else {
//     // console.log('user is not an admin')
//     res.status(401)
//     throw new Error('Not authorized as an admin')
//   }
// })
// export { protect, admin }
