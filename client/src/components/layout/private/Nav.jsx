import React from 'react';
import avatar from "../../../assets/img/user.png";
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { Global } from '../../../helpers/Global';
import { Loader } from '../../../helpers/Loader';

export const Nav = () => {

    const { auth } = useAuth();

    return (
        <nav className="navbar__container-lists">

            <ul className="container-lists__list-end">
                <li className="list-end__item">
                    <NavLink to={"/social/profile/" + auth._id} className="list-end__link-image">
                        {auth.image ? <img src={Global.url + "user/avatar/" + auth.image} className="list-end__img" alt="profile picture" /> :
                            <Loader />}
                    </NavLink>
                </li>
                <li className="list-end__item">
                    <NavLink to="/social/logout" className="list-end__link">
                        <i className='fa-solid fa-arrow-right-from-bracket'></i>
                        <span className="list-end__name">Log out</span>
                    </NavLink>
                </li>
            </ul>

            <ul className="container-lists__menu-list">
                <li className="menu-list__item">
                    <NavLink to="/social" className="menu-list__link">
                        <i className="fa-solid fa-house"></i>
                        <span className="menu-list__title">Home</span>
                    </NavLink>
                </li>

                <li className="menu-list__item">
                    <NavLink to="/social/people" className="menu-list__link">
                        <i className="fa-solid fa-user"></i>
                        <span className="menu-list__title">Explore</span>
                    </NavLink>
                </li>
            </ul>

        </nav>
    )
}
