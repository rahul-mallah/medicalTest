import React from 'react'
import {Card, CardImg, CardTitle, CardSubtitle, CardBody, Badge} from 'reactstrap'
import {Link} from 'react-router-dom'
import classes from './ArticleCard.module.css'

export function timeStampToString(ts) {
   const date = new Date(ts*1000)
   return date.getFullYear() +'/'+ (date.getMonth()+1) + '/' + date.getDate() 
}

const ArticleCard = (props) => { 
   return(
      <Card className={classes.ArticleCard}>
         <Link to = {'article/' + props.data.id}>
            <CardImg
               top
               width="100%"
               src="https://media.springernature.com/lw725/springer-cms/rest/v1/content/16269262/data/v1"
               alt="Card Image"
               className={classes.CardImage}
            /> 
         </Link>
         <CardBody className={classes.CardBody}> 
            <CardTitle className={classes.CardTitle}> 
               <Link to = {'article/' + props.data.id}>
                  {props.data.title}
               </Link>
            </CardTitle> 
            <CardSubtitle className={classes.CarSubtitle}> 
               <Badge className={classes.ArticleLabel}> 
                  {props.data.categoryLabel}
               </Badge>
               <Badge className={classes.createDate}> 
                  {timeStampToString(props.data.createDate.seconds)}
               </Badge>
            </CardSubtitle> 
         </CardBody>
      </Card>
   )
}
export default ArticleCard