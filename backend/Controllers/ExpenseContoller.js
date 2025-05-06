

const addExpense=(req,res)=>{
    res.send('addExpense');
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