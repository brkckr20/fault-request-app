export const API = "http://localhost:3002";
export const getUserId = () => {
    const user = JSON.parse(localStorage.getItem("n-user"));
    return user ? user.id : null;
}