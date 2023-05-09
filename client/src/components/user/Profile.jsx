import React, { useEffect, useState } from 'react';
import avatar from "../../assets/img/user.png";
import { NavLink, useParams } from "react-router-dom";
import { Global } from '../../helpers/Global';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { PublicationList } from '../publication/PublicationList';
import { GetProfile } from '../../helpers/getProfile';

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

    const getPublications = async (page = 1, newProfile = false) => {
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

    return (
        <>
            <header className="aside__profile-info">

                <div className="profile-info__general-info">
                    <div className="general-info__container-avatar">
                        <img src={user.image === "default.png" ? avatar : Global.url + "user/avatar/" + user.image} className="profile__container-avatar" alt="Foto de perfil" />
                    </div>

                    <div className="general-info__container-names">
                        <div className="container-names__name">
                            <h1>{user.name} {user.surname}</h1>
                            {user._id != auth._id ?
                                (iFollow ?
                                    <button onClick={() => unfollow(user._id)} className="post__button"><div></div></button>
                                    :
                                    <button onClick={() => follow(user._id)} className="post__button--white">Follow</button>
                                )
                                :
                                <>
                                    <button className="post__button post__button--normal">
                                        <NavLink to="/social/settings">Edit profile</NavLink>
                                    </button>
                                </>
                            }
                        </div>
                        <h2 className="container-names__nickname">{" @" + user.nick}</h2>
                        <p>{user.bio}</p>
                    </div>
                </div>

                <div className="profile-info__stats">

                    <div className="stats__following">
                        <Link to={"/social/following/" + user._id} className="following__link">
                            <span className="following__title">Following</span>
                            <span className="following__number">{counters.following >= 1 ? counters.following : 0}</span>
                        </Link>
                    </div>
                    <div className="stats__following">
                        <Link to={"/social/followers/" + user._id} className="following__link">
                            <span className="following__title">Followers</span>
                            <span className="following__number">{counters.followed >= 1 ? counters.followed : 0}</span>
                        </Link>
                    </div>


                    <div className="stats__following">
                        <Link to={"/social/profile/" + user._id} className="following__link">
                            <span className="following__title">Publications</span>
                            <span className="following__number">{counters.publications >= 1 ? counters.publications : 0}</span>
                        </Link>
                    </div>


                </div>
            </header>

            <PublicationList
                publications={publications}
                getPublications={getPublications}
                page={page}
                setPage={setPage}
                more={more}
                setMore={setMore}
                loading={loading}
            />
            <br />
        </>
    )
}
