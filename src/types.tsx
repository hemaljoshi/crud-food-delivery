export interface modalCompProps {
  isUpdating: boolean;
  productId: string;
  productImgURL: string;
  productName: string;
  productPrice: string;
  productDiscountPrice: string;
  productUnit: string;
  productStock: string;
  productIsVeg: any;
  productIsEnabled: any;
  productDescription: string;
  productWeight: string;
  productPackagingCharges: string;
  setProductImgURL: React.Dispatch<React.SetStateAction<string>>;
  setProductName: React.Dispatch<React.SetStateAction<string>>;
  setProductPrice: React.Dispatch<React.SetStateAction<string>>;
  setProductDiscountPrice: React.Dispatch<React.SetStateAction<string>>;
  setProductUnit: React.Dispatch<React.SetStateAction<string>>;
  setProductStock: React.Dispatch<React.SetStateAction<string>>;
  setProductIsVeg: React.Dispatch<any>;
  setProductIsEnabled: React.Dispatch<any>;
  setProductDescription: React.Dispatch<React.SetStateAction<string>>;
  setProductWeight: React.Dispatch<React.SetStateAction<string>>;
  setProductPackagingCharges: React.Dispatch<React.SetStateAction<string>>;
  setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>;
  setResponse: React.Dispatch<any>;
  open: boolean;
  handleClose: () => void;
  getData: () => void;
  handleAlertClick: () => void;
}

export interface productTableControllerProps {
  productsPerPage: number;
  paginationCurrentPage: number;
  productData: any[];
  searchData: string;
  getData: () => void;
  onEditChange: (productdata: any[]) => void;
  handleAlertClick: () => void;
  setResponse: React.Dispatch<any>;
  setPaginationCount: React.Dispatch<React.SetStateAction<number>>;
}

export interface productTableProps {
  productsPerPage: number;
  paginationCurrentPage: number;
  onEditHandler: (productData: any[]) => void;
  onDeleteHandler: (itemId: string) => void;
  filteredProductData: any[];
}

// export interface objData {
//   _id: string;
//   image: string;
//   name: string;
//   price: string;
//   discountPrice: string;
//   unit: string;
//   stock: string;
//   productIsVeg: any;
//   enabled: any;
//   description: string;
//   weight: string;
//   packingCharges: string;
// }
