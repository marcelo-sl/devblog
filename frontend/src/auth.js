export const isAuthenticated = () => {
    if (localStorage.getItem('user-token')) return true;
    return false;
}