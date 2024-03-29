import React from "react";
import PropTypes from "prop-types";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useColors } from "@/slices/colors/colorSlice";

const constructStyles = (colors: any) => ({
  label: {
    display: "flex",
    padding: '0 10px',
    flexDirection: 'column'
  },
  container: {
    margin: "5px",
    background: colors.green.shade1,
    width: "24%",
    padding: '30px 20px',
    display: 'flex',
    borderRadius: '5px',
  },
  labelText: {
    fontSize: "12px",
    fontWeight: 100,
    marginBottom: 10
  },
  countText: {
    fontSize: "28px",
    fontWeight: 500,
  }
});

function WidgetCard(props: any) {
  const { label, count, Icon } = props;

  const styles = useColors(constructStyles);

  return (
    <div style={styles.container}>
      <div>
        <ShoppingCartIcon />
      </div>
      <div style={styles.label}>
        <div style={styles.labelText}>{label}</div>
        <div style={styles.countText}>{count}</div>
      </div>
    </div>
  );
}

WidgetCard.propTypes = {
  label: PropTypes.string.isRequired,
  count: PropTypes.any,
  Icon: PropTypes.any
};

export default React.memo(WidgetCard, (prevProps, nextProps) => {
  return prevProps.isDone !== nextProps.isDone
});