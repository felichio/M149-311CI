

const retrieveTokenFromLocal = () => {
    const token = window.localStorage.getItem("_token");
    return token;
};


export default retrieveTokenFromLocal;