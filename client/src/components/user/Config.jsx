import React, { useState } from 'react'
import { useAuth } from '../../hooks/useAuth';
import { Global } from '../../helpers/Global';
import avatar from "../../assets/img/user.png";
import { SerializeForm } from '../../helpers/SerializaForm';

export const Config = () => {

  const { auth, setAuth } = useAuth();

  const [saved, setSaved] = useState("not_saved");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  const updateUser = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    let newDataUser = SerializeForm(e.target);

    delete newDataUser.file0;

    const request = await fetch(Global.url + "user/update", {
      method: "PUT",
      body: JSON.stringify(newDataUser),
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    });

    const data = await request.json();

    if (data.status == "success" && data.user) {
      delete data.user.password;
      setAuth(data.user);
      setSaved("saved");
    } else {
      setSaved("error");
    }

    const fileInput = document.querySelector("#file");

    if (data.status == "success" && fileInput.files[0]) {

      const formData = new FormData();
      formData.append("file0", fileInput.files[0]);

      const uploadRequest = await fetch(Global.url + "user/upload", {
        method: "POST",
        body: formData,
        headers: {
          "Authorization": token
        }
      });

      const uploadData = await uploadRequest.json();

      if (uploadData.status == "success" && uploadData.user) {

        delete uploadData.password;
        setAuth(uploadData.user);
        setSaved("saved");

      } else {
        setSaved("error");
      }
    }
  }

  return (
    <>
      <div className="content__form">
        <form className='config-form' onSubmit={updateUser}>

          <div className="form-file">
            <label htmlFor="file">
              <i className="fa-regular fa-image"></i>
            </label>
            <div className="container-avatar">
              {selectedImage ? (
                <img src={selectedImage} className="container-avatar__img" alt="Foto de perfil" />
              ) : (
                auth.image !== "default.png" ? (
                  <img src={Global.url + "user/avatar/" + auth.image} className="container-avatar__img" alt="Foto de perfil" />
                ) : (
                  <img src={avatar} className="container-avatar__img" alt="Foto de perfil" />
                )
              )}
            </div>
            <input type="file" name="file" id="file" onChange={handleFileChange} />
          </div>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" name='name' id='name' defaultValue={auth.name} />
          </div>

          <div className="form-group">
            <label htmlFor="surname">Surname</label>
            <input type="text" name='surname' id='surname' defaultValue={auth.surname} />
          </div>

          <div className="form-group">
            <label htmlFor="nick">Nickname</label>
            <input type="text" name='nick' id='nick' defaultValue={auth.nick} />
          </div>

          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea name='bio' id='bio' defaultValue={auth.bio} />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" name='email' id='email' defaultValue={auth.email} />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name='password' id='password' />
          </div>

          <input type="submit" value="Update" className='post__button--white' />

        </form>
      </div>
    </>
  )
}
