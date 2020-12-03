import React, { useState } from "react";
import Spinner from "./Spinner";

const withLoading = (C) => {
    
    return props => {
        
        return <div>
            {props.isLoading ? <Spinner></Spinner> : <C {...props} ></C>}
        </div>
    }
};


export default withLoading;