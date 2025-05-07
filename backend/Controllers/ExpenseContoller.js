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


const deleteExpense=async(req,res)=>{
    const {_id}=req.user;
    const {expesneId}=req.params;
    try {
        const userData=await UserModel.findByIdAndUpdate(
            _id,{
                $pull:{expenses:{_id:expesneId}}
            },
            {new :true}
        ) ;
        return res.status(200).json({
            message:"Expense Deleted successfully",
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



const fetchExpense=async(req,res)=>{
    const body=req.body;
    const {_id}=req.user;
    try {
        const userData=await UserModel.findById(_id).select('expenses');
        return res.status(200).json({
            message:"Fetched Expenses successfully",
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

module.exports={
    addExpense,
    deleteExpense,
    fetchExpense
}