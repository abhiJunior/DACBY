import express from "express"

const app = express()


app.get("/",(req,res)=>{
    return res.status(200).send("Hello from server")
})
app.get("/api/health",(req,res)=>{
    return res.status(200).send("Server is running fine")
})

const PORT = 5000 


app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${5000}`)
})