import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = (props) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkAdminToken = () => {
        const adminToken = sessionStorage.getItem('admin-token');
        if (!adminToken || adminToken === 'undefined') {
            setIsLoggedIn(false);
            const returnUrl = props.returnUrl || window.location.pathname;
            navigate('/Login?returnUrl=' + returnUrl);
        } else {
            setIsLoggedIn(true);
        }
    }

    useEffect(() => {
        checkAdminToken();
    }, []); 

    return (
        <>
            {isLoggedIn ? props.children : null}
        </>
    );
}

export default ProtectedRoute;
