import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError } from '../utils';

function ExpenseTrackeForm({addExpenses}) {

    const[expenseInfo,setExpenseInfo]=useState({text:'',amount:''});

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copyExpenseInfo = { ...expenseInfo };
        copyExpenseInfo[name] = value;
        setExpenseInfo(copyExpenseInfo);
    }

    const handleExpense=(e)=>{
        e.preventDefault();
        const{text,amount}=expenseInfo;
        if(!text || !amount){
            handleError('All fields are required');
            return;
        }
        setTimeout(()=>{
            setExpenseInfo({text:'',amount:''});
        },1000);
        addExpenses(expenseInfo);

    }
  return (
     <div className='container'>
      <h1>Expense Tracker</h1>
      <form onSubmit={handleExpense}>
       
        <div>
          <label htmlFor='email'>Expense Description</label>
          <input
            onChange={handleChange}
            type='text'
            name='text'
            placeholder='Enter your Expense Info...'
            value={setExpenseInfo.text}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            onChange={handleChange}
            type='amount'
            name='amount'
            placeholder='Enter your Expense amount...'
            value={setExpenseInfo.amount}
          />
        </div>
        <button type='submit'>Add Expense</button>
       

      </form>
      <ToastContainer />
    </div> 

  )
}

export default ExpenseTrackeForm
