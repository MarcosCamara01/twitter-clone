import React from 'react';
import avatar from "../assets/img/user.png";
import { Global } from './Global';
import { Link, NavLink } from 'react-router-dom';

const Header = ({ user, auth, iFollow, unfollow, follow, counters, loading }) => {
    return (
        <header className="aside__profile-info">

            <div className="profile-info__general-info">
                <div className="general-info__container-avatar">
                    {
                        !loading &&
                            (user.image === "default.png"
                            ?
                            <img src={avatar} className='profile__container-avatar' alt='profile picture' />
                            :
                            <img src={Global.url + "user/avatar/" + user.image} className="profile__container-avatar" alt="profile picture" />)
                    }
                </div>
                <div className="general-info__container-names">
                    <div className="container-names__name">
                        <h1>{user.name} {user.surname}</h1>
                        {
                            !loading &&
                               (user._id != auth._id ?
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
                                </>)
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
    );
};

export default Header;
