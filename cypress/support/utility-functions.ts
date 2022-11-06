import { contactForm } from "../fixtures/form-filling";

/**
 * 
 * This command will fill out the contact form. It will take an object as an input and destructure the values
 */
export const fillOutContactForm = ({ firstName, lastName, email, number, subject }: contactForm) => {
    // First Name
    cy.getDataTag('first-name')
        .clear()
        .type(firstName);
    // Last Name
    cy.getDataTag('last-name')
        .clear()
        .type(lastName);
    // Email
    cy.getDataTag('email')
        .clear()
        .type(email);
    // Number
    cy.getDataTag('number')
        .clear()
        .type(number);
    // Subject
    cy.getDataTag('subject')
        .clear()
        .type(subject);
};