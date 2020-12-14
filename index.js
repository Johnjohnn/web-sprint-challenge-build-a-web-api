const express = require("express")     // importing express 
const userAction = require("./users/userAction")  // this imports the userAction file 


const server =  express()
const port = 5000                    // the port that the API will be listening 

// takes incoming request JSON data and parses it into 'req body'
server.use(express.json())







server.use(userAction)
server.listen(port , () => {
  console.log(`server running at http://localhost:${port}`)
})