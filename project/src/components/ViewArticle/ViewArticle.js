import React, {Component} from 'react'
import classes from './ViewArticle.module.css'
import parse from 'html-react-parser'
import {Container} from 'reactstrap'
import {firestore, removeImageFromStorage} from '../../firebase'
import IdleTimerContainer from '../../util/IdleTimerContainer'



let cross = document.createElement('div');

class ViewArticle extends Component {
    constructor(props){
        super(props);
        this.state={
            article: {},
            isLoaded: false,

        }
        console.log(this.props)
    }

    // This method is executed after render method has been finished
    // Handle 2 cases: 1st state is to parse the state to ViewArticle.js
    // 2nd state is to handle the URL bar so we need to receive our URL and
    // to write data
    componentDidMount(){
        if(typeof this.props.location.state !== 'undefined'){
            if(this.props.location.state.hasOwnProperty('article')){
                this.setState({
                    article: this.props.location.state.article
                }, () => {
                    this.setState({
                        isLoaded: true //Check if our article is loaded
                    })
                })
            }
        }
        else {
            this.getArticleByID(this.props.match.params.id)
        }
    }

    getArticleByID = (aid) => {
        firestore.collection('HealthArticles')
                  .doc(aid)
                  .get()
                  .then(doc => {
                      if(doc.exists){
                          this.setState({
                              article: doc.data()
                          }, () => {
                              this.setState({
                                  isLoaded: true
                              })
                          })
                      } else{
                          this.props.history.push({pathname: '/'})
                      }
                  })

    }

    deleteArticle(aid){
        var desertRef = removeImageFromStorage.refFromURL(this.state.article.featureImage)
        firestore.collection('HealthArticles').doc(aid).delete().then(()=>{
            this.props.history.push({pathname: '/MedDoc/ViewHealthArticle'})
            alert("Article has been deleted successfully!")
        }).catch(err => alert(err))
        desertRef.delete().then(function(){
            console.log('file deleted')
        }).catch(function(error){
            console.log('error')
        })
    }
        
    timeStampToString = (ts) => {
        const date = new Date(ts*1000)
        return date.getFullYear() +'/'+ (date.getMonth()+1) + '/' + date.getDate() 
     }
     
    render(){
        if(this.state.isLoaded){
            return (
                <div>
                <IdleTimerContainer></IdleTimerContainer>
                    <Container>
                        <div className={classes.Article}>
                            <div className={classes.ImageContainer}>
                                <img className={classes.Image}
                                    src={this.state.article.featureImage}
                                    alt={this.state.article.title}
                                />
                                <div className={classes.ArticleInfo}>
                                    <h1 className={classes.Title}>
                                        {this.state.article.title}
                                    </h1>
                                    <div className={classes.Date}>
                                        {this.timeStampToString(this.state.article.lastModified.seconds)}
                                    </div>
                                </div>
                            </div>
                            <div className={classes.ArticleMain}>
                                {parse(this.state.article.content)}
                            </div>
                            <a onClick={() => {window.location.href="/MedDoc/edit-article"}} className="btn btn-success">Edit</a>
                            <button onClick = {this.deleteArticle.bind(this, this.state.article.id)}class = "btn btn-danger">Delete</button>
                        </div>
                    </Container>
                </div>
            )
        }else{
            return(
                <div>
                    loading...
                </div>
            )
        }
    }
}

export default (ViewArticle)