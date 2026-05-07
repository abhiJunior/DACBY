import express from "express"
import connectToDB from "./Config/dbConfig.js"
import cors from "cors"
import authRouter from "./routes/auth.js"

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use("/api/auth",authRouter)

app.get("/",(req,res)=>{
    return res.status(200).send("Hello from server")
})
app.get("/api/health",(req,res)=>{
    return res.status(200).send("Server is running fine")
})

const PORT = 5000 


app.listen(PORT,async()=>{
    await connectToDB()
    console.log(`Server is running at http://localhost:${5000}`)
})