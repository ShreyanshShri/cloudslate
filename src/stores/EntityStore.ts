import { create } from 'zustand';

type entityStore = {
    entities: Array<object>,
    pushTextEditor: (text: string) => void,
    pushPlotter: () => void,
    setTextareaText: (index: number, text: string) => void,
    setPlotterData: (index: number, data: string) => void
};


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
    set((state: any) => ({ entities: [...state.entities, {type: "plotter"}] }));
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

// const getPlotterData = (index: number) => {
//     return useEntityStore.getState().entities[index]?.data;
// }


const useEntityStore = create<entityStore>((set) => ({
    entities: [{type: "plotter", data: '{"version":10,"randomSeed":"5f6f6b15c94f6a1a476ff378d290963a","graph":{"viewport":{"xmin":-10,"ymin":-6.565100329343441,"xmax":10,"ymax":6.565100329343441}},"expressions":{"list":[{"type":"expression","id":"2","color":"#388c46","latex":"x^{2}"}]}}'}],
    pushTextEditor: (text : string) => pushTextEditor(set, text),
    pushPlotter: () => pushPlotter(set),
    setTextareaText: (index: number, text: string) => setTextareaText(set, index, text),
    setPlotterData: (index: number, data: string) => setPlotterData(set, index, data),
}))

export default useEntityStore;