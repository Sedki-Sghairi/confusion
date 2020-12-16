import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import { DISHES } from '../shared/dishes';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent'
import { Switch, Route, Redirect } from 'react-router-dom'
class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
        dishes: DISHES,
        selectedDish: null
    };
  }


  render() {
    return (
      <div>
        <Header></Header>
        <Footer/>
      </div>
    );
  }
}

export default Main;