import React, {Component} from 'react'
import classes from './NewArticle.module.css'
import NavBarArticle from '../NavbarArticleUI';


class NewArticle extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        return (
            <div>
                <NavBarArticle/>
                New Article
            </div>
        )
    }
}

export default NewArticle