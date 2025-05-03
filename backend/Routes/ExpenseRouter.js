const { fetchExpense, addExpenses, deleteExpenses } = require("../Controllers/ExpenseController");
const express = require('express'); // ✅ You forgot this line

const router = express.Router();


router.get('/',fetchExpense);

router.post('/',addExpenses);

router.delete('/expenseId',deleteExpenses);


module.exports=router;