import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setRoleVar }) => {
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3001/auth/login')
            .then(res => {
                if (res.data.logout) {
                    setRole('');
                    navigate('/');
                }
            })
            .catch(err => console.log(err));
    }, [setRoleVar, navigate]);

}

export default Logout;
