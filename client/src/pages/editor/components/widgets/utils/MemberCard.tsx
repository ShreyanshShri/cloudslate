import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faTrash } from "@fortawesome/free-solid-svg-icons";

import { addRemoveContributor } from "../../../utils/apiCalls";

import "../widgets.css";

type props = {
	name: string;
	avatar: any;
	index: number;
};

const MemberCard = ({ name, avatar, index }: props) => {
	const { id } = useParams();

	return (
		<div className="member-card">
			<div className="avatar">
				{avatar ? <img src={avatar} /> : <FontAwesomeIcon icon={faUser} />}
			</div>
			<div className="member-card-details">
				<span className="member-card-name">
					{name} {index === 0 && "(admin)"}
				</span>
				{index !== 0 && (
					<FontAwesomeIcon
						icon={faTrash}
						className="member-card-delete"
						onClick={() => addRemoveContributor(id as string, name, "remove")}
					/>
				)}
			</div>
		</div>
	);
};

export default MemberCard;
