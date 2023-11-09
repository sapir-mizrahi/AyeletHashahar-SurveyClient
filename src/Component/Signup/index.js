import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './style.css';
import { BiImageAdd } from 'react-icons/bi';
import {
    Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { actions } from '../../Redux/actions';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';
import defaultProfile from '../../image/default.png';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();
const mapStateToProps = (state) => ({
    allSurveys: state.surveyReducer.allSurveys,

})
const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (user) => dispatch(actions.signIn(user)),
        signUp: (user) => dispatch(actions.signUp(user))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(function SignUp(props) {
    const { signIn, signUp, setUserDetails } = props;
    const [needslogin, setNeedslogin] = useState(false)
    const navigate = useNavigate();
    const [profileImg, setProfileImg] = useState(defaultProfile);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let userData = {
            firstName: data.get("firstName"),
            lastName: data.get("lastName"),
            email: data.get('email'),
            password: data.get('password'),
            imgUrl: profileImg
        }
        const res = await signIn(userData)
        if (res.message === 'user not found') {
            const response = await signUp(userData)
            if (response) {
                localStorage.setItem("userDetaild", JSON.stringify(response));
                setUserDetails(JSON.parse(localStorage.getItem('userDetails')));
                navigate('/create-survey');
            }
        }
        else {
            setNeedslogin(true)
        }

    }
    const onChangeHandlerImg = (event) => {
        const reader = new FileReader();
        const file = event;
        reader.onloadend = () => {
            setProfileImg(reader.result);
        };
        reader.readAsDataURL(file);
        var fileToUpload = event
        var myFile = new FormData();
        myFile.append("file", fileToUpload);
    }
    return (
        <div className='sign-main'>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>

                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                            </Grid>

                            <div className='upload-img'>
                                <div className='profile-img row'>
                                    <Form.Label className='title-inputs-package-img'>Upload image</Form.Label>
                                    <form className='package-img-div row' noValidate autoComplete="off" style={{
                                        display: 'flex'
                                    }}>
                                        <label className='lable-upload-img' for="profileImg">
                                            <div className='icon-add-img'><BiImageAdd /></div>
                                        </label>
                                        <input
                                            type={"file"}
                                            id="profileImg"
                                            htmlFor="myInput"
                                            accept="image/*"
                                            style={{
                                                display: 'none',
                                                cursor: 'pointer'
                                            }}
                                            onChange={(e) => onChangeHandlerImg(e.target.files[0])}
                                        /></form>
                                </div>
                                {<img className="profile-image-img" referrerpolicy="no-referrer" src={profileImg} />}
                            </div>
                            {needslogin && <Alert severity="warning">We know you, you just need a Sign in</Alert>}

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 5 }} />
                </Container>
            </ThemeProvider>
        </div>
    );
})