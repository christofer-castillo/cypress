// Basic way to generate the cookie
function cookieGenerator(name, value) {
    return `${name}=${value}`;
}

document.querySelector('#clicked').addEventListener('click', () => {
    if (document.cookie.split(';').some((item) => item.trim().startsWith('Las Vegas'))) {
        alert('Cookie exists');
    } else {
        document.cookie = cookieGenerator('Las Vegas', 'Raiders');
        document.cookie = cookieGenerator('Kansas City', 'Chiefs');
    }
});

document.body.addEventListener('keydown', e => {
    alert(`Key Pressed: ${e.key}`);
});