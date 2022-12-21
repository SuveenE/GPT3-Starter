import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { DateTime } from "luxon";
import Countdown from 'react-countdown';
import buildspaceLogo from '../assets/buildspace-logo.png';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [userField, setUserField] = useState('')
  const [yesClicked, setYesClicked] = useState(false)
  const [noClicked, setNoClicked] = useState(false)
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [heardBefore, setHeardBefore] = useState('never');
  //console.log(Date.now())

const callGenerateEndpoint = async () => {
  setIsGenerating(true);
  
  console.log("Calling OpenAI...")
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput, heardBefore, userField }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)

  setApiOutput(`${output.text}`);
  setIsGenerating(false);
  }

  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };

  const onUserChangedField = (event) => {
    setUserField(event.target.value);
  };

  const onYesBtnClick = () =>{
    setHeardBefore('');
    setYesClicked(true)
    setNoClicked(false)
  }
  
  const onNoBtnClick = () =>{
    setHeardBefore('never');
    setNoClicked(true)
    setYesClicked(false)
  }
  
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
    } else {
      return <span>{hours}:{minutes}:{seconds}</span>;
    }
  };

  return (
    <div className="root">
      <Head>
        <title>WhatNot</title>
      </Head>
      <div className="header">
          <div className="header-title">
            <h1>WhatNot</h1>
          </div>
          <div className='icon-row'>
          <div className='help-icon'>
            Help
          </div>
          <div className='settings-icon'>
            Stats
          </div>
          </div>
          {/* <div className="header-subtitle">
            <h2>Learn Something new everyday in 3 mins and get closer to becoming a generalist!</h2>
          </div> */}
        </div>
      <div className="container">
        
        <div className="topic-title">
            <div>Today's topic is</div>
            <div className='topic'> CRISPR.</div>
        </div>
        
        { !apiOutput ? <div className="prompt-container">
        <div className='question-row-1'>
          <p className='question-1 yes-no'>Have you heard this term before?</p>
          <button className='yes-btn' onClick={onYesBtnClick} style={{background:yesClicked?"green":"grey"}}>
            Yes
          </button>
          <button className='no-btn' onClick={onNoBtnClick} style={{background:noClicked?"red":"grey"}}>
            No
          </button>
        </div>
          <div className='question-row-1 question-age'>
            <p>Teach me this as I am _ _ years old</p>
            {/* <textarea
            placeholder="Eg: 12"
            className="prompt-box"
            value={userInput}
            onChange={onUserChangedText}
          /> */}
        
          <input 
          type='number' 
          min='1' 
          max='99' 
          className="prompt-box" 
          onChange={onUserChangedText} 
          value={userInput} 
          placeholder=" Eg: 12">
          </input>
          </div>
          <div className='question-row-1'>
          <p className='question-1'>What's your most knowledgeable field?</p>
          <input
            placeholder=" Eg: Football"
            className="prompt-box prompt-field"
            value={userField}
            onChange={onUserChangedField}
          />
        </div>
           
          <div className="prompt-buttons">
            <a className={isGenerating ? 'generate-button loading' : 'generate-button'} onClick={callGenerateEndpoint}>
              <div className="generate">
                {isGenerating ? <span class="loader"></span> : <p>Teach Me 🙏</p>}
              </div>
            </a>
          </div> 
        </div> :
        
          <div className="output">
            {/* <div className="output-header-container">
              <div className="output-header">
                <h3>Output</h3>
              </div>
            </div> */}
            <div className="output-content">
              <p>{apiOutput}</p>
            </div>
            <div className ='output-row'>
            <div className='countdown-text'>
              Next WhatNot in 
            </div>
            <Countdown 
              date='2022-12-22T00:00:00'
              renderer={renderer}
              zeroPadTime= '2'
             />
            <div className='share-btn'>
            <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-size="large" target="_blank" rel="noopener noreferrer" data-text="I just learn about CRISPR on WhatNot!" data-hashtags="whatnot " data-lang="en" data-show-count="false">Tweet</a>
            <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
            </div>
            </div>
          </div>}
        
      </div>
      <div className='footer'>
        Built by <a href='https://twitter.com/SuveenE'>Suveen</a>
      </div>
    </div>
  );
};

export default Home;
