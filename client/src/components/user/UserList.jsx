import React from 'react';
import avatar from "../../assets/img/user.png";
import { Global } from '../../helpers/Global';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

export const UserList = ({ users, getUsers, following, setFollowing, page, setPage, more, loading }) => {

    const { auth } = useAuth();

    const nextPage = () => {
        let next = page + 1;
        setPage(next);
        getUsers(next);
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
            setFollowing([...following, userId])
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
            let filterFollowings = following.filter(followingUserId => userId !== followingUserId);
            setFollowing(filterFollowings);
        }
    }

    return (
        <>
            <div className="content__posts">

                {users.map(user => {
                    return (
                        <article className="posts__post post__people" key={user._id}>

                            <div className="post__container">

                                <div className="post__image-user">
                                    <Link to={"/social/profile/" + user._id} className="post__image-link">
                                        {user.image != "default.png" ? <img src={Global.url + "user/avatar/" + user.image} className="post__user-image" alt="Foto de perfil" /> :
                                            <img src={avatar} className="post__user-image" alt="Foto de perfil" />}
                                    </Link>
                                </div>

                                <div className="post__body">

                                    <div className="post__user-info">
                                        <Link to={"/social/profile/" + user._id} className="user-info__name">{user.name} {user.surname}</Link>
                                        <Link to={"/social/profile/" + user._id} className="user-info__create-date">{" @" + user.nick}</Link>
                                    </div>

                                    <h4 className="post__content">{user.bio}</h4>

                                </div>

                            </div>

                            {user._id != auth._id &&
                                <div className="post__buttons">
                                    {!following.includes(user._id) &&
                                        <button className="post__button--white"
                                            onClick={() => { follow(user._id) }}
                                        >
                                            Follow
                                        </button>
                                    }
                                    {following.includes(user._id) &&
                                        <button className="post__button"
                                            onClick={() => { unfollow(user._id) }}
                                        >
                                            <div></div>
                                        </button>
                                    }
                                </div>
                            }

                        </article>
                    );
                })}
            </div>

            {more && !loading &&
                <div className="content__container-btn">
                    <button className="content__btn-more-post" onClick={nextPage}>
                        Sow more people
                    </button>
                </div>
            }

            {loading &&
                <div className="loader-container">
                    <BeatLoader color="#123abc" loading={loading} size={15} />
                </div>
            }
            
        </>
    )
}
