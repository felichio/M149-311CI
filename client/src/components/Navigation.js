import React, {useState} from "react";
import {useHistory} from "react-router-dom";



const Navigation = props => {
    
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    let history = useHistory();

    const signOut = ev => {
        window.localStorage.removeItem("_token");
        history.push("/");
    };

    const showUpdateUser = ev => {
        setIsDropdownVisible(false);
        props.setVisibleComponents(prev => ({
            ...prev,
            updateUser: true,
        }));
    }

    return <div className="navigation">
        <div className="navigation__welcome">
            Welcome {props.profile.username}
        </div>
        <div className="navigation__cog">
            <i className="fa fa-cog fa-2x navigation__cog--cog" onClick={ev => setIsDropdownVisible(prev => !prev)}></i>
            <div className="navigation__cog__links">
                {isDropdownVisible ? [<button key={1}  className="navigation__cog__links--button" onClick={showUpdateUser}>Update my Info</button>, 
                    <button key={2} className="navigation__cog__links--button" onClick={signOut}>Sign Out</button>]: undefined} 
            </div>
        </div>
    </div>

};



export default Navigation;