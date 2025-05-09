import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import ExpenseTable from './ExpenseTable';
import ExpenseTrackeForm from './ExpenseTrackeForm';

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [expense,setExpense]=useState([]);
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
            <ExpenseTrackeForm addExpenses={addExpenses}/>
            <ExpenseTable expenses={expense} />
            
            <ToastContainer />
        </div>
    )
}

export default Home