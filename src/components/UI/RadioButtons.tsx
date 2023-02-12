import React, { useEffect, useState } from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Box, styled } from "@mui/material";

const ExampleContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px',
    width: '70vw'
});

const RadioButtons = () => {
    const [firstGroupValue, setFirstGroupValue] = useState('2');
    const [secondGroupValue, setSecondGroupValue] = useState('1');
    const [disabled, setDisabled] = useState(true);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, stateSetter: React.Dispatch<React.SetStateAction<string>>) => {
        e.persist();
        stateSetter(e.target.value);
    };

    useEffect(() => {
        if (firstGroupValue !== '2' && secondGroupValue !== '1') {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [firstGroupValue, secondGroupValue]);

    return (
        <Box>
            <ExampleContainer>
                <FormControl>
                    <FormLabel id='first-group'>First Group</FormLabel>
                    <RadioGroup
                        aria-labelledby='first-group'
                        name="first-group"
                        value={firstGroupValue}
                        onChange={(e) => handleChange(e, setFirstGroupValue)}
                    >
                        <FormControlLabel value={1} control={<Radio />} label="First" />
                        <FormControlLabel value={2} control={<Radio />} label="Second" />
                        <FormControlLabel value={3} control={<Radio />} label="Third" />
                    </RadioGroup>
                </FormControl>
            </ExampleContainer>
            <ExampleContainer>
                <FormControl>
                    <FormLabel id='second-group'>Second Group</FormLabel>
                    <RadioGroup
                        aria-labelledby='second-group'
                        name='second-group'
                        value={secondGroupValue}
                        onChange={(e) => handleChange(e, setSecondGroupValue)}
                    >
                        <FormControlLabel value={1} control={<Radio />} label='First' />
                        <FormControlLabel value={2} control={<Radio />} label='Second' />
                        <FormControlLabel value={3} control={<Radio />} label='Third' />
                    </RadioGroup>
                </FormControl>
            </ExampleContainer>
            <ExampleContainer>
                <FormControl>
                    <FormLabel id='third-group'>Third Group</FormLabel>
                    <RadioGroup
                        aria-labelledby='third-group'
                        name='third-group'
                        defaultValue='Blue'
                    >
                        <FormControlLabel value='Red' control={<Radio id='Red' />} label='Red' disabled={disabled} />
                        <FormControlLabel value='Blue' control={<Radio id='Blue' />} label='Blue' />
                        <FormControlLabel value='Green' control={<Radio id='Green' />} label='Green' />
                    </RadioGroup>
                </FormControl>
            </ExampleContainer>
        </Box>
    );
};

export default RadioButtons;
