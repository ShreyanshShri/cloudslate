declare global {
    interface Window {
        store:any;
    }
}

type user_data = {
    username: string,
    email: string,
    password: string,
    files: [file_data] | [string],
}

type entity_data = {
    type: string,
    data: string
}

type file_data = {
    admin: user_data | string,
    contributers: [user_data] | [string],
    createdAt: Date,
    public: boolean,
    title: string,
    entities: [entity_data] | [string]
}

type quiz_data = {
    question: string,
    optionsList: Array<object>,
    correctAnsIndex: number
}

export type { user_data, file_data, entity_data, quiz_data };