import React, {Component} from 'react'
import {Container, Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button} from 'reactstrap'
import classes from './NewArticle.module.css'
import NavBarArticle from '../NavbarArticleUI';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Form } from 'react-bootstrap';
import { firestore } from '../../firebase';


class NewArticle extends Component {
    constructor(props){
        super(props);
        this.state={
            article:{ //List of attributes for article
                title:'',
                content:'',
                createDate: new Date(), //current date of this moment
                featureImage: '', //Upload feature Image for the article later on
                isPublish: false,
                lastModified: new Date(),
                createUserID: '' //Check whether the user has the permisson to edit the article
            }
        }
    }

    modules = {
        toolbar: {
            container: [
                [{'header': '1'}, {'header': '2'}, {'font': []}],
                [{size: []}],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'},
                   {'indent': '-1'}, {'indent': '+1'}],
                ['link', 'image'],
                ['clean'], ['code-block']
            ],
        },
        clipboard: {
            matchVisual: false,
        },
    }

    formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'video',
        'code-block',
    ]

    onChangeArticleTitle = (value) => {
        this.setState({
            article: {
                ...this.state.article, //operator to change the title
                title:value
            }
        })
    }

    //The option(True, False) will parse into this function
    onChangePublish = (val) => {
        this.setState({
            article: {
                ...this.state.article, //operator to change the title
                isPublish:val === 'True' 
            }
        })
    }



    onChangeArticleContent = (value) => {
        this.setState({
            article: {
            ...this.state.article,
            content:value
            } 
        })
    }

    submitArticle = () => {
        const article = this.state.article
        //article.createUserID = this.props.auth.uid
        firestore.collection("HealthArticles")
                 .add(article)
                 .then(res=>{
                     console.log(res)
                 })
                 .catch(err => console.log(err))
    }

    render(){
        return (
            <div>
                <NavBarArticle/>
                <Container>
                    <Row>
                        <Col xl={9} lg={9} md={8} sm={12} xs={12}>
                            <h2 className={classes.SectionTitle}>New Article</h2>
                            <FormGroup>
                                <Label ClassName={classes.Label}>Title</Label>
                                <Input type = 'text' name='articleTitle' id='articleTitle' 
                                        placeholder='' onChange={(e) => this.onChangeArticleTitle(e.target.value)}
                                        value={this.state.article.title}    
                                />
                            </FormGroup>

                            <FormGroup>
                                <ReactQuill
                                    ref={(el) => this.quill = el}
                                    value={this.state.article.content}
                                    onChange={(e) => this.onChangeArticleContent(e)}
                                    theme='snow'
                                    modules={this.modules} //customize reactquill layout
                                    formats={this.formats} 
                                />
                            </FormGroup>

                        </Col>
                        <Col xl={3} lg={3} md={4} sm={12} xs={12}>
                            <Card>
                                <CardHeader>
                                    Article Setting
                                </CardHeader>
                                <CardBody>
                                    <FormGroup>
                                        <Label className={classes.Label}>Publish</Label>
                                        <Input type='select' name='publish' id='publish'
                                            onChange={(e) => this.onChangePublish(e.target.value)}                 
                                        >
                                            <option>False</option> 
                                            <option>True</option>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Button color='danger'
                                            onClick={(e) => this.submitArticle()}
                                        >
                                            Submit

                                        </Button>
                                    </FormGroup>
                                </CardBody>
                            </Card>

                        </Col>                       
                    </Row>

                </Container>
            </div>
        )
    }
}

export default NewArticle