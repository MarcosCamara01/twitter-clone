import React, { useState } from 'react'
import { useAuth } from '../../hooks/useAuth';
import { Global } from '../../helpers/Global';
import { useForm } from '../../hooks/useForm';
import { NavLink } from 'react-router-dom';
import { LuImage } from 'react-icons/lu';
import { RiCloseFill } from 'react-icons/ri';

export const Post = () => {

    const { auth, loading } = useAuth();
    const { form, changed } = useForm({});
    const [stored, setStored] = useState("not_stored");
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]);
    }

    const handleReset = () => {
        setSelectedImage(null);
        document.getElementById('file').value = null;
    };

    const savePublication = async (e) => {
        e.preventDefault();

        setSelectedImage(null);

        const token = localStorage.getItem("token")

        let newPublication = form;
        newPublication.user = auth._id;

        const request = await fetch(Global.url + "publication/save", {
            method: "POST",
            body: JSON.stringify(newPublication),
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        const data = await request.json();

        if (data.status == "success") {
            setStored("stored");
        } else {
            setStored("error");
        }

        const fileInput = document.getElementById('file');

        if (data.status == "success" && fileInput.files[0]) {
            const formData = new FormData();
            formData.append("file0", fileInput.files[0]);

            const uploadRequest = await fetch(Global.url + "publication/upload/" + data.publicationStored._id, {
                method: "POST",
                body: formData,
                headers: {
                    "Authorization": token
                }
            });

            const uploadData = await uploadRequest.json();
            if (uploadData.status == "success") {
                setStored("stored");
            } else {
                setStored("error");
            }
        }

        const myForm = document.querySelector("#publication-form");
        myForm.reset();
    }

    return (
        <div className="container-form">
            <div className='post__container'>
                <div className="post__image-user">
                    <NavLink to={"/social/profile/" + auth._id} className="post__image-link">
                        {loading || !auth.image
                            ?
                            <div className='profile__container-avatar loading-color'></div>
                            :
                            <img src={Global.url + "user/avatar/" + auth.image} className="post__user-image" alt="Profile photo" />
                        }
                    </NavLink>
                </div>

                <form id='publication-form' className="container-form__form-post" onSubmit={savePublication}>

                    <div className="form-">
                        <textarea name="text" className="form-post__textarea" onChange={changed} placeholder="What's happening?" />
                    </div>

                    {selectedImage && (
                        <div className='image__selected'>
                            <div className="button_delete" onClick={handleReset}>
                                <RiCloseFill />
                            </div>
                            <img src={URL.createObjectURL(selectedImage)} alt="Selected image" />
                        </div>
                    )}

                    <div className="form-post__inputs">
                        <div className="box__icon">
                            <label htmlFor="file" className="custom-file-upload">
                                <LuImage />
                            </label>
                            <input type="file" id="file" name="file0" accept="image/*" onChange={handleImageChange} />
                        </div>
                        <input
                            type="submit"
                            value="Tweet"
                            className="form-post__btn-submit"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}
