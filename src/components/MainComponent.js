import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import HeaderComponet from './HeaderComponent';
import Footer from './FooterComponent'
import {DISHES} from '../shared/dishes';
import { Switch, Route, Redirect } from 'react-router-dom';


class Main extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
        dishes: DISHES,
    };
  }
 

  render() {
    const HomePage = () => {
      return(
        <Home />
      );
    }
    return (
      <div>
          <HeaderComponet />
             <Switch>
               <Route path="/home" component={HomePage} />
               <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />}/>
               <Redirect to="/home" />
             </Switch>
          <Footer />
      </div>
      
    );
  }
}

export default Main;
