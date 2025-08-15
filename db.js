import mongoose from 'mongoose'

let cached = global._mongoose
if (!cached) { cached = global._mongoose = { conn: null, promise: null } }

export async function dbConnect(){
  if (cached.conn) return cached.conn
  if (!cached.promise){
    const uri = process.env.MONGODB_URI || process.env.TEMP_MONGODB_URI
    if (!uri) throw new Error('No MONGODB_URI or TEMP_MONGODB_URI set')
    cached.promise = mongoose.connect(uri, { dbName: 'fouraethiopia' }).then(m => m)
  }
  cached.conn = await cached.promise
  return cached.conn
}
