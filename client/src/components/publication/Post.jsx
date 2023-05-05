import React, { useState } from 'react'
import { useAuth } from '../../hooks/useAuth';
import { Global } from '../../helpers/Global';
import { useForm } from '../../hooks/useForm';
import { NavLink } from 'react-router-dom';

export const Post = () => {

    const { auth } = useAuth();
    const { form, changed } = useForm({});
    const [stored, setStored] = useState("not_stored");
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]);
    }

    const handleResetImage = () => {
        setSelectedImage(null);
    }

    const savePublication = async (e) => {
        e.preventDefault();

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

        const fileInput = document.querySelector("#file");

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
                        {auth.image != "default.png" ? <img src={Global.url + "user/avatar/" + auth.image} className="post__user-image" alt="Foto de perfil" /> :
                            <img src={avatar} className="post__user-image" alt="Foto de perfil" />}
                    </NavLink>
                </div>

                <form id='publication-form' className="container-form__form-post" onSubmit={savePublication}>

                    <div className="form-post__textarea">
                        <textarea name="text" className="form-post__textarea" onChange={changed} placeholder="¿Qué está pasando?" />
                    </div>

                    <div className='image__selected'>
                        {selectedImage && (
                            <img src={URL.createObjectURL(selectedImage)} alt="Imagen seleccionada" />
                        )}
                    </div>

                    <div className="form-post__inputs">
                        <input type="file" name="file0" id='file' className="form-post__image" accept="image/*" onChange={handleImageChange} />
                        <input type="submit" value="Twittear" className="form-post__btn-submit" onClick={handleResetImage} />
                    </div>
                </form>
            </div>
        </div>
    )
}
