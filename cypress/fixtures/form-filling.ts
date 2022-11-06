export interface contactForm {
    firstName: string;
    lastName: string;
    email: string;
    number: string;
    subject: string;
}

export const validInformation: contactForm = {
    firstName: 'Chris',
    lastName: 'Castillo',
    email: 'ccchris@gmail.com',
    number: '10',
    subject: 'I think cherries are an underrated fruit.'
};

export const invalidInformation: contactForm = {
    firstName: 'Chris',
    lastName: 'Castillo',
    email: 'gmail',
    number: 'asdf',
    subject: 'I think cherries are an underrated fruit.'
};

export const spacesFixture: contactForm = {
    firstName: ' ',
    lastName: ' ',
    email: ' ',
    number: '1',
    subject: ' '
};