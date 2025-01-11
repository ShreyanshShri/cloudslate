import { create } from 'zustand';
import zukeeper from "zukeeper";

declare global {
    interface Window {
        store:any;
    }
}

type quiz_data = {
    question: string,
    optionsList: Array<object>,
    correctAnsIndex: number
}

type entityStore = {
    entities: Array<object>,
    displayQuizMaker: boolean,
    deleteEntity: (index: number) => void,
    moveEntity: (index: number, dirn: string) => void,
    setDisplayQuizMaker: (curr_state: boolean) => void,
    pushTextEditor: (text: string) => void,
    pushPlotter: () => void,
    pushQuiz: (data: quiz_data) => void,
    pushWhiteboard: (snapshot: any) => void,
    setTextareaText: (index: number, text: string) => void,
    setPlotterData: (index: number, data: string) => void,
    saveWhiteboard: (index: number, snapshot: any) => void,
};

const deleteEntity = (set: any, index: number) => {
    set((state: any) => {
        let temp = state.entities;
        if(temp.length === 0) return temp;
        if(index > temp.length-1) return temp;
        temp.splice(index, 1);
        return {entities: [...temp]};
    });
}

const moveEntity = (set: any, index: number, dirn: string) => {
    set((state: any) => {
        let temp = state.entities;
        if(dirn === 'up') {
            if(temp[index - 1] == undefined) { return temp; }
            const t = temp[index];
            temp[index] = temp[index - 1];
            temp[index - 1] = t;
        }
        if(dirn === "down") {
            if(temp[index + 1] == undefined) { return temp; }
            const t = temp[index];
            temp[index] = temp[index + 1];
            temp[index + 1] = t;
        }
        return {entities: [...temp]};
    });
}

// textarea logic
const pushTextEditor = (set : any, text: string) => {
    set((state: any) => ({ entities: [...state.entities, {type: "textarea", text}] }));
}

/*
    {
        type: "textarea",
        text: string
    }
*/
const setTextareaText = (set: any, index: number, text: string) => {
    set((state: any) => {
        let updatedList = state.entities;
        updatedList[index].text = text;
        return updatedList;
    });
}

// plotter logic
const pushPlotter = (set: any) => {
    set((state: any) => ({ entities: [...state.entities, {type: "plotter", data: ""}] }));
}

/* 
    {
        type: "plotter",
        data: "JSON.stringify(state)"
    }
*/
const setPlotterData = (set: any, index: number, data: string) => {
    set((state: any) => {
        let updatedList = state.entities;
        updatedList[index].data = data;
        return updatedList;
    });
}


// QUIZ logic
const setDisplayQuizMaker = (set: any, display_state: boolean) => {
    set(() => ({displayQuizMaker: display_state}));
}

/*
    question: string,
    optionsList: [{
                    text: string,
                    isCorrect: boolean
                }],
    correctAnsIndex: number
*/
const pushQuiz = (set: any, data: quiz_data) => {
    set((state: any) => ({entities: [...state.entities, {type: "quiz", data}]}));
}


// whiteboard logic
const pushWhiteboard = (set: any, snapshot: any) => {
    set((state: any) => ({entities: [...state.entities, {type: "whiteboard", snapshot}]}));
}

const saveWhiteboard = (set: any, index: number, snapshot: any) => {
    set((state: any) => {
        let temp = state.entities;
        temp[index] = {type: "whiteboard", snapshot};
        return ({entities: [...temp]});
    });
}



const useEntityStore = create<entityStore>(zukeeper((set: any) => ({
    // entities: [
    //     {type: "plotter", data: "{\"version\": 10, \"randomSeed\": \"2969dce9ac156f03d4f8c3e71ff92cfb\", \"graph\": {\"viewport\": {\"xmin\": -10, \"ymin\": -6.150683604526957, \"xmax\": 10, \"ymax\": 6.150683604526957}}, \"expressions\": {\"list\": []}}"},
    //     {type: "textarea", text: "Hello This is Shreyansh"},
    //     {type: "quiz", data: { question: "What is value of PI?", optionsList:[{ text: "2.71", isCorrect: false },{ text: "3.14", isCorrect: true },{ text: "1.41", isCorrect: false },{ text: "1.67", isCorrect: false },], correctAnsIndex: 1 }}
    // ],
    entities: [{type: "textarea", text: "Welcome to cloudslate...."},],
    displayQuizMaker: false,
    deleteEntity: (index: number) => deleteEntity(set, index),
    moveEntity: (index: number, dirn: string) => moveEntity(set, index, dirn),
    setDisplayQuizMaker: (curr_state: boolean) => setDisplayQuizMaker(set, curr_state),
    pushTextEditor: (text : string) => pushTextEditor(set, text),
    pushPlotter: () => pushPlotter(set),
    pushQuiz: (data: quiz_data) => pushQuiz(set, data),
    pushWhiteboard: (snapshot: any) => pushWhiteboard(set, snapshot),
    setTextareaText: (index: number, text: string) => setTextareaText(set, index, text),
    setPlotterData: (index: number, data: string) => setPlotterData(set, index, data),
    saveWhiteboard: (index: number, snapshot: any) => saveWhiteboard(set, index, snapshot),
})));

window.store = useEntityStore;

export default useEntityStore;