import React, { useState } from 'react';
import {
  Grid,
  Typography,
  InputAdornment,
  TextField,
  Button,
  Container,
  Box,
  Alert,
  AlertTitle,
} from '@mui/material';
import { withStyles } from '@mui/styles';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import logoimg from '../assets/img/logo.png';
import backgroundimg from '../assets/img/elipse.png';
import welcomeimg from '../assets/img/Online_Shoping_29-ai.png';

const StyledTextField = withStyles({
  root: {
    '& .MuiInput-root': {
      fontFamily: 'Montserrat Alternates',
      fontWeight: 600,
      paddingBottom: 12,
      fontSize: '1.125rem',
    },
    '& .MuiInputLabel-root': {
      fontFamily: 'Montserrat Alternates',
      fontWeight: 600,
      color: 'black',
    },
  },
})((props: any) => <TextField {...props} />);

const ButtonStyle = {
  borderRadius: 7,
  marginTop: 4,
  backgroundColor: '#DF201F',
  boxShadow: '2px 2px 25px 2px rgba(223, 32, 31, 0.5);',
  fontFamily: 'Bai Jamjuree',
  ':hover': {
    backgroundColor: '#c81c1b',
    boxShadow: '2px 2px 25px 2px rgba(223, 32, 31, 0.5);',
  },
  py: 2,
  px: 12,
};

const imgBoxtyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundImage: `url(${backgroundimg})`,
  backgroundSize: '80% 93%',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
};

const validateMobileNo = /^[6-9]\d{0,9}$/g;

interface LoginProps {
  GetOtpHandler: (e: React.FormEvent<HTMLFormElement>, MobileNo: string) => any;
  errorMessage: string | undefined;
}

const Login: React.FC<LoginProps> = ({ GetOtpHandler, errorMessage }) => {
  const [MobileNo, setMobileNo] = useState<string>('');
  const [MobileNoErr, setMobileNoErr] = useState(false);

  const OnMobileNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '' || e.target.value.match(validateMobileNo)) {
      setMobileNoErr(false);
      setMobileNo(e.target.value);
    } else {
      setMobileNoErr(true);
    }
  };

  return (
    <Container maxWidth='lg'>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='center'
        minHeight='100vh'
        columns={{ xs: 4, sm: 10, md: 12 }}
      >
        {errorMessage && (
          <Grid container justifyContent='center'>
            <Grid item lg={6} md={6} sm={12} xs={12} p={2}>
              <Alert severity='error'>
                <AlertTitle>Error</AlertTitle>
                {`${errorMessage}`} — <strong>check it out!</strong>
              </Alert>
            </Grid>
          </Grid>
        )}
        <Grid item lg={4} md={4} sm={4} xs={4} p={2}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img src={logoimg} alt='logoimage' />
            <Typography
              variant='h4'
              sx={{ fontWeight: 600, fontFamily: 'Bai Jamjuree', mt: 2 }}
            >
              Welcome Back
            </Typography>
            <Typography
              variant='h6'
              sx={{ color: '#A2A3A5', fontFamily: 'Bai Jamjuree' }}
            >
              Login Account
            </Typography>
            <form onSubmit={(e) => GetOtpHandler(e, MobileNo)}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <StyledTextField
                  label='Mobile No'
                  variant='standard'
                  value={MobileNo}
                  onChange={OnMobileNoChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <LocalPhoneRoundedIcon />
                      </InputAdornment>
                    ),
                  }}
                  error={MobileNoErr}
                  helperText={MobileNoErr && 'Enter Numbers Only'}
                />

                <Button
                  type='submit'
                  variant='contained'
                  size='large'
                  sx={ButtonStyle}
                >
                  Get OTP
                </Button>
              </Box>
            </form>
          </Box>
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6}>
          <Box sx={imgBoxtyle}>
            <img
              src={welcomeimg}
              alt='welcomeImage'
              style={{ height: '100%', width: '100%' }}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
