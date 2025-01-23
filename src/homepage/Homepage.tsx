import { Link } from "react-router-dom";

const Homepage = () => {
    return (
      <div>
        Home <br />
        <Link to="/auth/profile">Profile</Link><br />
        <Link to="/auth/login">Login</Link>
      </div>
    )
}

export default Homepage;