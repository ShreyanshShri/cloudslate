import { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

import useAlertStore from '../stores/AlertStore';

import Loader from '../common/Loader';

const ProfilePage = () => {

    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const setAlert = useAlertStore((state: any) => state.setAlert);

    useEffect(() => {
        getUser();
    }, [])

    const getUser = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/auth/get`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            setUser(response.data.user);
            setLoading(() => false);
            console.log(response.data);
        } catch (err: any) {
            console.error(err.response.data);
            setAlert(err.response.data.message);
        }
    }

  return (
    <div className='profile-page'>
        {
            loading === true ? <Loader /> :
            <div>
                <h1>{user.username}</h1>
                <p>{user.email}</p>
                <Link to="/editor/new"><button className='btn-dark'>New File</button></Link>
                {user.files.map((file: any, index: number) => (
                    <div className='file-box' key={index}>
                        <Link to={`/editor/${file._id}`}>{file.title}</Link>
                    </div>
                ))}
            </div>
        }
    </div>
  )
}

export default ProfilePage