import React, { useState } from 'react';
import { InputBox, Button } from '../components';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

function SendMoneyComponent() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const name = searchParams.get('name');
    const [amount, setAmount] = useState('');

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleSendMoney = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try{
            const response = await axios.post('http://localhost:8000/api/v1/account/transfer', {
                receiverId: id,
                amount: amount
            },{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Include token in Authorization header
                }
            });
            alert(response.data.message);
        }
        catch(err){
            alert(err.response.data.error);
        }
        
    };

    return (
        <div className="p-4 max-w-sm mx-auto bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Send Money</h1>
            <p className="mb-4">Friend's Name: <span className="font-semibold">{name}</span></p>
            <form onSubmit={handleSendMoney}>
                <InputBox
                    label="Amount"
                    type="number"
                    onChange={handleAmountChange}
                    value={amount}
                    placeholder={`Enter amount to send to ${name}`}
                />
                <Button type="submit" label="Send Money"/>
            </form>
        </div>
    );
}

export default SendMoneyComponent;
