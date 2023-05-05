import React, { useEffect, useState } from 'react';
import { Global } from '../../helpers/Global';
import { PublicationList } from '../publication/PublicationList';
import { Post } from './Post';

export const Feed = () => {

    const [publications, setPublications] = useState([]);
    const [page, setPage] = useState(1);
    const [more, setMore] = useState(false);

    useEffect(() => {
        getPublications(1, false);
    }, []);

    const getPublications = async (page = 1, showNews = false) => {

        if (showNews) {
            setPublications([]);
            setPage(1);
            page = 1;
        }

        const request = await fetch(Global.url + "publication/feed/" + page, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });

        const data = await request.json();

        if (data.status == "success") {

            let newPublications = data.publications;
            if (!showNews && publications.length >= 1) {
                newPublications = [...publications, ...data.publications];
            }

            setPublications(newPublications);

            if (!showNews && publications.length >= (data.total - data.publications.length)) {
                setMore(false);
            }

            if (data.pages <= 1) {
                setMore(false);
            }
        }
    }

    return (
        <>
            <Post />
            <PublicationList
                publications={publications}
                getPublications={getPublications}
                page={page}
                setPage={setPage}
                more={more}
                setMore={setMore}
            />
            <br />
        </>
    )
}
