import React from 'react';
import avatar from "../../assets/img/user.png";
import { Global } from '../../helpers/Global';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import ReactTimeAgo from "react-time-ago";

export const PublicationList = ({ publications, getPublications, page, setPage, more, setMore }) => {

    const { auth } = useAuth();

    const nextPage = () => {
        let next = page + 1;
        setPage(next);
        getPublications(next);
    }

    const deletePublication = async (publicationId) => {
        const request = await fetch(Global.url + "publication/remove/" + publicationId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });

        const data = await request.json();
        getPublications(1, true);
        setPage(1);
        setMore(true);
    }

    return (
        <>
            <div className="content__posts">
                {publications.map(publication => {
                    return (
                        <article className="posts__post" key={publication._id}>

                            <div className="post__container">

                                <div className="post__image-user">
                                    <Link to={"/social/profile/" + publication.user._id} className="post__image-link">
                                        {publication.user.image != "default.png" ? <img src={Global.url + "user/avatar/" + publication.user.image} className="post__user-image" alt="Foto de perfil" /> :
                                            <img src={avatar} className="post__user-image" alt="Foto de perfil" />}
                                    </Link>
                                </div>

                                <div className="post__body">

                                    <div className="post__user-info">
                                        <Link to={"/social/profile/" + publication.user._id} className="user-info__name">{publication.user.name + " " + publication.user.surname}</Link>
                                        <Link to={"/social/profile/" + publication.user._id} className="user-info__create-date">{" @" + publication.user.nick}</Link>
                                        <span className="user-info__divider"> · </span>
                                        <Link to={"/social/profile/" + publication.user._id} className="user-info__create-date"><ReactTimeAgo date={new Date(publication.created_at).getTime()} locale='es-ES' timeStyle="twitter" /></Link>
                                    </div>

                                    <p className="post__content">{publication.text}</p>

                                    {publication.file && <div className='post__img'><img src={Global.url + "publication/media/" + publication.file} /></div>}

                                </div>

                            </div>

                            {auth._id == publication.user._id &&
                                <div className="post__buttons">

                                    <button onClick={() => deletePublication(publication._id)} className="post__button">
                                        <i className="fa-solid fa-trash-can"></i>
                                    </button>

                                </div>
                            }

                        </article>
                    );
                })}
            </div>

            {
                more &&
                <div className="content__container-btn">
                    <button className="content__btn-more-post" onClick={nextPage}>
                        Ver mas publicaciones
                    </button>
                </div>
            }
        </>
    )
}
