import React from 'react';
import { Global } from './Global';
import { Link, NavLink } from 'react-router-dom';
import { Loader } from './Loader';

const Header = ({ user, auth, iFollow, unfollow, follow, counters, loading }) => {

    const renderLink = (to, title, number) => (
        <div className="stats__following">
            <Link to={to} className="following__link">
                <span className="following__title">{title}</span>
                <span className="following__number">{number >= 1 ? number : 0}</span>
            </Link>
        </div>
    );

    const renderFollowButton = () => {
        if (user._id === auth._id) {
            return (
                <button className="post__button post__button--normal">
                    <NavLink to="/social/settings">Edit profile</NavLink>
                </button>
            );
        } else {
            return (
                <button onClick={() => (iFollow ? unfollow(user._id) : follow(user._id))} className={iFollow ? "post__button" : "post__button--white"}>
                    {iFollow ? <div></div> : "Follow"}
                </button>
            );
        }
    };

    return (
        <header className="aside__profile-info">

            <div className="profile-info__general-info">
                <div className="general-info__container-avatar">
                    {user.image ? (
                        <img src={Global.url + "user/avatar/" + user.image} className="profile__container-avatar" alt="profile picture" />
                    ) : (
                        <div><Loader /></div>
                    )}
                </div>
                <div className="general-info__container-names">
                    <div className="container-names__name">
                        <h1>{user.name} {user.surname}</h1>
                        {!loading && renderFollowButton()}
                    </div>
                    <h2 className="container-names__nickname">{" @" + user.nick}</h2>
                    <p>{user.bio}</p>
                </div>
            </div>

            <div className="profile-info__stats">
                {renderLink(`/social/following/${user._id}`, "Following", counters.following)}
                {renderLink(`/social/followers/${user._id}`, "Followers", counters.followed)}
                {renderLink(`/social/profile/${user._id}`, "Publications", counters.publications)}
            </div>
        </header>
    );
};

export default Header;
