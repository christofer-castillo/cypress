// selectors
const form = document.querySelector('form');
const firstName = form.elements[0];
const lastName = form.elements[1];
const email = form.elements[2];
const number = form.elements[3];
const subject = form.elements[4];

const requiredFields = [{
        input: firstName,
        message: 'First name is required'
    },
    {
        input: lastName,
        message: 'Last name is required'
    },
    {
        input: email,
        message: 'Email is required'
    },
    {
        input: subject,
        message: 'Subject is required'
    },
    {
        input: number,
        message: 'Your favorite number is required'
    }
];

function error(input, message) {
    input.className = 'error';
    // show error msg
    const error = input.previousElementSibling;
    error.innerText = message;
    return false;
};

function success(input) {
    input.className = 'success';
    const error = input.previousElementSibling;
    error.innerText = '';
    return true;
};

function requireValue(input, message) {
    return input.value.trim() === '' ?
        error(input, message) : success(input);
}

function validateEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(input.value.trim()) ? success(input) : error(input, 'Invalid email format');
}


form.addEventListener('submit', event => {
    let valid = true;

    // check the required fields
    requiredFields.forEach(input => {
        valid = requireValue(input.input, input.message);
    });

    // validate email
    if (valid) {
        valid = validateEmail(email);
    }

    // stop the submission if data is invalid
    if (!valid) {
        event.preventDefault();
    }
});