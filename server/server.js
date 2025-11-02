import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import colors from 'colors'
import cookieParser from 'cookie-parser';

import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import connectDB from './config/db.js';
const app =express()
const port =process.env.PORT || 5050;

app.use(cors({
    origin:"https://curly-space-robot-r45x975r6ggwf5jq5-5173.app.github.dev",
    allowedHeaders:['Content-Type','Authorization','Cookie',"X-Custom Head"],
    methods:['GET','POST','PUT','DELETE','OPTIONS','PARSE'],
    credentials:true,
}))
app.use(express.json())
app.use(cookieParser())
app.use('/api/users',userRoutes)
app.use('/api/products',productRoutes)

connectDB()
app.get('/', (req,res)=>{
    res.send('Server is running ...')
})

app.listen(port,()=>console.log(`Server is running on port: ${port}`.yellow))
