import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  TableContainer,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { StyledEngineProvider } from '@mui/material/styles';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { productTableProps } from '../types';

const useStyles = makeStyles({
  root: {
    border: 0,
    borderRadius: 5,
    boxShadow: '2px 2px 30px 2px #FFF3E5',
    marginTop: 25,
  },
  header: {
    backgroundColor: '#DF201F',
    color: 'white',
    fontFamily: 'Bai Jamjuree',
    fontWeight: '600',
    border: '1px solid rgba(196, 196, 196, 0.23)',
  },
  textformat: {
    color: '#A2A3A5',
    fontFamily: 'Bai Jamjuree',
    fontWeight: '600',
    border: '1px solid rgba(196, 196, 196, 0.23)',
  },
  tableFormat: {
    borderColor: '1px solid rgba(196, 196, 196, 0.23)',
  },
  tableHead: {
    borderCollapse: 'unset',
  },
});

const ProductTable: React.FC<productTableProps> = ({
  onDeleteHandler,
  onEditHandler,
  productsPerPage,
  paginationCurrentPage,
  filteredProductData,
}) => {
  const classes = useStyles();

  return (
    <StyledEngineProvider injectFirst>
      <TableContainer className={classes.root}>
        <Table className={classes.tableFormat}>
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell className={classes.header}>Name</TableCell>
              <TableCell align='right' className={classes.header}>
                Description
              </TableCell>
              <TableCell align='right' className={classes.header}>
                Quantity
              </TableCell>
              <TableCell align='right' className={classes.header}>
                Enabled
              </TableCell>
              <TableCell align='right' className={classes.header}>
                Price
              </TableCell>
              <TableCell align='right' className={classes.header}>
                Discount Price
              </TableCell>
              <TableCell align='right' className={classes.header}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.textformat}>
            {filteredProductData
              ?.slice(
                productsPerPage * (paginationCurrentPage - 1),
                productsPerPage * paginationCurrentPage
              )
              .map((row: any) => (
                <TableRow key={row._id}>
                  <TableCell
                    component='th'
                    scope='row'
                    className={classes.textformat}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell align='right' className={classes.textformat}>
                    {`${row.description}`}
                  </TableCell>
                  <TableCell align='right' className={classes.textformat}>
                    {row.stock}
                  </TableCell>
                  <TableCell align='right' className={classes.textformat}>
                    {`${row.enabled}`}
                  </TableCell>
                  <TableCell align='right' className={classes.textformat}>
                    {row.price}
                  </TableCell>
                  <TableCell align='right' className={classes.textformat}>
                    {row.discountPrice}
                  </TableCell>
                  <TableCell align='right' className={classes.textformat}>
                    <IconButton
                      onClick={() => onEditHandler(row)}
                      color='secondary'
                    >
                      <EditTwoToneIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => onDeleteHandler(row._id)}
                      color='error'
                    >
                      <DeleteTwoToneIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledEngineProvider>
  );
};

export default ProductTable;
