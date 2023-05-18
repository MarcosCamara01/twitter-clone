import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Global } from '../../helpers/Global';
import { useAuth } from '../../hooks/useAuth';
import { PublicationList } from '../publication/PublicationList';
import { GetProfile } from '../../helpers/GetProfile';
import Header from '../../helpers/Header';

export const Profile = () => {

    const { auth } = useAuth();
    const [user, setUser] = useState({});
    const [counters, setCounters] = useState({});
    const [iFollow, setIFollow] = useState(false);
    const [publications, setPublications] = useState([]);
    const [page, setPage] = useState(1);
    const [more, setMore] = useState(false);
    const [loading, setLoading] = useState(true);
    const params = useParams();

    useEffect(() => {
        getDataUser();
        getCounters();
        getPublications(1, true);
    }, []);

    useEffect(() => {
        getDataUser();
        getCounters();
        setMore(false);
        getPublications(1, true);
    }, [params])

    const getDataUser = async () => {
        setLoading(true);
        let dataUser = await GetProfile(params.userId, setUser);
        if (dataUser.following && dataUser.following._id) {
            setIFollow(true);
            setLoading(false);
        }
    }

    const getCounters = async () => {
        setLoading(true);
        const request = await fetch(Global.url + "user/counters/" + params.userId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });

        const data = await request.json();

        if (data.following) {
            setCounters(data);
        }

        setLoading(false);
    }

    const getPublications = async (page = 1, newProfile = true) => {
        setLoading(true);
        const request = await fetch(Global.url + "publication/user/" + params.userId + "/" + page, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });

        const data = await request.json();

        if (data.status == "success") {

            let newPublications = data.publications;
            if (!newProfile && publications.length >= 1) {
                newPublications = [...publications, ...data.publications];
            }

            if (newProfile) {
                newPublications = data.publications;
                setMore(true);
                setPage(1);
            }

            setPublications(newPublications);

            if (!newProfile && publications.length >= (data.total - data.publications.length)) {
                setMore(false);
            }

            if (data.pages <= 1) {
                setMore(false);
            }
            setLoading(false);
        } 
    }

    const follow = async (userId) => {
        const request = await fetch(Global.url + "follow/save", {
            method: "POST",
            body: JSON.stringify({ followed: userId }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });

        const data = await request.json();

        if (data.status == "success") {
            setIFollow(true);
        }
    }

    const unfollow = async (userId) => {
        const request = await fetch(Global.url + "follow/unfollow/" + userId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });

        const data = await request.json();

        if (data.status == "success") {
            setIFollow(false);
        }
    }

    return (
        <>
            <Header
                user={user}
                auth={auth}
                iFollow={iFollow}
                unfollow={unfollow}
                follow={follow}
                counters={counters}
                loading={loading}
            />

            <PublicationList
                publications={publications}
                getPublications={getPublications}
                page={page}
                setPage={setPage}
                more={more}
                setMore={setMore}
                loading={loading}
            />
        </>
    )
}
