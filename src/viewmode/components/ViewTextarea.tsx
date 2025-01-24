type props = {
	data: string;
	index: number;
};

const ViewTextarea = ({ data }: props) => {
	return <div className="view-textarea">{data}</div>;
};

export default ViewTextarea;
