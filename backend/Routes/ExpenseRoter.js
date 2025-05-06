const router =require('express').Router();
const { fetchExpense, addExpense, deleteExpense } = require('../Controllers/ExpenseContoller');
const { route } = require('./AuthRouter');

const express = require('express').Router();

router.get('/',fetchExpense);
router.post('/',addExpense);
router.delete('/:expesneId',deleteExpense);

router.get('/',(req,res)=>res.send('expense get metod working'));

module.exports=router;
