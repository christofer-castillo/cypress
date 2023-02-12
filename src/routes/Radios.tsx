import { Box, styled, Typography } from "@mui/material";
import RadioButtons from '../components/UI/RadioButtons';

const RadioContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
});

const Radios = () => {
    return (
        <RadioContainer>
            <Typography variant='h3' sx={{ fontWeight: 'bold' }}>Radio buttons</Typography>
            <RadioButtons />
        </RadioContainer>
    );
};

export default Radios;
