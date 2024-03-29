import { createSlice } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";

export const taskSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
  },
  reducers: {
    addProducts: (state: any, action: any) => {
      const data = action.payload;
      state.products = data;
    },
    editProduct: (state: any, action: any) => {
      const data = action.payload;
      state.products.map((elem:any, index:number) =>
      elem.id === data.id ? state.products[index] = data : elem
    );
    },
    toggleProduct: (state: any, action: any) => {
      const product = state.products.find(
        (product: any) => product.id === action.payload.id
      );
      product.isDone = !product.isDone;
    },
    disableProduct: (state: any, action: any) => {
      const productId = action.payload;
      const product = state.products.find(
        (product: any) => product.id === productId
      );
      product.disable = !product.disable
    },
    deleteProduct: (state: any, action: any) => {
      const productId = action.payload;
      const data = state.products.filter((product: any) => product.id !== productId);
      state.products = data;
    },
  },
});

const { addProducts, editProduct, toggleProduct, disableProduct, deleteProduct } = taskSlice.actions;

export const useTasks = () => {
  const products = useSelector((state: any) => state.products.products);
  const outOfStockCount = products?.filter(
    (product: any) => product.quantity === 0
  ).length;
  const totalStoreValue = products?.reduce((acc: any, product: any) => {
    const numericValue = parseFloat(product.value.replace("$", "")); // Convert '$150' to 150
    return acc + numericValue * product.quantity;
  }, 0);

  const dispatch = useDispatch();

  return {
    products: products,
    outOfStockCount,
    totalStoreValue,
    addProducts: (data: any) => dispatch(addProducts(data)),
    toggleProduct: (id: any) => dispatch(toggleProduct(id)),
    editProduct: (data: any) => dispatch(editProduct(data)),
    disableProduct: (id: any) => dispatch(disableProduct(id)),
    deleteProduct: (id: any) => dispatch(deleteProduct(id)),
  };
};

export default taskSlice.reducer;
