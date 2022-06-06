import React, { useEffect, useState } from 'react';
import {
  Box,
  Modal,
  Grid,
  InputLabel,
  TextField,
  Stack,
  Button,
  Typography,
  Select,
  MenuItem,
} from '@mui/material';
import '../App.css';
import { SelectChangeEvent } from '@mui/material';
import { withStyles } from '@mui/styles';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import { useUserAuth } from '../Context/UserAuthContext';
import axios from 'axios';
import { modalCompProps } from '../types';

const ModalBoxStyle = {
  margin: '1% auto',
  backgroundColor: 'white',
  borderRadius: '0.50rem',
  width: '60vw',
  height: 'auto',
  padding: '2rem',
  position: 'relative',
  bgcolor: 'background.paper',
  p: 4,
};

const StyledTextField = withStyles({
  root: {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      marginBottom: 10,
      borderRadius: '0.50rem',
      '& fieldset': {
        borderColor: '#E8E8E8',
      },
      '&:hover fieldset': {
        borderColor: '#7ba814',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#9AD219',
      },
    },
    // '& .MuiOutlinedInput-root.Mui-disabled': {
    //   '& fieldset': { borderColor: '#E8E8E8' },
    // },
    '& .MuiOutlinedInput-input': {
      fontSize: '1.063rem',
      fontFamily: 'Montserrat Alternates',
      fontWeight: '600',
      lineHeight: '1.75rem',
      color: '#A2A3A5',
    },
  },
})((props: any) => <TextField {...props} />);

const StyledLabel = {
  mb: 1,
  color: 'black',
  fontFamily: 'Montserrat Alternates',
  fontWeight: '600',
};

const StyledBtn = {
  mt: 1,
  borderRadius: 7,
  backgroundColor: '#94CD00',
  boxShadow: '2px 2px 25px 2px rgba(148, 205, 0, 0.4);',
  fontFamily: 'Bai Jamjuree',
  ':hover': {
    backgroundColor: '#85b800',
    boxShadow: '2px 2px 25px 2px rgba(148, 205, 0, 0.4);',
  },
  py: 2,
  px: 8,
};

const StyledSelect = {
  '& .MuiOutlinedInput-input': {
    fontFamily: 'Montserrat Alternates',
    fontWeight: '600',
    color: '#A2A3A5',
  },
  '.MuiOutlinedInput-notchedOutline': {
    borderColor: '#E8E8E8',
    borderRadius: '0.50rem',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#9AD219',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#7ba814',
  },
  '& .MuiSelect-icon': {
    color: '#A2A3A5',
  },
};

const StyledMenuItem = withStyles({
  root: {
    fontFamily: 'Montserrat Alternates',
    fontWeight: '600',
    color: '#A2A3A5',
  },
})((props: any) => <MenuItem {...props} />);

const validateImgURL =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/;

const validateNumber = /^\d+$/;

