import MainBar from './components/MainBar';
import LeftBar from './components/LeftBar';
import RightBar from './components/RightBar';
import Header from './components/Header';

import QuizMaker from './components/entities/QuizMaker';
import useFileStore from '../stores/FileStore';

import '../App.css';

const Editor = () => {

  const displayQuizMaker = useFileStore((state: any) => state.displayQuizMaker);

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

export default Editor;
