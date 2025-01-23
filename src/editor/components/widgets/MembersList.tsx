import useFileStore from "../../../stores/FileStore"

import MemberCard from "./utils/MemberCard"


const MembersList = () => {
  
  const file = useFileStore((state: any) => state.file)

  return (
    <div>
      <MemberCard name={file?.admin.username} avatar={null} index={0} />
    </div>
  )
}

export default MembersList