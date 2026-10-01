//server

const express=require('express')
const app=express()
const path=require('path')
const port=process.env.port || 4000
const server=app.listen(port,()=>{
  console.log(`💬 server is running on port : ${port}`)
})

const io = require('socket.io')(server)

app.use(express.static(path.resolve('./view')))

// Global scope mein Set ko initialize karna mat bhoolna
const socketsConnected = new Set()

io.on('connection', onConnected)

function onConnected(socket) {
  console.log(socket.id)
  socketsConnected.add(socket.id) // Client ID add ho gayi

  // Server sabhi connected clients ko total count bhej raha hai (Client ko, server ko nahi)
  io.emit('clients-total', socketsConnected.size)

  socket.on('disconnect', () => { // Fixed typo: 'disconnect' (pehle 'disconnet' tha)
    console.log('Socket disconnected', socket.id)
    socketsConnected.delete(socket.id) // Client remove ho gaya
    
    // Updated count sabhi clients ko broadcast kar rahe hain
    io.emit('clients-total', socketsConnected.size)
  })

   socket.on('message', (data) => {
    console.log(data)
    socket.broadcast.emit('message', data) // Broadcast to all other clients
  })



  socket.on('feedback', (data) => {
    socket.broadcast.emit('feedback', data)
  })

}



 