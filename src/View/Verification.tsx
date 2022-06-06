import React, { useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  Button,
  IconButton,
  Stack,
  Box,
  Container,
  Alert,
  AlertTitle,
} from '@mui/material';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import verificationimg from '../assets/img/verification.png';
import logoimg from '../assets/img/logo.png';
import { useLocation, Navigate } from 'react-router-dom';
import PinInputGrid from '../Components/PinInputGrid';

const StyledIcon = {
  transform: 'scaleX(-1)',
  color: '#DF201F',
  margin: 2,
  fontSize: '2rem',
};

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
  px: 8,
};

const PIN_LENGTH = 4;

interface VerificationProps {
  VerificationHandler: (
    e: React.FormEvent<HTMLFormElement>,
    pin: (number | undefined)[],
    MobileNo: string | undefined
  ) => any;
  errorMessage: string | undefined;
}

const Verification: React.FC<VerificationProps> = ({
  VerificationHandler,
  errorMessage,
}) => {
  const [MobileNo, setMobileNo] = useState<string>('');
  const location: any = useLocation();

  const [pin, setPin] = useState<Array<number | undefined>>(
    new Array(PIN_LENGTH)
  );

  const onPinChanged = (pinEntry: number | undefined, index: number) => {
    const newPin = [...pin];
    newPin[index] = pinEntry;
    setPin(newPin);
  };

  useEffect(() => {
    if (location?.state !== null) {
      setPin([...location?.state?.otp]);
      setMobileNo(location?.state?.MobileNo || '');
    }
  }, [location]);

  if (location?.state === null) {
    return <Navigate to='/login' />;
  }

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
          <form onSubmit={(e) => VerificationHandler(e, pin, MobileNo)}>
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
                Verification
              </Typography>
              <Typography
                variant='body1'
                sx={{ color: '#A2A3A5', fontFamily: 'Bai Jamjuree' }}
              >
                Enter the OTP sent to {MobileNo}
              </Typography>
              <Stack direction='row' alignItems='center' gap={2} p={3}>
                <PinInputGrid
                  onPinChanged={onPinChanged}
                  pin={pin}
                  pinLength={PIN_LENGTH}
                />
              </Stack>
              <Typography
                variant='body1'
                sx={{ color: '#DF201F', fontFamily: 'Bai Jamjuree', margin: 2 }}
              >
                Sec 30
              </Typography>
              <Stack direction='row' alignItems='center' gap={1}>
                <Typography variant='body2' sx={{ fontFamily: 'Bai Jamjuree' }}>
                  Resend OTP
                </Typography>
                <IconButton aria-label='resendOTP'>
                  <ReplayCircleFilledIcon style={StyledIcon} />
                </IconButton>
              </Stack>
              <Button
                type='submit'
                variant='contained'
                size='large'
                sx={ButtonStyle}
              >
                Verification
              </Button>
            </Box>
          </form>
        </Grid>
        <Grid item lg={5} md={5} sm={5} xs={5}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img
              src={verificationimg}
              alt='verification'
              style={{ height: '100%', width: '100%' }}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Verification;
