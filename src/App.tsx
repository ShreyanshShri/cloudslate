import MainBar from './components/MainBar';
import LeftBar from './components/LeftBar';
import RightBar from './components/RightBar';
import Header from './components/Header';

import QuizMaker from './components/entities/QuizMaker';
import useEntityStore from './stores/EntityStore';

import './App.css';

function App() {

  const displayQuizMaker = useEntityStore((state: any) => state.displayQuizMaker);

  return (
    <>
    {displayQuizMaker && <QuizMaker />}
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
