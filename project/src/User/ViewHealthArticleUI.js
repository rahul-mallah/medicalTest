import React, {Component} from 'react'
import {Container} from 'reactstrap'
import ArticleCard from "../components/ArticleCard/ArticleCard";
import {firestore} from '../firebase'
import NavBarArticle from '../components/NavbarArticleUI';

class ViewHealthArticleUI extends Component{
    constructor(props){
        super(props);
        this.state={
            isLoaded: false,
            articles: []
        }
    }

    componentDidMount(){
        this.getMyArticles()
    }

    getMyArticles = () =>{
        firestore.collection("HealthArticles").limit(8).get().then(docs =>{
            if(!docs.empty){
                let allArticles = []
                docs.forEach(function(doc){
                    const article = {
                        id: doc.id,
                        ...doc.data()
                    }
                    allArticles.push(article)
                })
                this.setState({
                    articles: allArticles
                }, ()=>{
                    this.setState({
                        isLoaded: true
                    })
                })
            }
        })
    }

    render() {
        return(
            <div>
                <Container>
                    {this.state.isLoaded?
                        this.state.articles.map((article, index) => {
                            return(
                                <ArticleCard
                                    key={index}
                                    data={article}
                                />
                            )
                        }) : ''
                    }
                </Container>
                
            </div>
        )
    }
}
export default ViewHealthArticleUI