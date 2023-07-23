import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { Global } from '../../../helpers/Global';
import { AiFillHome } from 'react-icons/ai';
import { BsPersonFill } from 'react-icons/bs';
import { HiOutlineLogout } from 'react-icons/hi';

export const Nav = () => {

    const { auth, loading } = useAuth();

    return (
        <nav className="navbar__container-lists">

            <ul className="container-lists__list-end">
                <li className="list-end__item">
                    <NavLink to={"/social/profile/" + auth._id} className="list-end__link-image">
                        {loading || !auth.image
                            ?
                            <div className='profile__container-avatar loading-color'></div>

                            :
                            <img src={Global.url + "user/avatar/" + auth.image} className="list-end__img" alt="profile picture" />
                        }
                    </NavLink>
                </li>
                <li className="list-end__item">
                    <NavLink to="/social/logout" className="list-end__link">
                        <HiOutlineLogout />
                        <span className="list-end__name">Log out</span>
                    </NavLink>
                </li>
            </ul>

            <ul className="container-lists__menu-list">
                <li className="menu-list__item">
                    <NavLink to="/social" className="menu-list__link">
                        <AiFillHome />
                        <span className="menu-list__title">Home</span>
                    </NavLink>
                </li>

                <li className="menu-list__item">
                    <NavLink to="/social/people" className="menu-list__link">
                        <BsPersonFill />
                        <span className="menu-list__title">Explore</span>
                    </NavLink>
                </li>
            </ul>

        </nav>
    )
}
