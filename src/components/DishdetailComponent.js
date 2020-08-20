import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';





    function RenderDish( {dish} ) {
           
        return (
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
             </div>
        );
    }

    function RenderComments({comments}) {
       if(comments != null)
        return (
            <div className="col-12 col-md-5 col-lg-5 m-1">
                <div>
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {
                            comments.map((commnent) => {
                                console.log(commnent.author);
                                return (
                                    <ul className="list-unstyled">
                                        <li key={commnent.id}>
                                            <p> {commnent.comment}</p></li>
                                        <li key={commnent.id}>
                                            <p> --{commnent.author}, 
                                            {
                                                new Intl.DateTimeFormat('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: '2-digit'
                                                }).format(new Date(commnent.date))
                                            }
                                            </p>
                                        </li>
                                    </ul>
                                );
                            })
                        }                    
                    </ul>
                </div>
                <CommentForm />
                
            </div>
        );
        else {
            return(
                <div></div>
            );
        }
    }

    const DishDetail=(props) => {
    
        if (props.dish != null) {
            return (
                <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    {/* <div className="col-12 col-md-5 m-1"> */}
                        <RenderDish dish={props.dish} />
                    {/* </div> */}
                    {/* <div className="col-12 col-md-5 m-1"> */}
                        <RenderComments comments={props.comments} />
                    {/* </div> */}
                </div>
                </div>
            );
            
        } else {
            return (
                <div></div>
            );
        }
    }
    


export default DishDetail;

  


    


    

        
    

    

       
        
    