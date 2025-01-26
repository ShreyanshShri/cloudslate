import MainBar from "./components/MainBar";
import LeftBar from "./components/LeftBar";
import RightBar from "./components/RightBar";
import Header from "./components/Header";

import QuizMaker from "./components/entities/QuizMaker";
import Settings from "../common/Settings";

import useFileStore from "../../stores/FileStore";
import useSettingsStore from "../../stores/SettingsStore";

import "../../App.css";

const Editor = () => {
	const displayQuizMaker = useFileStore((state: any) => state.displayQuizMaker);
	const displaySettings = useSettingsStore(
		(state: any) => state.displaySettings
	);

	return (
		<div id="editor-page">
			{displaySettings && <Settings />}
			{displayQuizMaker && <QuizMaker />}
			<Header />
			<div id="main-body">
				<LeftBar />
				<MainBar />
				<RightBar />
			</div>
		</div>
	);
};

export default Editor;
