import React, { useState } from 'react'
import { useAuth } from '../../hooks/useAuth';
import { Global } from '../../helpers/Global';
import { useForm } from '../../hooks/useForm';

export const Post = () => {

    const { auth } = useAuth();
    const { form, changed } = useForm({});
    const [stored, setStored] = useState("not_stored");
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]);
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

            <strong className='alert alert-success'>{stored == "stored" ? "Correctly published" : ""}</strong>
            <strong className='alert alert-error'>{stored == "error" ? "Could not be published" : ""}</strong>

            <form id='publication-form' className="container-form__form-post" onSubmit={savePublication}>

                <div className="form-post__inputs">
                    <label htmlFor="text" className="form-post__label">¿Que estas pesando hoy?</label>
                    <textarea name="text" className="form-post__textarea" onChange={changed} />
                </div>

                <div className="form-post__inputs">
                    <label htmlFor="file" className="form-post__label">Sube tu foto</label>
                    <input type="file" name="file0" id='file' className="form-post__image" accept="image/*" onChange={handleImageChange} />
                    {selectedImage && (
                        <img src={URL.createObjectURL(selectedImage)} alt="Imagen seleccionada" />
                    )}
                </div>

                <input type="submit" value="Enviar" className="form-post__btn-submit" />

            </form>

        </div>
    )
}
