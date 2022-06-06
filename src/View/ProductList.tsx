import React, { useState } from 'react';
import {
  Grid,
  InputAdornment,
  TextField,
  Typography,
  Stack,
  Button,
  Container,
  Pagination,
  Paper,
  Box,
} from '@mui/material';
import { withStyles } from '@mui/styles';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import NavBar from './NavBar';
import axios from 'axios';
import { useUserAuth } from '../Context/UserAuthContext';
import { StyledEngineProvider } from '@mui/material/styles';
import ModalComp from './ModalComp';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import ProductTableController from '../Components/ProductTableController';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const StyledPagination = withStyles({
  root: {
    '& .MuiPaginationItem-root': {
      color: '#A2A3A5',
      fontFamily: 'Bai Jamjuree',
      fontWeight: '600',
      '&:hover': {
        backgroundColor: '#DF201F',
        color: '#FFFF',
      },
    },
    '& .Mui-selected': {
      backgroundColor: '#DF201F',
      color: '#FFFF',
      fontFamily: 'Bai Jamjuree',
      fontWeight: '600',
    },
  },
})((props: any) => <Pagination {...props} />);

const AddNewProductBtnStyle = {
  borderRadius: 7,
  backgroundColor: '#94CD00',
  boxShadow: '2px 2px 25px 2px rgba(148, 205, 0, 0.4);',
  fontFamily: 'Bai Jamjuree',
  ':hover': {
    backgroundColor: '#85b800',
    boxShadow: '2px 2px 25px 2px rgba(148, 205, 0, 0.4);',
  },
};

const ProductList = () => {
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [productImgURL, setProductImgURL] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDiscountPrice, setProductDiscountPrice] = useState('');
  const [productUnit, setProductUnit] = useState('');
  const [productStock, setProductStock] = useState('');
  const [productIsVeg, setProductIsVeg] = useState<any>(true);
  const [productIsEnabled, setProductIsEnabled] = useState<any>(true);
  const [productDescription, setProductDescription] = useState('');
  const [productWeight, setProductWeight] = useState('');
  const [productPackagingCharges, setProductPackagingCharges] = useState('');
  const [productData, setProductData] = useState<any[]>([]);
  const [productId, setProductId] = useState('');
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [response, setResponse] = useState<any>({});
  const [paginationCount, setPaginationCount] = useState<number>(0);
  const [paginationCurrentPage, setPaginationCurrentPage] = useState<number>(1);
  const [searchData, setSearchData] = useState('');

  type textChangeEvent = React.ChangeEvent<HTMLInputElement>;
  const ctx = useUserAuth();
  const token = ctx?.token;
  const userID = ctx?.userData?._id;
  const productsPerPage = 5;

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleAlertClick = () => {
    setOpenAlert(true);
  };

  const handleAlertClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  const getData = () => {
    axios
      .get(
        `https://extended-retail-app.herokuapp.com/api/products/getMenuItems?userId=${userID}`,
        {
          headers: {
            token: `${token}`,
          },
        }
      )
      .then((response: any) => {
        setProductData(response.data.data);
        if (
          response.data.data.length > 0 &&
          response.data.data.length % productsPerPage === 0
        ) {
          setPaginationCount(response.data.data.length / productsPerPage);
        } else {
          setPaginationCount(
            Math.floor(response.data.data.length / productsPerPage) + 1
          );
        }
      })
      .catch((error) => console.log('Error while geting Data: ', error));
  };

  const onEditChange = (item: any) => {
    setIsUpdating(true);
    setProductImgURL(item.image);
    setProductName(item.name);
    setProductDiscountPrice(item.discountPrice);
    setProductUnit(item.unit);
    setProductIsVeg(item.isVeg);
    setProductIsEnabled(item.enabled);
    setProductDescription(item.description);
    setProductWeight(item.weight);
    setProductStock(item.stock);
    setProductPrice(item.price);
    setProductPackagingCharges(item.packingCharges);
    setProductId(item._id);
    handleOpen();
  };

  const onSearchChange = (e: textChangeEvent) => {
    setSearchData(e.target.value);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPaginationCurrentPage(value);
  };

  const modalCompProps = {
    isUpdating,
    productId,
    productImgURL,
    productName,
    productPrice,
    productDiscountPrice,
    productUnit,
    productStock,
    productIsVeg,
    productIsEnabled,
    productDescription,
    productWeight,
    productPackagingCharges,
    setProductImgURL,
    setProductName,
    setProductPrice,
    setProductDiscountPrice,
    setProductUnit,
    setProductStock,
    setProductIsVeg,
    setProductIsEnabled,
    setProductDescription,
    setProductWeight,
    setProductPackagingCharges,
    setIsUpdating,
    setResponse,
    open,
    handleClose,
    getData,
    handleAlertClick,
  };

  const productTableControllerProps = {
    productData,
    getData,
    onEditChange,
    handleAlertClick,
    setResponse,
    productsPerPage,
    paginationCurrentPage,
    searchData,
    setPaginationCount,
  };

  return (
    <>
      <StyledEngineProvider injectFirst>
        <NavBar />
        <Container maxWidth='lg'>
          <Grid container>
            <Grid item lg={12} md={12} sm={12} xs={12} mt={5}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 3 }}
                alignItems='center'
              >
                <Typography
                  style={{
                    flexGrow: 1,
                    fontWeight: 600,
                    fontFamily: 'Bai Jamjuree',
                  }}
                  variant='h6'
                >
                  Product List
                </Typography>
                <TextField
                  variant='outlined'
                  placeholder='Search...'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <SearchIcon />
                      </InputAdornment>
                    ),
                    style: {
                      fontFamily: 'Montserrat Alternates',
                      fontWeight: 600,
                      borderRadius: 50,
                    },
                  }}
                  onChange={onSearchChange}
                />
                <Button
                  variant='contained'
                  endIcon={<AddIcon />}
                  sx={AddNewProductBtnStyle}
                  onClick={handleOpen}
                >
                  Add new Product
                </Button>
              </Stack>
              <ModalComp {...modalCompProps} />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <ProductTableController {...productTableControllerProps} />
            </Grid>
          </Grid>
          <Grid container justifyContent={'end'}>
            <Grid item lg={3} mt={4}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'end',
                }}
              >
                <Paper
                  sx={{
                    boxShadow: '2px 2px 30px 2px #FFF3E5',
                  }}
                >
                  <StyledPagination
                    count={paginationCount}
                    page={paginationCurrentPage}
                    shape='rounded'
                    sx={{
                      padding: 1,
                    }}
                    onChange={handlePageChange}
                  />
                </Paper>
              </Box>
            </Grid>
            <Grid item>
              {response?.status === 200 ? (
                <Snackbar
                  open={openAlert}
                  autoHideDuration={3000}
                  onClose={handleAlertClose}
                >
                  <Alert
                    onClose={handleAlertClose}
                    severity='success'
                    sx={{ width: '100%' }}
                  >
                    {`${response?.message}`}
                  </Alert>
                </Snackbar>
              ) : (
                <Snackbar
                  open={openAlert}
                  autoHideDuration={3000}
                  onClose={handleAlertClose}
                >
                  <Alert
                    onClose={handleAlertClose}
                    severity='error'
                    sx={{ width: '100%' }}
                  >
                    {`Error: ${response?.message}`}
                  </Alert>
                </Snackbar>
              )}
            </Grid>
          </Grid>
        </Container>
      </StyledEngineProvider>
    </>
  );
};

export default ProductList;
