import React, { useEffect } from 'react';
import { FormControlLabel, Checkbox } from '@mui/material';
import './Checkboxes.css';

const Checkboxes = () => {
    useEffect(() => {
        // This whole effect is to just show the indeterminate state
        // Only way for a checkbox to get into this state is via JavaScript
        const indeterminateCheckbox = document.getElementById('indeterminate') as HTMLInputElement;

        if (indeterminateCheckbox) {
            indeterminateCheckbox.indeterminate = true;
        }
        
    }, []);

    return (
        <div className="container">
            <div className="checkbox-header">
                <h1>Checkboxes everywhere!</h1>
                <section className="checkbox-container" id='first-section'>
                    <h2>This section is to display the purpose of the <code>cy.check()</code> command.</h2>
                    <FormControlLabel className='checkbox' control={<Checkbox />} label='First Unchecked Checkbox' />
                    <FormControlLabel className='checkbox' control={<Checkbox />} label='Second Unchecked Checkbox' />
                    <FormControlLabel className='checkbox' control={<Checkbox />} label='Third Unchecked Checkbox' />
                    <FormControlLabel className='checkbox' control={<Checkbox />} label='Fourth Unchecked Checkbox' />
                </section>
                <section className='checkbox-container' id='second-section'>
                    <h2>This section is to display the purpose of the <code>cy.uncheck()</code> command</h2>
                    <FormControlLabel className='checkbox' control={<Checkbox defaultChecked />} label='First Checked Checkbox' />
                    <FormControlLabel className='checkbox' control={<Checkbox defaultChecked />} label='Second Checked Checkbox'  />
                    <FormControlLabel className='checkbox' control={<Checkbox defaultChecked />} label='Third Checked Checkbox' />
                    <FormControlLabel className='checkbox' control={<Checkbox defaultChecked />} label='Fourth Checked Checkbox'  />
                </section>
                <section className='checkbox-container' id='third-section'>
                    <h2>This section is to display the different states of a checkbox</h2>
                    <FormControlLabel className='checkbox' control={<Checkbox indeterminate id='indeterminate' />} label='Indeterminate Checkbox' />
                    <FormControlLabel className='checkbox' control={<Checkbox disabled id='disabled-checkbox' />} label='Disabled Checkbox' />
                </section>
            </div>
        </div>
    );
};

export default Checkboxes;