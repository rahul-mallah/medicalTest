import React from 'react'
import {Card, CardImg, CardTitle, CardSubtitle, CardBody, Badge} from 'reactstrap'
import classes from './ArticleCard.module.css'


const ArticleCard = (props) => {
   return(
      <Card className={classes.ArticleCard}>
         <CardImg
            top
            width="100%"
            src="https://media.springernature.com/lw725/springer-cms/rest/v1/content/16269262/data/v1"
            alt="Card Image"
            className={classes.CardImage}
         /> 
         <CardBody className={classes.CardBody}> 
            <CardTitle className={classes.CardTitle}> 
               Test Title
            </CardTitle> 
            <CardSubtitle className={classes.CarSubtitle}> 
               <Badge className={classes.ArticleLabel}> 
                  Topic
               </Badge>
            </CardSubtitle> 
         </CardBody>
      </Card>
   )
}
export default ArticleCard