import React from 'react';
import { Global } from '../../../../client/src/helpers/Global';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../../client/src/hooks/useAuth';
import ReactTimeAgo from "react-time-ago";
import { Loader } from '../../../../client/src/helpers/Loader';

export const PublicationList = ({ publications, getPublications, page, setPage, more, setMore, loading }) => {

    const { auth } = useAuth();

    const nextPage = () => {
        if (more) {
            let nextPage = page + 1;
            setPage(nextPage);
            getPublications(nextPage, false);
        }
    };

    const deletePublication = async (publicationId) => {
        const request = await fetch(Global.url + "publication/remove/" + publicationId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });

        const data = await request.json();
        console.log(data)
        if (data.status === "success") {
            getPublications(1, true);
            setPage(1);
            setMore(true);
        }
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
                                        {loading || !publication.user.image
                                            ?
                                            <div className='profile__container-avatar loading-color'></div>

                                            :
                                            <img src={Global.url + "user/avatar/" + publication.user.image} className="post__user-image" alt="Foto de perfil" />
                                        }
                                    </Link>
                                </div>

                                <div className="post__body">

                                    <div className="post__user-info">
                                        <div>
                                            <Link to={"/social/profile/" + publication.user._id} className="user-info__name">{publication.user.name + " " + publication.user.surname}</Link>
                                            <Link to={"/social/profile/" + publication.user._id} className="user-info__create-date">{" @" + publication.user.nick}</Link>
                                            <span className="user-info__divider"> · </span>
                                            <Link to={"/social/profile/" + publication.user._id} className="user-info__create-date"><ReactTimeAgo date={new Date(publication.created_at).getTime()} locale='en-US' timeStyle="twitter" /></Link>
                                            <p className="post__content">{publication.text}</p>
                                        </div>
                                        {auth._id == publication.user._id &&
                                            <div className="post__buttons">

                                                <button onClick={() => deletePublication(publication._id)} className="post__button button__delete">
                                                    <i className="fa-solid fa-trash-can"></i>
                                                </button>

                                            </div>
                                        }
                                    </div>

                                    {publication.file && <div className='post__img'><img src={Global.url + "publication/media/" + publication.file} /></div>}

                                </div>

                            </div>
                        </article>
                    );
                })}
            </div>

            {
                more && !loading &&
                <div className="content__container-btn">
                    <button className="post__button post__button--normal" onClick={nextPage}>
                        Show more
                    </button>
                </div>
            }

            {loading &&
                <div className="loader__bx loader__bx--post"><Loader /></div>
            }
        </>
    )
}
