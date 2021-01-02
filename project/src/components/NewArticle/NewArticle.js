import React, {Component} from 'react'
import {Container, Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button} from 'reactstrap'
import classes from './NewArticle.module.css'
import Compressor from 'compressorjs'
import NavBarArticle from '../NavbarArticleUI';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Form } from 'react-bootstrap';
import { firestore, storageRef } from '../../firebase';
import {v4 as uuidv4} from 'uuid'
import AudioWorker from './AudioWorker/AudioWorker'


const Quill = ReactQuill.Quill
const BlockEmbed = Quill.import('blots/block/embed')

class AudioBlot extends BlockEmbed {
    static create(url){
        let node = super.create()
        node.setAttribute('src', url)
        node.setAttribute('controls', '')
        return node
    }

    static value(node){
        return node.getAttribute('src')
    }
}

AudioBlot.blotName = 'audio'
AudioBlot.tagName = 'audio'
Quill.register(AudioBlot)

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
            handlers: {
                'image': () => this.quillImageCallBack()
            }
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
        'code-block','audio'
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
                     alert("Article has been created successfully")
                 })
                 .catch(err => console.log(err))
    }

    fileCompress = (file) => {
        return new Promise((resolve, reject) => {
            new Compressor(file, {
                file: 'File',
                quality: 0.5,
                maxWidth: 640,
                maxHeight: 640,
                success(file){
                    return resolve({ //return promise by using resolve
                        success: true,
                        file: file
                    })
                },
                error(err){
                    return resolve({
                        success: false,
                        message: err
                    })
                }
            })
        })
    }

    quillImageCallBack =() => {
        const input = document.createElement('input')
        input.setAttribute('type', 'file') //Upload image file only
        input.setAttribute('accept', 'image/*') //User can upload image only
        input.click() //Input will click automatically so that we don't need to handle further progress
        input.onChange = async () => { //When user select the image, this method will be called
            const file = input.files[0] //receive input files after onChange method is called
            const compressState = await this.fileCompress(file) //receive results from file compress function
            if(compressState.success){
                console.log(compressState)
                const fileName = uuidv4()
                //compress state to upload to firebase storage
                storageRef.child("HealthArticles/" + fileName).put(compressState.file) 
                          .then(async snapshot => { //contain uploaded image, size of image, path of image
                            //Receive download link
                            const downloadURL = await storageRef.child("HealthArticles/" + fileName).getDownloadURL()
                            let quill = this.quill.getEditor()
                            const range = quill.getSelection(true) //store all the elements in quill object
                            quill.insertEmbed(range.index, 'image', downloadURL)
                          })
            }
        }
    }

    uploadImageCallBack = (e) => {
        return new Promise(async (resolve, reject) => {
            const file = e.target.files[0] //receive files
            const fileName = uuidv4()
            storageRef.child("HealthArticles/" + fileName).put(file) //uuidv4 is our file names
                      .then(async snapshot => { //contain uploaded image, size of image, path of image
                        //Receive download link
                        const downloadURL = await storageRef.child("HealthArticles/" + fileName).getDownloadURL()
                        console.log(downloadURL)
                        resolve({
                            success: true,
                            data: {link: downloadURL}
                        })
                      })
        })
    }

    //function to receive sound URL
    insertTTSAudio = (soundURL) => {
        let quill = this.quill.getEditor()
        const range = quill.getSelection(true)
        let position = range ? range.index : 0
        quill.insertEmbed(position, 'audio', soundURL, 'user')
    }

    render(){
        return (
            <div>
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
                                <AudioWorker insertTTSAudio={this.insertTTSAudio}/>
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
                                    <Label className={classes.Label}>Feature Image</Label>
                                    <Input type="file" accept="image/*" className={classes.ImageUploader}
                                    onChange={async (e) => {
                                        const uploadState = await this.uploadImageCallBack(e)
                                        if (uploadState.success){
                                            this.setState({
                                                hasFeatureImage: true,
                                                article: {
                                                    ...this.state.article,
                                                    featureImage: uploadState.data.link
                                                }
                                            })
                                        }
                                    }}>
                                    </Input>

                                    {
                                        this.state.hasFeatureImage? //If True
                                            <img src={this.state.article.featureImage} className ={classes.FeatureImg} /> :''
                                    }
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