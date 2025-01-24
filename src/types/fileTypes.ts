declare global {
	interface Window {
		store: any;
	}
}

type user_type = {
	_id?: any;
	username: string;
	email: string;
	password: string;
	files: [file_type] | [string];
};

type entity_type = {
	_id?: any;
	type: string;
	data: string;
};

type file_type = {
	_id?: any;
	admin: user_type | string;
	contributers: [user_type] | [string];
	createdAt: Date;
	public: boolean;
	title: string;
	entities: [entity_type] | [string];
};

type option_type = {
	text: string;
	isCorrect: boolean;
};

type quiz_type = {
	question: string;
	optionsList: [option_type];
	correctAnsIndex: number;
};

export type { user_type, file_type, entity_type, quiz_type, option_type };
