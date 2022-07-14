import {
  Button,
  Container,
  Input,
  MenuItem,
  Select,
  styled,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { Component } from "react";

const InnerBox = styled(Box)(({ theme }) => ({
  border: "solid 1px grey",
  width: "40%",
  height: "78%",
  padding: "3rem 0rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  boxShadow: "5px 2px 10px rgba(0,0,0,0.5)",

  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

class ListProduct extends Component {
  state = {
    title: "",
    desc: "",
    img: "",
    cat: 0,
    size: 0,
    color: "",
    price: 0,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      title: this.state.title,
      desc: this.state.desc,
      img: this.state.img,
      categories: [this.state.cat],
      size: this.state.size,
      color: this.state.color,
      price: this.state.price,
      listedBy: this.props.user._id,
    };

    fetch("http://localhost:5000/api/v1/products", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(newItem),
    })
      .then((res1) => res1.json())
      .then((data1) => {
        const listedItems = [
          ...this.props.user.listedItems,
          data1.data.product._id,
        ];
        fetch(`http://localhost:5000/api/v1/users/${this.props.user._id}`, {
          method: "PATCH",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
          body: JSON.stringify({
            listedItems,
          }),
        })
          .then((res2) => res2.json())
          .then((data2) => {
            this.props.setUser(data2.data.user);
            this.props.history.push("/");
          });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { title, desc, img, cat, size, color, price } = this.state;
    const { history } = this.props;
    return (
      <Box
        style={{
          height: "calc(100vh - 3rem - 64px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "90%",
          }}
        >
          <InnerBox sx={{}}>
            <h1>List Products</h1>
            <form onSubmit={this.handleSubmit} style={{}}>
              <TextField
                variant="standard"
                type="text"
                label="Title"
                name="title"
                onChange={this.handleChange}
                value={title}
                required
              />
              <br />
              <br />
              <TextField
                variant="standard"
                type="text"
                label="Description"
                name="desc"
                onChange={this.handleChange}
                value={desc}
                required
              />
              <br />
              <br />
              <TextField
                variant="standard"
                type="text"
                label="Image link"
                name="img"
                onChange={this.handleChange}
                value={img}
                required
              />
              <br />
              <br />

              <Select
                variant="standard"
                label="Category"
                onChange={this.handleChange}
                fullWidth
                value={cat}
              >
                <MenuItem value={0}>Category 1</MenuItem>
                <MenuItem value={1}>Category 2</MenuItem>
                <MenuItem value={2}>Category 3</MenuItem>
              </Select>
              {/* <!-- Categories in reality should be checkboxes --> */}
              <br />
              <br />
              <Input
                type="number"
                placeholder="Size"
                name="size"
                onChange={this.handleChange}
                value={size}
              />
              <br />
              <br />
              <Input
                type="text"
                placeholder="Color"
                name="color"
                onChange={this.handleChange}
                value={color}
              />
              <br />
              <br />
              <Input
                type="number"
                placeholder="Price"
                name="price"
                onChange={this.handleChange}
                value={price}
                required
              />
              <br />
              <br />
              <Box sx={{ display: "flex", gap: "0.5rem" }}>
                <Button
                  variant="contained"
                  color={`error`}
                  onClick={() => {
                    history.goBack();
                  }}
                >
                  Cancel
                </Button>
                <Button variant="contained" color={`primary`} type="submit">
                  List Item
                </Button>
              </Box>
              <br />
              <br />
            </form>
          </InnerBox>
        </Container>
      </Box>
    );
  }
}

export default ListProduct;
