import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {

    constructor(props) {
        super(props);
    }
    
    renderDishDetail(dish) {
        if (dish != null)
          return (
                 <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
          );
        else
           return(
             <div></div>
             
            );
    }

    renderComments(comments) {
        return (
            <div className="col-12 col-md-5 col-lg-5 m-1">
                <div>
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                    {
                        comments.map((commnent) => {
                            console.log(commnent.author);
                            return (
                                <li key={commnent.id}>
                                    <p> {commnent.author}</p>
                                </li>
                            );
                        })
                    }
                    </ul>
                </div>
            </div>
        );
    }

    renderDish(dish) {
        if (dish != null) {
            return (
                <div className="row ">
                <div  className="col-12 col-md-5 col-lg-5 m-1">
                    <div>
                        {this.renderDishDetail(dish)}
                    </div>
                </div>
                {this.renderComments(dish.comments)}
                
            </div>
            );
        } else {
            return (
                <div></div>
            );
        }
    }
    
    render() {
        return (
            this.renderDish(this.props.dish)
        );
    }
}

export default DishDetail;

  


    


    

        
    

    

       
        
    