import React, { useEffect, useState } from 'react';
import { Global } from '../../helpers/Global';
import { useParams } from 'react-router-dom';
import { UserList } from '../user/UserList';

export const Following = () => {

    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [more, setMore] = useState(true);
    const [following, setFollowing] = useState();
    const [loading, setLoading] = useState(true);

    const params = useParams();

    useEffect(() => {
        getUsers(1);
    }, []);

    const getUsers = async (nextPage = 1) => {
        setLoading(true);

        const userId = params.userId;

        const request = await fetch(Global.url + "follow/following/" + userId + "/" + nextPage, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });

        const data = await request.json();

        if (data.follows && data.status == "success") {

            let newUsers = data.follows;

            if (users.length >= 1) {
                newUsers = [...users, ...data.follows]
            }

            setUsers(newUsers);
            setFollowing(data.user_following);
            setLoading(false);

            if (users.length >= (data.total - data.follows.length)) {
                setMore(false);
            }

        }
    }

    return (
        <>
            <header className="content__header">
                <h1 className="content__title">Usuarios que sigues NOMBRE</h1>
            </header>

            <UserList
                users={users}
                getUsers={getUsers}
                following={following}
                setFollowing={setFollowing}
                page={page}
                setPage={setPage}
                more={more}
                loading={loading}
            />

            <br />
        </>
    )
}
