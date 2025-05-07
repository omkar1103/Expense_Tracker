const UserModel = require("../Models/User");


const addExpense= async(req,res)=>{
    const body=req.body;
    const {_id}=req.user;
    try {
        const userData=await UserModel.findByIdAndUpdate(
            _id,{
                $push:{expenses:body}
            },
            {
                new:true
            }
        ) ;
        return res.status(200).json({
            message:"Expense Added successfully",
            success:true,
            data:userData?.expenses
        })
        
    } catch (err) {
        return res.send(500).json({
            message:"Something went wrong",
            error:err,
            success:false
        })
        
    }
}


const deleteExpense=(req,res)=>{
    res.send('deleteExpense');
}



const fetchExpense=(req,res)=>{
    res.send('fetchExpense');
}

module.exports={
    addExpense,
    deleteExpense,
    fetchExpense
}