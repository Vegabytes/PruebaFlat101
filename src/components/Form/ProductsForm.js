import React from "react";

//Ui Material
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import InputAdornment from "@material-ui/core/InputAdornment";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

//Components
import { Copyright } from "../helpers/Copyright";
import AlertMessage from "../helpers/AlertMessage";

//css
import "./form.css";

export default class ProductsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      newProduct: {},
      submitted: false,
      sellers: [],
    };
  }

  handleSubmit = (e) => {
    this.props.onAdd(this.state.newProduct);

    this.setState({
      products: [
        ...this.state.products,
        { ...this.state.newProduct, newProductId: Math.random() },
      ],
      newProduct: {},
      submitted: true,
    });
    e.preventDefault();
    console.log(this.state.products);
  };

  handleChange = (e) => {
    const [section, key] = e.target.name.split(".");
    this.setState({
      submitted: false,
      [section]: {
        ...this.state.newProduct,
        [key]: e.target.value,
      },
    });
  };



  fetchSellers = async () => {
    let data = await (
      await fetch("https://jsonplaceholder.typicode.com/users")
    ).json();
    this.setState({ 
      sellers: data,
      newProduct: {
        ...this.state.newProduct,
        newProductSeller: data[0].name
      }
    });
  };

  componentDidMount() {
    this.fetchSellers();
  }

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="container">
          <Avatar className="container__avatar"></Avatar>
          <Typography component="h1" variant="h5">
            Shopping Cart
          </Typography>
          <Box mt={5}>
            <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="newProduct.newProductName"
                    variant="outlined"
                    required
                    fullWidth
                    id="productName"
                    label="Product Name"
                    autoFocus
                    placeholder="Lemon"
                    value={this.state.newProduct.newProductName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="description"
                    label="Description"
                    name="newProduct.newProductDescription"
                    autoComplete="lname"
                    placeholder="Fruit"
                    value={this.state.newProduct.newProductDescription}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="number"
                    label="Quantity"
                    name="newProduct.newProductQuantity"
                    placeholder="5"
                    value={this.state.newProduct.newProductQuantity}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="newProduct.newProductWeight"
                    label="Weight"
                    type="number"
                    id="weight"
                    placeholder="2,5"
                    value={this.state.newProduct.newProductWeight}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">Kg</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl className="container__formControl">
                    <InputLabel id="demo-controlled-open-select-label">
                      Seller
                    </InputLabel>
                    <Select
                      name="newProduct.newProductSeller"
                      native
                      labelId="demo-controlled-open-select-label"
                      id="demo-controlled-open-select"
                      value={this.state.newProduct.newProductSeller}
                    >
                      {this.state.sellers.map((seller) => (
                        <option key={seller.name} value={seller.name}>
                          {seller.name}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="container__submit"
                >
                  Add to Cart
                </Button>
              </Box>
            </form>
          </Box>
          <Box mt={2}>
            {this.state.submitted && (
              <AlertMessage severity="success">
                A new product has been added to the cart
              </AlertMessage>
            )}
          </Box>
        </div>
        <Box mt={2}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}
