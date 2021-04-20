import React from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

const Logout = () => {
    const dispatch = useDispatch();

    dispatch({
        type: "DELETE_TOKEN",
    });
    dispatch({
        type: "DELETE_ADMIN",
    });
    return (
        <>
            <h4>Logged Out!</h4>
        </>
    );
};

export default Logout;
