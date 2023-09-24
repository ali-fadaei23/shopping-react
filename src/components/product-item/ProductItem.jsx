import { useContext, useState } from "react";
import "./ProductItem.css";
import { CartContext } from "../../shared/context/CartContext";
import {
  ButtonGroup,
  Card,
  CardMedia,
  Button,
  CardActions,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import RemoveIcon from "@mui/icons-material/Remove";

const reducer = (...arr) => {
  const res = [];
  arr.forEach((v) => {
    const i = res.findIndex((u) => u.id === v.id);
    if (!res[i]) res.push(v);
    else res[i].num++;
  });
  return res;
};

const ProductItem = ({ product }) => {
  const { cartItems, setCartItems, wishlist, setWishlist } =
    useContext(CartContext);
  const count = cartItems.find((v) => v.id === product.id)?.num ?? 0;
  const cart = {
    id: product.id,
    num: 1,
    category: product.category,
    image: product.image,
    title: product.title,
    price: product.price,
  };
  const addToCart = () => setCartItems((prev) => reducer(...prev, cart));

  const removeAtCart = () => {
    setCartItems((prev) => {
      const state = prev.map((v) => ({ ...v }));
      const i = state.findIndex((v) => v.id === cart.id);
      if (state[i]?.num > 1) state[i].num--;
      else if (state[i]?.num === 1) state.splice(i, 1);
      return state;
    });
  };

  const addToWishlist = () => {
    const wishlist = {
      id: product.id,
      category: product.category,
      image: product.image,
      title: product.title,
      price: product.price,
      description: product.description,
    };

    setWishlist((prev) => reducer(...prev, wishlist));
  };
  return (
    <Card className="card card-product" sx={{ marginBottom: 20, width: 300 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        sx={{ width: 200 }}
        image={product.image}
        title={product.title}
      />
      <CardContent className="text">
        <Typography
          gutterBottom
          variant="body1"
          sx={{ color: "darkblue" }}
          component="div"
        >
          {product.title}
        </Typography>
        <Typography
          gutterBottom
          variant="caption"
          sx={{ color: "CaptionText" }}
          component="div"
        >
          {product.category}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography
          gutterBottom
          variant="h6"
          sx={{ color: "tomato", marginTop: 5 }}
          component="div"
        >
          {product.price + " $"}
        </Typography>
      </CardContent>
      <CardActions>
        {count <= 0 ? (
          " "
        ) : (
          <ButtonGroup className="btn-add-remove">
            <Button id="reduce" aria-label="reduce" onClick={removeAtCart}>
              <RemoveIcon fontSize="small" />
            </Button>
            <div>
              <Typography sx={{ margin: 1 }}>{count}</Typography>
            </div>

            <Button id="increase" aria-label="increase" onClick={addToCart}>
              <AddIcon fontSize="small" />
            </Button>
          </ButtonGroup>
        )}
        <div className="btn-product">
          <Button
            className="btn-add"
            variant="contained"
            color="success"
            size="medium"
            startIcon={<AddIcon fontSize="small" />}
            onClick={addToCart}
          >
            Add To Cart
          </Button>
          <IconButton onClick={addToWishlist}>
            <TurnedInIcon />
          </IconButton>
        </div>
      </CardActions>
    </Card>
  );
};

export default ProductItem;
