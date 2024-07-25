import Cookies from "js-cookie";

export const SaveCookies = (name, value) => {
    Cookies.set(name, JSON.stringify(value), {
        expires: 1,
        path: '/',
        secure: true,
        sameSite: 'strict'
    });
};

export const GetCookies = (name) => {
    const cookieValue = Cookies.get(name);
    if (cookieValue === undefined) {
        return false; // No cookie found with the specified name
    } else {
        let get = JSON.parse(JSON.parse(cookieValue))
        console.log(get._id);


        return true






    }
};



export const RemoveCookies = (name) => {
    Cookies.remove(name);
};

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}