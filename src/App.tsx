import MainBar from './components/MainBar';
import LeftBar from './components/LeftBar';
import RightBar from './components/RightBar';
import Header from './components/Header';

import './App.css';

function App() {

  return (
    <>
    <Header />
    <div id="main-body">
    <LeftBar />
    <MainBar />
    <RightBar />
    </div>
    </>
  )
}

export default App
