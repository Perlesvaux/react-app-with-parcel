import { useState } from 'react'
import './App.css'
import DOMPurify from 'dompurify';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
// import '../public/bootstrap.min.css'

function App() {
  const [state, setState] = useState({
    usr:"USERNAME",
    rep:"REPOSITORY_NAME",
    parseUrl:"YOUR_PROJECT",
    devEnv:"http://localhost:3000",
    proEnv:"https://myproject.onrender.com"
  })

  const regex = /https:\/\/github\.com\/([^\/]+)\/([^\/\.]+)(\.git)?/;

  const steps = [
    { legend: '<i class="bi bi-terminal fs-3"></i> Globally install Parcel (recommended)', cmd:purified('bash',`npm install parcel -g`)},
    { legend:'<i class="bi bi-terminal-fill fs-3"></i>  Create project', cmd: purified('bash',`mkdir ${state.parseUrl} && cd ${state.parseUrl} && npm init`) },
    { legend: '<i class="bi bi-terminal-fill fs-3"></i>  ... Add these scripts', cmd : purified('bash', `npm pkg set 'scripts.predeploy'='rm -rf dist && rm -rf .parcel-cache/ &&  parcel build ./*.html --public-url ./' && npm pkg set 'scripts.deploy'='gh-pages -d dist' && npm pkg set 'scripts.start'='parcel ./*.html'`)},
    { legend: '<i class="bi bi-terminal-fill fs-3"></i>  ... Install this dependency' ,cmd:purified('bash', `npm i --save-dev gh-pages`) },
{legend: '<i class="bi bi-terminal fs-3"></i>  If you didn\'t install Parcel globally, add it to your project like this', cmd:purified('bash',`npm i --save-dev parcel` )},
    { legend: '<i class="bi bi-terminal-fill fs-3"></i> ... It\'s time to deploy! (setup your <a href=\'https://github.com/new\'><strong>remote repository</strong></a> first!)', cmd: purified('bash', `npm run deploy`) }
  ]


  const tsar_bomba = purified('bash',`curl -o - https://raw.githubusercontent.com/Perlesvaux/react-app-with-parcel/main/react_boilerplate | bash -s -- ${state.parseUrl}`)


  const little_boy = purified('bash',`npm pkg set 'scripts.predeploy'='rm -rf dist && rm -rf .parcel-cache/ &&  parcel build ./*.html --public-url ./' && npm pkg set 'scripts.deploy'='gh-pages -d dist' && npm pkg set 'scripts.start'='parcel ./*.html' && npm i --save-dev gh-pages`)


  function getInput(e){
    setState({...state, [e.target.name]:e.target.value})
  }
  
  function parseUrl(e){
    const url = state[e.target.name]
    const match = url.match(regex);
    let username = (match) ? match[1] : '' 
    let repositoryName = (match) ? match[2] : '' 
    setState({...state, usr:username, rep: repositoryName})
  }


  function purified(lng, mrkp){
    return DOMPurify.sanitize(hljs.highlight(mrkp, {language: lng}).value)
  }


function toClipBoard(e) {
  try {
    navigator.clipboard.writeText(e.currentTarget.textContent);
    console.log(e.currentTarget.textContent)
    console.log(e.currentTarget.innerText)
  } catch (err) {
    console.error('Failed to copy: ', err);
    /* Rejected - text failed to copy to the clipboard */
  }
}


  return (
    <>

      <h1 className='text-center'>Quick Start!</h1>
      
      <div className='flx'>
        <label htmlFor="parseUrl" className='optn text-center badge text-bg-dark fs-6'>Project name goes here: 
          <input type="text" name="parseUrl" onChange={getInput} onKeyUp={parseUrl}  value={state.parseUrl == 'YOUR_PROJECT' ? '' : state.parseUrl} /> 
        </label>
      </div>

      {
        steps.map((step) =>
        <div key={step.legend}>
         <h6 className='text-muted'   dangerouslySetInnerHTML={{__html:step.legend}}></h6>
         <pre><code onClick={toClipBoard} className='text-start btn btn-light' dangerouslySetInnerHTML={{__html:step.cmd}}></code></pre>
        </div>)
      }

      <h1 className='text-center'>Push it to the limit!</h1>
      <p className='text-center'> <i className="bi bi-radioactive fs-3"></i> These below assume a <strong>global installation</strong> and <strong>remote repository already set</strong>!</p>
      <h6 className='text-muted'> <i className="bi bi-file-code-fill fs-2"></i> One-liner with the essentials. Only thing left is to run the <strong>deploy</strong> script! (requires having a package.json already)</h6>
      <pre><code onClick={toClipBoard} className='text-start btn btn-light' dangerouslySetInnerHTML={{__html:little_boy}}></code></pre>

      <h6 className='text-muted'> <i className="bi bi-file-code fs-2"></i> Use this to create a <strong>React.js app</strong> from scratch! (no need for a package.json just yet!)</h6>
      <pre><code onClick={toClipBoard} className='text-start btn btn-light' dangerouslySetInnerHTML={{__html:tsar_bomba}}></code></pre>
    </>
  )
}

export default App
