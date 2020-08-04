import React, { Fragment } from "react";
import { Switch, Route, Link, BrowserRouter, Redirect } from "react-router-dom";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

//componentes
import ProductsForm from "./components/Form/ProductsForm";
import HomePage from "./components/Home/HomePage";
import ProductsList from "./components/List/ProductsList";
import NotFoundPage from "./components/helpers/NotFoundPage";
import ErrorBoundary from "./components/helpers/ErrorBoundary";

//css
import "./App.css";

//React context
export const MyProducts = new React.createContext();

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    };
  }

  handleOnAdd = (newProduct) => {
    this.setState({ products: [...this.state.products, newProduct] });
  };

  handleOnRemove = (newProductId) => {
    let newProducts = this.state.products.filter(product => product.newProductId !== newProductId)
    this.setState({ products: newProducts })
  };

  render() {
    return (
      <ErrorBoundary>
      <MyProducts.Provider value={this.state}>
        <BrowserRouter>
          <div className="App">
            <Route
              path="/"
              render={({ location }) => (
                <Fragment>
                  <Tabs value={location.pathname}>
                    <Tab label="Home" value="/" component={Link} to="/" />
                    <Tab
                      label="Add Products"
                      value="/addProducts"
                      component={Link}
                      to="/addProducts"
                    />
                    <Tab
                      value="/listProducts"
                      label="List Products"
                      component={Link}
                      to="/listProducts"
                    />
                  </Tabs>
                  <Switch>
                    <Route
                      path="/addProducts"
                      render={() => <ProductsForm onAdd={this.handleOnAdd} />}
                    />
                    <Route
                      path="/listProducts"
                      render={() => <ProductsList onRemove={this.handleOnRemove}/>}
                    />
                    <Route exact path="/" render={() => <HomePage />} />
                    <Route path="*">
                      <NotFoundPage />
                    </Route>
                  </Switch>
                </Fragment>
              )}
            />
          </div>
        </BrowserRouter>
      </MyProducts.Provider>
      </ErrorBoundary>
    );
  }
}
