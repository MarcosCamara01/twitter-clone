import React, { useEffect, useState } from 'react';
import { Global } from '../../helpers/Global';
import { useParams } from 'react-router-dom';
import { UserList } from '../user/UserList';
import { GetProfile } from '../../helpers/GetProfile';

export const Followers = () => {

    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [more, setMore] = useState(true);
    const [following, setFollowing] = useState();
    const [loading, setLoading] = useState(true);
    const [userProfile, setUserProfile] = useState({});

    const params = useParams();

    useEffect(() => {
        getUsers(1);
        GetProfile(params.userId, setUserProfile);
    }, []);

    const getUsers = async (nextPage = 1) => {
        setLoading(true);

        const userId = params.userId;

        const request = await fetch(Global.url + "follow/followers/" + userId + "/" + nextPage, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });

        const data = await request.json();

        let cleanUsers = [];

        data.follows.forEach(follow => {
            cleanUsers = [...cleanUsers, follow.user]
        });

        data.users = cleanUsers;

        if (data.users && data.status == "success") {

            let newUsers = data.users;

            if (users.length >= 1) {
                newUsers = [...users, ...data.users]
            }

            setUsers(newUsers);
            setFollowing(data.user_following);
            setLoading(false);

            if (users.length >= (data.total - data.users.length)) {
                setMore(false);
            }

        }
    }

    return (
        <>
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
