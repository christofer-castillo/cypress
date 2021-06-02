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

function showTypedCharacter(e) {
    alert(`Key pressed: ${e.key} \n CTRL key pressed: ${e.ctrlKey}.`);
}

document.querySelector('#key-combo').addEventListener('keypress', showTypedCharacter);

document.body.addEventListener('keydown', (e) => {
    if (e.code === '40') {
        alert('something happened');
    } else {
        alert(`Something, ${e.code}`);
    }
});