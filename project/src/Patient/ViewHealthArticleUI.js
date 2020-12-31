import React, {Component} from 'react'
import {Container} from 'reactstrap'
import ArticleCard from "../components/ArticleCard/ArticleCard";
import firebase from "../firebase"

class ViewHealthArticleUI extends Component{
    constructor(props){
        super(props);
        this.state={
        }
    }

    render() {
        return(
            <div>
                <ArticleCard/>
            </div>
        )
    }
}
export default ViewHealthArticleUI