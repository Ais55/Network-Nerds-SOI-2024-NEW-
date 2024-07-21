import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';
const Logout = ({setRole}) => {
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/auth/logout`)
            .then(res => {
                if (res.data.logout) {
                    setRole('guest');
                    // Cookies.remove('token')
                    navigate('/');
                }
            })
            .catch(err => console.log(err));
    }, []);

}

export default Logout;
