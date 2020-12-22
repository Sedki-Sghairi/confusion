import { Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem, Row, Col, Label, Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import { Control, LocalForm, Errors } from 'react-redux-form';
import React, { Component } from 'react'
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


class CommentForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);

    }
    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }
    handleSubmit(values) {
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }
    render() {
        return (
            <>
            <Button outline onClick={this.toggleModal}> Comment</Button> 
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group">
                                        <Label htmlFor="rating" className="col-12">Rating</Label>
                                    <Col md={12}>
                                        <Control.select model=".rating" id="rating" name="rating"
                                            className="form-control"
                                            >
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </Control.select>
             
                                    </Col>
                        </Row>
                        <Row className="form-group">
                                <Label htmlFor="name" md={12}>Your Name</Label>
                                <Col md={12}>
                                        <Control.text model=".name" id="name" name="name"
                                            placeholder="Your Name"
                                            className="form-control"
                                            validators={{
                                                required, minLength: minLength(3), maxLength: maxLength(15)
                                            }}
                                            />
                                        <Errors
                                            className="text-danger"
                                            model=".name"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                        />
                                </Col>
                        </Row>
                                <Row className="form-group">
                                <Label htmlFor="message" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".message" id="message" name="message"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10}}>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                </ModalBody>
            </Modal> 
            </>       
        )
    }
}


function RenderDish({dish}) {
        return(
            <Card>
            <CardImg top src={baseUrl + dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
            </Card>
            )
  }

  function RenderComments({comments, addComment, dishId}) {
    if (comments != null)
    return(
        <>
            <h1>Comments</h1>
            <ul className='list-unstyled'>
            {comments.map((comment) =>{
                    return(
                    <div key={comment.id}>
                    <li>{comment.comment}</li><br/>
                    <li>-- {comment.author} ,
                    {new Intl.DateTimeFormat("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "2-digit"
                         }).format(new Date(Date.parse(comment.date)))}</li><br/>
                    </div>
                    )
                })}
            </ul>
            <CommentForm dishId={dishId} addComment={addComment} />
        </>
    );
else
    return(
        <div></div>
    );
    
  }

  const  DishDetail = (props) => {
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
    else if (props.dish != null){
    return (
        <div className='container'>
           <div className="row">
           <Breadcrumb>
                  <BreadcrumbItem>
                        <Link to='/menu'> Menu</Link>
                  </BreadcrumbItem>
                  <BreadcrumbItem active>
                        {props.dish.name}
                  </BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr/>
            </div>            
            <div  className="col-12 col-md-5 m-1">
             {props.dish && <RenderDish dish = {props.dish}/>}
            </div>
            <div className="col-12 col-md-5 m-1">
             {(props.comments) &&
             <RenderComments comments={props.comments} addComment={props.addComment} dishId={props.dish.id}/>           
            }
            </div>
            </div>
        </div>
        
    )
    }
  }

export default DishDetail;