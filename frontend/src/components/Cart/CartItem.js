import axios, { AxiosHeaders } from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteFromCart,
  updateQty,
  selectCartTotal,
} from "../../Redux/features/Slices/Cart/Cart";
const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const [itemQuantity, setItemQuantity] = useState(item.quantity);

  const updateCartQuantity = async (e, id) => {
    // if (e.target.value === "") return; //Empty
    setItemQuantity(e.target.value);
    if (!(Number(e.target.value) > 0) || e.target.value === "") return;

    const response = await axios.put(
      `${process.env.REACT_APP_SERVER_URL}/cart/${item.id}`,
      { product_qty: e.target.value, product_price: item.price },
      { withCredentials: true }
    );
    if (e.target.value !== "") {
      dispatch(updateQty({ id: id, value: e.target.value }));
    }
  };
  const deleteSingleItemInDb = async (id) => {
    const respponse = await axios.delete(
      `${process.env.REACT_APP_SERVER_URL}/cart/${id}`,
      { withCredentials: true }
    );
  };

  const deleteItem = (id) => {
    deleteSingleItemInDb(id);
    dispatch(deleteFromCart(id));
  };
  return (
    <tr>
      <td>
        <div className="items">
          <h3>{item.name}</h3>
          {item.image ? (
            <img src={item.image}  />
          ) : (
            <img
              src="https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101028/112815904-no-image-available-icon-flat-vector-illustration.jpg?ver=6"
              alt={item.description}

            />
          )}
        </div>
      </td>
      <td>
        {" "}
        <div className="inner_container">
          <input
            type="number"
            min={1}
            onChange={(e) => updateCartQuantity(e, item.id)}
            className="form-control qty-box"
            value={itemQuantity}
          />
        </div>
      </td>
      <td>
        <h4>${(Number(item.price) * itemQuantity).toFixed(2)}</h4>
      </td>
      <td>
        <i
          className="far fa-trash-alt"
          onClick={() => deleteItem(item.id)}
          type="button"
          style={{ color: "red", fontSize: "25px" }}
        ></i>
      </td>
    </tr>
  );
};

export default CartItem;
