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
      <Card className= "" style={{ width: '18rem'}}>
         <Link to = {{
            pathname:  'article/' + props.data.id,
            state: {article: props.data} //pass the state and data info into view article page
         }}>
            <CardImg variant = "top" src={props.data.featureImage} height = "220px"/> 
            </Link>
         <CardBody className={classes.CardBody}> 
            <CardTitle className={classes.CardTitle}> 
               <Link to = {{
               pathname:  'article/' + props.data.id,
               state: {article: props.data} //pass the state and data info into view article page
               }}>
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