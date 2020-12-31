import React, {Component} from 'react'
import classes from './ViewArticle.module.css'
import NavBarArticle from '../NavbarArticleUI';




class ViewArticle extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        return (
            <div>
                <NavBarArticle/>
               
                Article
            </div>
        )
    }
}

export default ViewArticle