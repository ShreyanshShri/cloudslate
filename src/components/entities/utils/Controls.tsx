import useEntityStore from "../../../stores/EntityStore"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown, faXmark } from '@fortawesome/free-solid-svg-icons';

import "../entities.css";

type props = {
    index: number,
}

const Controls = ({index}: props) => {
    const deleteEntity = useEntityStore((state: any) => state.deleteEntity);
    const moveEntity = useEntityStore((state: any) => state.moveEntity);
  return (
    <div>
        <span className="control-btns" onClick={() => deleteEntity(index)}><FontAwesomeIcon icon={ faXmark } /></span>
        <span className="control-btns" onClick={() => moveEntity(index, "up")}><FontAwesomeIcon icon={ faAngleUp } /></span>
        <span className="control-btns" onClick={() => moveEntity(index, "down")}><FontAwesomeIcon icon={ faAngleDown } /></span>
    </div>
  )
}

export default Controls