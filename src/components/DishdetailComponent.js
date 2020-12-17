import React from 'react'
import { Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'

function RenderDish({dish}) {
        return(
            <Card>
            <CardImg top src={dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
            </Card>
            )
  }

  function RenderComments({comments}) {
    
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

  const  DishDetail = (props) => {
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
             {(props.comments) && <RenderComments comments = {props.comments}/>}
            </div>
            </div>
        </div>
        
    )
    
  }

export default DishDetail;