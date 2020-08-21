import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, 
    BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Label } from 'reactstrap';
import { Link,  } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';



const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }; 
       this.toggleModal = this.toggleModal.bind(this);
       this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
       
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen

        });
    }
    
        
    render() {
        const nums = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const listItems = nums.map((number) =>
            <option value={number.toString()}>
                {number}
            </option>
        );

        return(
            <div>
                <Button type="button" className="btn btn-outline-secondary" outline onClick={this.toggleModal}> 
                        <span className="fa fa-pencil"> </span>
                        {" Submit Comment"}
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}> Submit Comments </ModalHeader>
                    <ModalBody>
                        <LocalForm className="container" onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" id="rating" name="rating"
                                    placeholder="Rating"
                                    className="form-control">                                
                                    {
                                        listItems
                                    }

                                </Control.select>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text model=".author" id="author" name="author"
                                    placeholder="Your Name"
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}>
                                </Control.text>
                                <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                    rows="6"
                                    className="form-control">
                                </Control.textarea>
                            </Row>
                            <Row className="form-group">
                                <Button type="submit" color="primary">
                                Submit
                                </Button>
                            </Row>

                        </LocalForm>

                        
                    </ModalBody>
                </Modal>
            </div>
            

        );
    }
        
    
}


    function RenderDish( {dish} ) {
           
        return (
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
             </div>
        );
    }

    function RenderComments({comments, postComment, dishId}) {
      
    
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
                <CommentForm dishId={dishId} postComment={postComment} />
                
            </div>
        );
        else {
            return(
                <div></div>
            );
        }
    }

    const DishDetail=(props) => {
    
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
       }
       else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
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
                        <RenderDish dish={props.dish} />
                        <RenderComments comments={props.comments} 
                        postComment={props.postComment}
                        dishId={props.dish.id}/>
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

  


    


    

        
    

    

       
        
    