import React, {Component} from 'react'
import client from 'soundoftext-js'
import Select from 'react-select'
import {langData} from "../../../translateLang";
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';

class AudioWorker extends Component{
    constructor(props){
        super(props);
        this.state={
            ttsLang: '',
            ttsText: ''
        }
    }

    getSoundUrl = () => {
        client.sounds.create({text: this.state.ttsText, voice: this.state.ttslang})
              .then(soundUrl => {
                  this.props.insertTTSAudio(soundUrl)
              })
              .catch(e => {
                  console.log(e)
              })
    }

render() {
    return(
        <div>
            <input placeholder={"text"}
                onChange={(e) => this.setState({ttsText:e.target.value})}
            />
            <Select onChange={(e) => this.setState({ttsLang:e.value})} //get value for tts lang
                options={langData}
            />
            {/* client help us to call their api and we will receive download link of audio */}
            <button onClick={() => this.getSoundUrl()}> 
            
                Insert Audio
            </button>
        </div>
    )
  }
}

export default AudioWorker
