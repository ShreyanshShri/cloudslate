import useFileStore from "../../../../stores/FileStore";

const setPlotterData = useFileStore.getState().setPlotterData;

const saveState = (plotterRef: any, index: number) => {
	const state = plotterRef.current.getState();
	setPlotterData(index, JSON.stringify(state));
};

const takeScreenShot = (plotterRef: any) => {
	plotterRef.current.asyncScreenshot((data: any) => {
		var a = document.createElement("a");
		a.href = data;
		a.download = "Image.png";
		a.click();
		a.remove();
	});
};

export { saveState, takeScreenShot };
