import React from "react";

//Ui Material
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";

//Componentes
import { Copyright } from "../helpers/Copyright";
import AlertMessage from "../helpers/AlertMessage";

//React Context
import { MyProducts } from "../../App";

export default class ProductsList extends React.Component {
  render() {
    return (
      <MyProducts.Consumer>
        {({ products }) => (
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className="container">
              <Avatar className="container__avatar"></Avatar>
              <Typography component="h1" variant="h5">
                Shopping Cart
              </Typography>
              {products.length > 0 && (
                <Box mt={5}>
                  <TableContainer component={Paper}>
                    <Table className="table" aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell align="right">Description</TableCell>
                          <TableCell align="right">Quantity</TableCell>
                          <TableCell align="right">Weight</TableCell>
                          <TableCell align="right">Seller</TableCell>
                          <TableCell align="right"></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {products.map((product, index) => (
                          <TableRow key={index}>
                            <TableCell component="th" scope="row">
                              {product.newProductName}
                            </TableCell>
                            <TableCell align="right">
                              {product.newProductDescription}
                            </TableCell>
                            <TableCell align="right">
                              {product.newProductQuantity}
                            </TableCell>
                            <TableCell align="right">
                              {product.newProductWeight}
                            </TableCell>
                            <TableCell align="right">
                              {product.newProductSeller}
                            </TableCell>
                            <TableCell align="right">
                              <DeleteIcon
                                onClick={() =>
                                  this.props.onRemove(product.newProductId)
                                }
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}
              <Box mt={2}>
                {products.length === 0 && (
                  <AlertMessage severity="warning">
                    {" "}
                    Still no products in the cart
                  </AlertMessage>
                )}
              </Box>
            </div>
            <Box mt={5}>
              <Copyright />
            </Box>
          </Container>
        )}
      </MyProducts.Consumer>
    );
  }
}
