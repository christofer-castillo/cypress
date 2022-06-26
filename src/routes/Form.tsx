import * as React from 'react';
import { useState } from 'react';
import './Form.css';

const Form = () => {
    const [firstName, setFirstName] = useState('');
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastName, setLastName] = useState('');
    const [lastNameError, setLastNameError] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [num, setNum] = useState('');
    const [numError, setNumError] = useState(false);
    const [subject, setSubject] = useState('');
    const [subjectError, setSubjectError] = useState(false);

    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value);
    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value);
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handleNumChange = (e: React.ChangeEvent<HTMLInputElement>) => setNum(e.target.value);
    const handleSubjectChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setSubject(e.target.value);

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        // console.log(e);

        if (!firstName || firstName.trim() === '') {
            setFirstNameError(true);
        }

        if (!lastName || lastName.trim() === '') {
            setLastNameError(true);
        }

        if (!num || num.trim() === '') {
            setNumError(true);
        }

        if (!email || email.trim() === '') {
            setEmailError(true);
        }

        if (!subject || subject.trim() === '') {
            setSubjectError(true);
        }
    };

    return (
        <div>
            <h3>Contact Form</h3>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="firstname">First Name</label>
                        <input type="text" id="firstname" name="firstname" placeholder="Given name" data-cy="first-name" value={firstName} onChange={handleFirstNameChange} className={`${firstNameError ? 'error' : ''}`} />
                        {firstNameError && <div className="error">First name is required</div>}
                    </div>
                    <div>
                        <label htmlFor="lastname">Last Name</label>
                        <input type="text" id="lastname" name="lastname" placeholder="Family name" data-cy="last-name" value={lastName} onChange={handleLastNameChange} className={`${lastNameError ? 'error' : ''}`} />
                        {lastNameError && <div className="error">Last name is required</div>}
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" name="email" placeholder="Email address" data-cy="email" value={email} onChange={handleEmailChange} className={`${emailError ? 'error' : ''}`} />
                        {emailError && <div className="error">Invalid email format</div>}
                    </div>
                    <div>
                        <label htmlFor="favorite-number">Favorite Number</label>
                        <input type="number" min="0" max="100" id="favorite-number" placeholder="Pick your favorite number (0-100)" data-cy="number" value={num} onChange={handleNumChange} className={`${numError ? 'error' : ''}`} />
                        {numError && <div className="error">Your favorite number is required</div>}
                    </div>
                    <div>
                        <label htmlFor="favorite-subject">Favorite Subject</label>
                        <textarea name="favorite-subject" placeholder="Please input the subject" id="favorite-subject" data-cy="subject" value={subject} onChange={handleSubjectChange} className={`${subjectError ? 'error' : ''}`} />
                        {subjectError && <div className="error">Subject is required</div>}
                    </div>
                    <input type="submit" value="Submit" data-cy="submit"/>
                    <button aria-label="some button" onClick={() => alert('Was found')}>Aria button</button>
                </form>
            </div>
        </div>
    )
};

export default Form;