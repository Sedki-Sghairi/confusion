import React, { Component } from 'react'
import { Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap';

export default class DishdetailComponent extends Component {
    renderComments(comments) {
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
                </>
            );
        else
            return(
                <div></div>
            );
    }
    renderDish(dish){
         if(dish != null){
            return(
                <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                  <CardTitle>{dish.name}</CardTitle>
                  <CardText>{dish.description}</CardText>
                </CardBody>
                </Card>
                )
         }else{
             <div></div>
         }
    }
    render() {
        return (
            <div className='container'>
               <div className="row">
               <div  className="col-12 col-md-5 m-1">
                  {this.renderDish(this.props.dish)}
                </div>
                <div className="col-12 col-md-5 m-1">
                 {(this.props.dish !== undefined ) && this.renderComments(this.props.dish.comments)}
                </div>
               </div>
            </div>
            
        )
    }
}
