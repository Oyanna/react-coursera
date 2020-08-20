import React, { Component } from 'react';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Button, Modal, ModalHeader, ModalBody, Label, Row } from 'reactstrap';

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
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
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
export default CommentForm;