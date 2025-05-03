

const addExpenses = async (req, res) => {
    const body = req.body;
    const { _id } = req.user;

    try {
        const UserData = await UserModel.findByIdAndUpdate(
            _id,
            { $push: { expenses: body } },
            { new: true }
        );

        console.log(body);
        res.send('success');
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err,
            success: false
        });
    }
};
const fetchExpense=(res,req)=>{
    res.send('addExpense');
}
const deleteExpenses=(res,req)=>{
    res.send('addExpense');
}

module.exports={
    addExpenses,
    fetchExpense,
    deleteExpenses
}