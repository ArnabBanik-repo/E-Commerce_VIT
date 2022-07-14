import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function Item({ user, product, setUser }) {
  const handleBook = () => {
    if (user === undefined) {
      window.open("http://localhost:5000/auth/google", "_self");
    } else {
      if (user.email === product.listedBy.email) {
        alert("You listed that product!");
        return;
      }
      const interests = user.interests.filter(
        (interest) => interest._id !== product._id
      );
      interests.push(product);
      fetch(`http://localhost:5000/api/v1/users/${user._id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          interests,
        }),
      })
        .then((res) => res.json())
        .then((data) => setUser(data.data.user));
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="194"
        image={product.img}
        alt={product.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.desc}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleBook}>
          Book
        </Button>
        <Link to={`/product/${product._id}`} style={{ textDecoration: "none" }}>
          <Button size="small">Learn More</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
