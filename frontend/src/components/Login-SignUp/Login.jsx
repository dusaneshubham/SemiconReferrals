import React from 'react';
import { useState } from 'react';
import { IconButton, OutlinedInput, InputAdornment, FormControl, Button, Link } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Box from '@mui/material/Box';

const Login = () => {

    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const setLoginInput = (prop) => (event) => {
        setLoginData({ ...loginData, [prop]: event.target.value });
    }

    return (
        <>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <div>
                    <FormControl sx={{ m: 1, width: "99%" }} variant="outlined">
                        <label className="my-2">Email</label>
                        <OutlinedInput
                            id="login-email"
                            type='email'
                            value={loginData.email}
                            onChange={setLoginInput('email')}
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: "99%" }} variant="outlined">
                        <label className="my-2">Password</label>
                        <OutlinedInput
                            id="login-password"
                            type={showLoginPassword ? 'text' : 'password'}
                            value={loginData.password}
                            onChange={setLoginInput('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                                        edge="end"
                                    >
                                        {showLoginPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <div className="float-end my-2">
                        <Link className="text-decoration-none" style={{ cursor: "pointer" }}>Forgotten password?</Link>
                    </div>
                    <FormControl sx={{ m: 1, width: "99%" }} variant="outlined">
                        <Button variant="contained">
                            Login
                        </Button>
                    </FormControl>
                </div>
            </Box>
        </>
    )
}

export default Login