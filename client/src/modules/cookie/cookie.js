

export function setCookie(cName, cVal, days) {
    var d = new Date();
    d.setTime(d.getTime() + (days*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();

    document.cookie = cName + "=" + cVal + ";" + expires + ";path=/";
}



export function showCookie() {
    console.log(document.cookie);
}


export function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}


export function deleteCookie(cName) {
    document.cookie = cName + "=; expires=Thu, 01 Jan 2010 00:00:00 UTC; path=/;";
}