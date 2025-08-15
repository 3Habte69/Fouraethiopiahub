import jwt from 'jsonwebtoken'

export function signToken(payload){
  const secret = process.env.JWT_SECRET || 'devsecret_change_me'
  return jwt.sign(payload, secret, { expiresIn: '7d' })
}

export function verifyToken(token){
  try{
    const secret = process.env.JWT_SECRET || 'devsecret_change_me'
    return jwt.verify(token, secret)
  }catch(e){
    return null
  }
}
