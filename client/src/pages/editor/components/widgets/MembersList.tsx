import { useState } from "react";
import { useParams } from "react-router-dom";

import MemberCard from "./utils/MemberCard";

import { addRemoveContributor } from "../../utils/apiCalls";
import "./widgets.css";

import useFileStore, { fileStoreType } from "../../../../stores/FileStore";
import { user_type } from "../../../../types/fileTypes";

const MembersList = () => {
	const file = useFileStore((state: fileStoreType) => state.file);
	const { id } = useParams();
	const [val, setVal] = useState<string>("");

	const handleKeyDown = (e: any) => {
		if (e.keyCode == 13) {
			addRemoveContributor(id as string, val, "add");
		}
		setVal("");
	};

	const addContributor = () => {
		addRemoveContributor(id as string, val, "add");
		setVal("");
	};

	return (
		<div>
			<div id="input-wrapper">
				<input
					type="text"
					name="contributor-input"
					placeholder="Enter username"
					id="contributor-input"
					value={val}
					onChange={(e) => setVal(e.target.value)}
					onKeyDown={handleKeyDown}
				/>
				<button className="action-btn btn-darker" onClick={addContributor}>
					Add
				</button>
			</div>
			<MemberCard
				name={(file?.admin as user_type).username}
				avatar={null}
				index={0}
			/>
			{(file.contributors as user_type[]).map(
				(contributor: user_type, index: number) => (
					<MemberCard
						key={index + 1}
						name={contributor.username}
						avatar={null}
						index={index + 1}
					/>
				)
			)}
		</div>
	);
};

export default MembersList;
