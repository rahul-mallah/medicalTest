import React, {Component} from 'react'
import {Container} from 'reactstrap'
import ArticleCard from "../components/ArticleCard/ArticleCard";
import {firestore} from '../firebase'
import {Row, Col} from 'react-bootstrap'
import SearchBar from '../Patient/searchBar';
import IdleTimerContainer from '../util/IdleTimerContainer'

class ViewHealthArticleUI extends Component{
    constructor(props){
        super(props);
        this.state={
            isLoaded: false,
            articles: [],
            searchValue : ""
        }
    }

    componentDidMount(){
        this.getMyArticles()
    }


    getMyArticles = () =>{
        firestore.collection("HealthArticles").get().then(docs =>{
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
        
        let sortedArticles = this.state.articles.sort((a, b) =>
            new Date(b.createDate.toDate()) - new Date(a.createDate.toDate())
        )
        let filteredArticles = sortedArticles.filter(doc => {
            return doc.title.toLowerCase().includes(this.state.searchValue.toLowerCase())
        })

        return(
            <div>
            <IdleTimerContainer></IdleTimerContainer>
                {/* search bar */}
                <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
                >
                    <SearchBar handleChange={(e) => this.setState({searchValue: e.target.value})} placeholder = "Search for an article..."/>
                </div>
                <Container>
                    <Row>
                        {this.state.isLoaded?
                            filteredArticles.map((article, index) => {
                                return(
                                    <Col md= "3" className="container-fluid mt-4 mx-3">
                                    <ArticleCard
                                        key={index}
                                        data={article}
                                    />
                                    </Col>
                                )
                            }) : ''
                        }
                    </Row>
                </Container>         
            </div>
        )
    }
}

export default ViewHealthArticleUI