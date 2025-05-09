import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import ExpenseTable from './ExpenseTable';
import ExpenseTrackeForm from './ExpenseTrackeForm';
import ExpenseDetails from './ExpenseDetails';

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [expense,setExpense]=useState([]);
    const [expenseAmt,setExpenseAmt]=useState(0);
    const [incomeAmt,setIncomeAmt]=useState(0);

    const navigate = useNavigate();
    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Loggedout');
        setTimeout(() => {
            navigate('/login');
        }, 1000)
    }

    useEffect(()=>{
        const amounts=expense.map((item)=>item.amount);

        const income=amounts.filter(item => item > 0)
        .reduce((acc,item)=>(acc+=item),0);

        const exp=amounts.filter(item => item < 0)
        .reduce((acc,item) => (acc+=item),0) *-1;
       setIncomeAmt(income);
       setExpenseAmt(exp);

    },[expense])
    const fetchExpenses = async () => {
        try {
            const url = `http://localhost:8080/expense`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            }
            const response = await fetch(url, headers);
            if(response.status=== 403){
                navigate('/login');
                return;
            }
            const result = await response.json();
            console.log(result.data);
            setExpense(result.data);
        
        } catch (err) {
            handleError(err);
        }
    }

     const addExpenses = async (data) => {
        try {
            const url = `http://localhost:8080/expense`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Content-type':'application/json'
                },
                method:'POST',
                body:JSON.stringify(data)
            }
            const response = await fetch(url, headers);
            if(response.status=== 403){
                navigate('/login');
                return;
            }
            const result = await response.json();
            console.log(result.data);
            setExpense(result.data);
            handleSuccess('Expense added Successfully');
        } catch (err) {
            handleError(err);
        }
    }

    const handleDeleteExpense = async (expenseId) => {
        try {
            const url = `http://localhost:8080/expense/${expenseId}`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Content-type':'application/json'
                },
                method:'DELETE',
            }
            const response = await fetch(url, headers);
            if(response.status=== 403){
                navigate('/login');
                return;
            }
            const result = await response.json();
            console.log(result.data);
            setExpense(result.data);
            handleSuccess('Expense added Successfully');
        } catch (err) {
            handleError(err);
        }
    }

    useEffect(() => {
        fetchExpenses()
    }, [])
  
  
    return (
        <div>
            <div className='user-section'>

            <h1>Welcome {loggedInUser}</h1>
            <button onClick={handleLogout}>Logout</button>
            </div>
            <ExpenseDetails incomeAmt={incomeAmt} expenseAmt={expenseAmt}/>
            <ExpenseTrackeForm addExpenses={addExpenses}/>
            <ExpenseTable expenses={expense} handleDeleteExpense={handleDeleteExpense}/>
            
            <ToastContainer />
        </div>
    )
}

export default Home