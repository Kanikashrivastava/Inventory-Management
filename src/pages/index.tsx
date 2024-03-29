import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "@/styles/Home.module.css";
import { useTasks } from "@/slices/tasks/taskSlice";
import { useColors } from "@/slices/colors/colorSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import WidgetCard from "@/components/WidgetCard";
import LogoutIcon from "@mui/icons-material/Logout";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import { fetchInventories } from "@/services";
import { EditProduct } from "@/components/EditProduct";

const label = { inputProps: { "aria-label": "Switch demo" } };
const constructStyles = (colors: any) => ({
  section: {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "20%",
    alignSelf: "flex-end",
    marginRight: "3%",
    marginBottom: "2%",
  },
  widgets: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    margin: "20px 0",
  },
  title: {
    fontWeight: 200,
    fontSize: "28px",
    color: colors.white.shade1,
  },
  productVal: {
    color: colors.grey.shade3,
  },
});
function Home() {
  const {
    products,
    outOfStockCount,
    totalStoreValue,
    addProducts,
    disableProduct,
    deleteProduct,
  } = useTasks();
  const styles = useColors(constructStyles);
  const [isUserActive, setIsUserActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetchInventories();
      const productsWithId = res.map((product: any, index: any) => {
        return { id: index + 1, disable: false, ...product };
      });
      addProducts(productsWithId);
    } catch (error) {
      console.error("Error fetching inventories:", error);
    }
  };

  function countCategories() {
    const categoryCount: any = [];

    products?.forEach((product: any) => {
      const { category } = product;
      if (categoryCount[category]) {
        categoryCount[category] += 1;
      } else {
        categoryCount[category] = 1;
      }
    });

    return Object.keys(categoryCount).length;
  }  

  const visibilityStyles = isUserActive ? "grey" : "#be8bcd";
  return (
    <section style={styles.section}>
      <header style={styles.header}>
        <Stack direction="row" spacing={1} alignItems="center">
          <div>Admin</div>
          <Switch
            {...label}
            checked={isUserActive}
            color="success"
            onClick={() => setIsUserActive(!isUserActive)}
          />
          <div>User</div>
        </Stack>
        <LogoutIcon />
      </header>
      <main style={styles.main}>
        <div style={styles.title}>Inventory Stats</div>
        <div style={styles.widgets}>
          <WidgetCard label="Total Product" count={products?.length} />
          <WidgetCard label="Total store value" count={totalStoreValue} />
          <WidgetCard label="Out of stocks" count={outOfStockCount} />
          <WidgetCard label="No of Category" count={countCategories()} />
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 1300 }} aria-label="a dense table">
            <TableHead>
              <TableRow style={{ background: "#212124" }}>
                <TableCell>Name</TableCell>
                <TableCell align="left">Category</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Quantity</TableCell>
                <TableCell align="left">Value</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products?.map((product: any) => (
                <TableRow
                  style={{ color: product.disable ? 'grey' : "white", background: "#212124" }}
                  key={product.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    style={product.disable ? styles.productVal : null}
                    component="th"
                    scope="row"
                  >
                    {product.name}
                  </TableCell>
                  <TableCell
                    align="left"
                    style={product.disable ? styles.productVal : null}
                  >
                    {product.category}
                  </TableCell>
                  <TableCell
                    align="left"
                    style={product.disable ? styles.productVal : null}
                  >
                    {product.price}
                  </TableCell>
                  <TableCell
                    align="left"
                    style={product.disable ? styles.productVal : null}
                  >
                    {product.quantity}
                  </TableCell>
                  <TableCell
                    align="left"
                    style={product.disable ? styles.productVal : null}
                  >
                    {product.value}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <div onClick={() => {setIsVisible(true); setSelectedProduct(product)}}>
                      <EditIcon
                        style={{
                          color:
                            isUserActive || product.disable ? "grey" : "green",
                        }}
                      />
                    </div>
                    {isVisible ? <EditProduct product={selectedProduct} onCloseHandler={()=>setIsVisible(!isVisible)} /> : null}
                    <div onClick={() => disableProduct(product.id)}>
                      {product.disable ? (
                        <VisibilityOffIcon
                          style={{ color: visibilityStyles }}
                        />
                      ) : (
                        <VisibilityIcon style={{ color: visibilityStyles }} />
                      )}
                    </div>
                    <div onClick={() => deleteProduct(product.id)}>
                      <DeleteIcon
                        style={{ color: isUserActive ? "grey" : "#e13c3c" }}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </main>
    </section>
  );
}

export default Home;
