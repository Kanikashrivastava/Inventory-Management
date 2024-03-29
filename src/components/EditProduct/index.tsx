import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTasks } from "@/slices/tasks/taskSlice";
import { useColors } from "@/slices/colors/colorSlice";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
const constructStyles = (colors: any) => ({
  box: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: colors.grey.shade4,
    border: "2px solid #000",
    boxShadow: 24,
    p: 3,
    borderRadius: 3,
  },
  input: {
    border: '1px solid transparent',
    padding: 5,
    background: '#6f796a',
    color: colors.white.shade1,
    borderRadius: 6,
    marginTop: 3,
  },
  inputLabel: {
    fontSize: 10,
    fontWeight: 100,
    marginTop: 10
  },
  inputContainers: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  submitBtn: {
    padding: 7,
    borderRadius: 6,
    color: '#fff',
    fontSize: 13,
    background: '#b9cb5e',
    marginLeft: 10,
    cursor: 'pointer'
  },
  cancelBtn: {
    color: '#b9cb5e',
    fontSize: 13,
    cursor: 'pointer'
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10
  }
});

interface EditProductComponentProps {
  product: any;
  onCloseHandler: any;
}

const EditProduct: React.FC<EditProductComponentProps> = ({
  product,
  onCloseHandler,
}) => {
  const styles = useColors(constructStyles);
  const [data, setData] = useState(product)
  const { editProduct } = useTasks();

  const onChangeHandler = (e:any) => {
    const newProduct = {...data}

    newProduct[e.target.name] = e.target.value

    setData({...newProduct})
  };

  const handleSubmit = () => {
    try {
      editProduct(data)
      onCloseHandler()
    } catch (error) {
      onCloseHandler()
    }
  }

  return (
    <Modal
      open={true}
      onClose={onCloseHandler}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styles.box}>
        <Typography id="modal-modal-title" variant="h4" component="h2">
          Edit Product
        </Typography>
        <Typography variant="body1">{product.name}</Typography>
        <div style={styles.inputContainers}>
          <div>
            <div style={styles.inputLabel}>{'Category'}</div>
            <input name="category" onChange={onChangeHandler} value={data.category} style={styles.input} placeholder="Category" />
          </div>
          <div>
            <div style={styles.inputLabel}>{'Price'}</div>
            <input name="price" onChange={onChangeHandler} value={data.price} style={styles.input} placeholder="Price" />
          </div>
          <div>
            <div style={styles.inputLabel}>{'Quantity'}</div>
            <input name="quantity" onChange={onChangeHandler} value={data.quantity} style={styles.input} placeholder="Quantity" />
          </div>
          <div>
            <div style={styles.inputLabel}>{'Value'}</div>
            <input name="value" onChange={onChangeHandler} value={data.value} style={styles.input} placeholder="Value" />
          </div>
        </div>

        <div style={styles.footer}>
          <div style={styles.cancelBtn} onClick={onCloseHandler}>{'Cancel'}</div>
          <div style={styles.submitBtn} onClick={handleSubmit}>{'Save'}</div>
        </div>
      </Box>
    </Modal>
  );
};

EditProduct.propTypes = {
  product: PropTypes.any.isRequired,
};

export { EditProduct };
