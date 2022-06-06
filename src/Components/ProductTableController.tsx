import React, { useEffect } from 'react';
import ProductTable from '../View/ProductTable';
import { useUserAuth } from '../Context/UserAuthContext';
import axios from 'axios';
import { productTableControllerProps } from '../types';

const ProductTableController: React.FC<productTableControllerProps> = ({
  productData,
  getData,
  onEditChange,
  handleAlertClick,
  setResponse,
  productsPerPage,
  paginationCurrentPage,
  setPaginationCount,
  searchData,
}) => {
  const ctx = useUserAuth();
  const token = ctx?.token;
  const userID = ctx?.userData?._id;

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onEditHandler = (productData: any) => {
    onEditChange(productData);
  };

  const onDeleteHandler = (itemId: string) => {
    axios
      .delete(
        `https://extended-retail-app.herokuapp.com/api/products/deleteMenuItem?userId=${userID}&itemId=${itemId}`,
        {
          headers: {
            token: `${token}`,
          },
        }
      )
      .then((response: any) => {
        handleAlertClick();
        setResponse(response?.data);
        getData();
      })
      .catch((error: any) => {
        handleAlertClick();
        setResponse(error?.response?.data);
      });
  };

  // eslint-disable-next-line array-callback-return
  const filteredProductData = productData?.filter((row: any) => {
    if (searchData === '') {
      return row;
    }
    if (row.name.toLowerCase().includes(searchData.toLowerCase())) {
      return row;
    }
  });

  const fetchPageCount = (data: any) => {
    if (data.length > 0 && data.length % productsPerPage === 0) {
      setPaginationCount(data.length / productsPerPage);
    }
    if (data.length > 0 && data.length % productsPerPage !== 0) {
      setPaginationCount(Math.floor(data.length / productsPerPage) + 1);
    }
    if (data.length === 0) {
      setPaginationCount(0);
    }
  };

  fetchPageCount(filteredProductData);

  const productTableProps = {
    onEditHandler,
    onDeleteHandler,
    productsPerPage,
    paginationCurrentPage,
    filteredProductData,
  };

  return <ProductTable {...productTableProps} />;
};

export default ProductTableController;
