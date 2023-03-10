import mongoose from 'mongoose';

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */
const mongoConnnection = {
  isConnected: 0
}

export const connect = async () => {
  if( mongoConnnection.isConnected){
    console.log('Ya estamos logeados')
    return
  }


  if( mongoose.connections.length > 0 ){
    mongoConnnection.isConnected = mongoose.connections[0].readyState

    if (mongoConnnection.isConnected === 1 ) {
      console.log('usando conexion anterior')
      return
    }

    await mongoose.disconnect();
  }

  await mongoose.connect( process.env.MONGO_URL || '');
  mongoConnnection.isConnected = 1
  console.log('conectado a mongoDB')
}

export const disconnect = async() => {
  if (mongoConnnection.isConnected === 0) return

  await mongoose.disconnect()
  mongoConnnection.isConnected = 0
  console.log('desconectado de mongoDB ®')
}