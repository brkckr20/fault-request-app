export const API = "http://localhost:3002";
export const getUserId = () => {
    const user = JSON.parse(localStorage.getItem("n-user"));
    return user ? user.id : null;
}

export const dateDiff = (tarih1, tarih2) => {
    const date1 = new Date(tarih1);
    const date2 = new Date(tarih2);

    const farkMilisaniye = Math.abs(date1 - date2);

    const farkSaniye = farkMilisaniye / 1000;

    return farkSaniye;
}