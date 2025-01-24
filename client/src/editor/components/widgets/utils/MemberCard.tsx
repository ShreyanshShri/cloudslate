import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import "../widgets.css";

type props = {
    name: string,
    avatar: any,
    index: number,
}

const MemberCard = ({name, avatar} : props) => {
  return (
    <div className="member-card">
        <div className="avatar">
            {avatar ? <img src={avatar} />
            :<FontAwesomeIcon icon={faUser} />}
        </div>
        <span>{name}</span>
    </div>
  )
}

export default MemberCard