const express =require('express');
const app =express();
const bodyParser=require('body-parser');
const cors=require('cors')
const AuthRouter=require('./Routes/AuthRouter');
const ExpenseRouter=require('./Routes/ExpenseRoter');
const ensureAuthenticated = require('./Middlewares/Auth');
require('dotenv').config();
require('./Models/db')
const PORT =process.env.PORT || 8080

app.get('/ping',(req,res)=>{
    res.send('Pong');
})

app.use(bodyParser.json());
app.use(cors());
app.use('/auth',AuthRouter)
app.use('/expense',ensureAuthenticated,ExpenseRouter);

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})