const ModalComp: React.FC<modalCompProps> = ({
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
}) => {
  type textChangeEvent = React.ChangeEvent<HTMLInputElement>;
  const ctx = useUserAuth();
  const token = ctx?.token;
  const userID = ctx?.userData?._id;
  const [imgUrlError, setImgUrlError] = useState(false);
  const [priceErr, setPriceErr] = useState(false);
  const [discountPriceErr, setDiscountPriceErr] = useState(false);
  const [stockErr, setStockErr] = useState(false);
  const [weightErr, setWeightErr] = useState(false);
  const [packagingChargesErr, setPackagingChargesErr] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const clearStates = () => {
    setProductDescription('');
    setProductDiscountPrice('');
    setProductImgURL('');
    setProductIsEnabled(true);
    setProductIsVeg(true);
    setProductName('');
    setProductPackagingCharges('');
    setProductPrice('');
    setProductStock('');
    setProductUnit('');
    setProductWeight('');
    setImgUrlError(false);
    setPriceErr(false);
    setDiscountPriceErr(false);
    setStockErr(false);
    setWeightErr(false);
    setPackagingChargesErr(false);
    setIsUpdating(false);
  };

  const onSubmitHandler = () => {
    const data = {
      name: productName,
      stock: Number(productStock),
      unit: productUnit,
      weight: productPackagingCharges,
      price: productPrice,
      isVeg: productIsVeg,
      image: productImgURL,
      discountPrice: productDiscountPrice,
      packingCharges: productPackagingCharges,
      description: productDescription,
      enabled: productIsEnabled,
      customerId: userID,
    };

    axios
      .post(
        'https://extended-retail-app.herokuapp.com/api/products/createMenuItem',
        data,
        {
          headers: {
            token: `${token}`,
          },
        }
      )
      .then((response: any) => {
        handleAlertClick();
        setResponse(response?.data);
        handleClose();
        getData();
        clearStates();
      })
      .catch((error: any) => {
        handleAlertClick();
        setResponse(error?.response?.data);
      });
  };

  const onEditHandler = () => {
    const data = {
      stock: productStock,
      price: productPrice,
      packingCharges: productPackagingCharges,
    };
    axios
      .put(
        `https://extended-retail-app.herokuapp.com/api/products/updateMenuItem?userId=${userID}&itemId=${productId}`,
        data,
        {
          headers: {
            token: `${token}`,
          },
        }
      )
      .then((response: any) => {
        handleAlertClick();
        setResponse(response?.data);
        setIsUpdating(false);
        handleClose();
        getData();
      })
      .catch((error: any) => {
        handleAlertClick();
        setResponse(error?.response?.data);
      });
  };

  const onImageURLChange = (e: textChangeEvent) => {
    if (e.target.value === '' || e.target.value.match(validateImgURL)) {
      setImgUrlError(false);
      setProductImgURL(e.target.value);
    } else {
      setImgUrlError(true);
    }
  };

  const onProductNameChange = (e: textChangeEvent) =>
    setProductName(e.target.value);

  const onPriceChange = (e: textChangeEvent) => {
    if (e.target.value === '' || e.target.value.match(validateNumber)) {
      setPriceErr(false);
      setProductPrice(e.target.value);
    } else {
      setPriceErr(true);
    }
  };

  const onDiscountPriceChange = (e: textChangeEvent) => {
    if (e.target.value === '' || e.target.value.match(validateNumber)) {
      setDiscountPriceErr(false);
      setProductDiscountPrice(e.target.value);
    } else {
      setDiscountPriceErr(true);
    }
  };

  const onUnitChange = (e: textChangeEvent) => setProductUnit(e.target.value);

  const onStockChange = (e: textChangeEvent) => {
    if (e.target.value === '' || e.target.value.match(validateNumber)) {
      setStockErr(false);
      setProductStock(e.target.value);
    } else {
      setStockErr(true);
    }
  };

  const onWeightChange = (e: textChangeEvent) => {
    if (e.target.value === '' || e.target.value.match(validateNumber)) {
      setWeightErr(false);
      setProductWeight(e.target.value);
    } else {
      setWeightErr(true);
    }
  };

  const onPackingChargesChange = (e: textChangeEvent) => {
    if (e.target.value === '' || e.target.value.match(validateNumber)) {
      setPackagingChargesErr(false);
      setProductPackagingCharges(e.target.value);
    } else {
      setPackagingChargesErr(true);
    }
  };

  const onDescriptionChange = (e: textChangeEvent) =>
    setProductDescription(e.target.value);

  const onIsVegChange = (
    e: SelectChangeEvent<string>,
    child: React.ReactNode
  ) => {
    setProductIsVeg(e.target.value);
  };

  const onEnabledChange = (
    e: SelectChangeEvent<string>,
    child: React.ReactNode
  ) => {
    setProductIsEnabled(e.target.value);
  };

  useEffect(() => {
    if (!open) {
      clearStates();
    }
  }, [open, clearStates]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{ overflowY: 'auto', '&::-webkit-scrollbar': { display: 'none' } }}
      >
        <Box sx={ModalBoxStyle}>
          <IconButton
            sx={{
              float: 'right',
              marginTop: '-50px',
              marginRight: '-50px',
            }}
            onClick={handleClose}
          >
            <CancelIcon sx={{ color: '#DF201F', fontSize: '2.25rem' }} />
          </IconButton>
          <Grid
            container
            columns={{ xs: 4, sm: 8, md: 12 }}
            spacing={{ xs: 2, md: 3 }}
          >
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <Typography sx={StyledLabel} variant='h6'>
                Product Image
              </Typography>

              {productImgURL.length === 0 && (
                <Box sx={{ border: '1px solid #E8E8E8' }}>
                  <Grid
                    container
                    direction='column'
                    justifyContent='center'
                    alignItems='center'
                  >
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Box sx={{ my: 3, mx: 2 }}>
                        <InputLabel sx={StyledLabel}>Image URL</InputLabel>
                        <StyledTextField
                          variant='outlined'
                          value={productImgURL}
                          onChange={onImageURLChange}
                          error={imgUrlError}
                          helperText={imgUrlError && 'Enter proper URL'}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              )}

              {productImgURL.length > 0 && (
                <img
                  src={productImgURL}
                  alt='foodImg'
                  style={{ height: 'auto', width: '100%' }}
                />
              )}
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <Grid
                container
                direction='column'
                justifyContent='center'
                alignItems='center'
              >
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Box>
                    <InputLabel sx={StyledLabel}>Product Name</InputLabel>
                    <StyledTextField
                      variant='outlined'
                      value={productName}
                      onChange={onProductNameChange}
                      disabled={isUpdating}
                    />
                  </Box>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 2, md: 2 }}
                    alignItems='center'
                  >
                    <Box>
                      <InputLabel sx={StyledLabel}>Price</InputLabel>
                      <StyledTextField
                        variant='outlined'
                        value={productPrice}
                        onChange={onPriceChange}
                        error={priceErr}
                        helperText={priceErr && 'Enter numbers only'}
                      />
                    </Box>
                    <Box>
                      <InputLabel sx={StyledLabel}>Discount Price</InputLabel>
                      <StyledTextField
                        variant='outlined'
                        value={productDiscountPrice}
                        onChange={onDiscountPriceChange}
                        disabled={isUpdating}
                        error={discountPriceErr}
                        helperText={discountPriceErr && 'Enter numbers only'}
                      />
                    </Box>
                  </Stack>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 2, md: 2 }}
                    alignItems='center'
                  >
                    <Box>
                      <InputLabel sx={StyledLabel}>Unit</InputLabel>
                      <StyledTextField
                        variant='outlined'
                        value={productUnit}
                        onChange={onUnitChange}
                        disabled={isUpdating}
                      />
                    </Box>
                    <Box>
                      <InputLabel sx={StyledLabel}>Stock</InputLabel>
                      <StyledTextField
                        variant='outlined'
                        value={productStock}
                        onChange={onStockChange}
                        error={stockErr}
                        helperText={stockErr && 'Enter numers only'}
                      />
                    </Box>
                    <Box>
                      <InputLabel sx={StyledLabel}>Is Veg</InputLabel>
                      <Box
                        sx={{
                          marginBottom: 1,
                        }}
                      >
                        <Select
                          variant='outlined'
                          fullWidth
                          defaultValue={productIsVeg}
                          sx={StyledSelect}
                          onChange={onIsVegChange}
                          autoWidth
                          disabled={isUpdating}
                        >
                          <StyledMenuItem value={false}>False</StyledMenuItem>
                          <StyledMenuItem value={true}>True</StyledMenuItem>
                        </Select>
                      </Box>
                    </Box>
                  </Stack>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 2, md: 2 }}
                    alignItems='center'
                  >
                    <Box>
                      <InputLabel sx={StyledLabel}>Weight</InputLabel>
                      <StyledTextField
                        variant='outlined'
                        value={productWeight}
                        onChange={onWeightChange}
                        disabled={isUpdating}
                        error={weightErr}
                        helperText={weightErr && 'Enter numbers only'}
                      />
                    </Box>
                    <Box>
                      <InputLabel sx={StyledLabel}>
                        Packaging Charges
                      </InputLabel>
                      <StyledTextField
                        variant='outlined'
                        value={productPackagingCharges}
                        onChange={onPackingChargesChange}
                        error={packagingChargesErr}
                        helperText={packagingChargesErr && 'Enter numbers only'}
                      />
                    </Box>
                    <Box>
                      <InputLabel sx={StyledLabel}>Enabled</InputLabel>
                      <Box
                        sx={{
                          marginBottom: 1,
                        }}
                      >
                        <Select
                          variant='outlined'
                          fullWidth
                          defaultValue={productIsEnabled}
                          onChange={onEnabledChange}
                          sx={StyledSelect}
                          disabled={isUpdating}
                        >
                          <StyledMenuItem value={false}>False</StyledMenuItem>
                          <StyledMenuItem value={true}>True</StyledMenuItem>
                        </Select>
                      </Box>
                    </Box>
                  </Stack>
                  <Box>
                    <InputLabel sx={StyledLabel}>Description</InputLabel>
                    <StyledTextField
                      variant='outlined'
                      multiline
                      rows={2}
                      value={productDescription}
                      onChange={onDescriptionChange}
                      disabled={isUpdating}
                    />
                  </Box>
                  <Box>
                    {!isUpdating && (
                      <Button
                        variant='contained'
                        sx={StyledBtn}
                        onClick={onSubmitHandler}
                      >
                        Save Product
                      </Button>
                    )}
                    {isUpdating && (
                      <Button
                        variant='contained'
                        sx={StyledBtn}
                        onClick={onEditHandler}
                      >
                        Edit Product
                      </Button>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalComp;
