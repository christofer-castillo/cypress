import * as React from 'react';

const Form = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [state, setState] = React.useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setState(`This is the value entered = Username: ${username} Password: ${password}`);
    };

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value);

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username</label>
                <input type="text" id='username' value={username} onChange={handleUsernameChange} />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id='password' value={password} onChange={handlePasswordChange} />
            </div>
            <button type="submit">Submit</button>
            <div>{state}</div>
      </form>
    )
};

export default Form;