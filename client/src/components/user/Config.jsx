import React, { useState } from 'react'
import { useAuth } from '../../hooks/useAuth';
import { Global } from '../../helpers/Global';
import avatar from "../../assets/img/user.png";
import { SerializeForm } from '../../helpers/SerializaForm';

export const Config = () => {

  const { auth, setAuth } = useAuth();

  const [saved, setSaved] = useState("not_saved");

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
      console.log(auth);
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
      <header className="content__header content__header--public">
        <h1 className="content__title">Settings</h1>
      </header>
      <div className="content__posts">
        <strong className='alert alert-success'>{saved == "saved" ? "User successfully updated" : ""}</strong>
        <strong className='alert alert-error'>{saved == "error" ? "The user has not updated correctly" : ""}</strong>

        <form className='config-form' onSubmit={updateUser}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" name='name' defaultValue={auth.name} />
          </div>

          <div className="form-group">
            <label htmlFor="surname">Surname</label>
            <input type="text" name='surname' defaultValue={auth.surname} />
          </div>

          <div className="form-group">
            <label htmlFor="nick">Nickname</label>
            <input type="text" name='nick' defaultValue={auth.nick} />
          </div>

          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea name='bio' defaultValue={auth.bio} />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" name='email' defaultValue={auth.email} />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name='password' />
          </div>

          <div className="form-group">
            <label htmlFor="file0">Avatar</label>
            <div className="general-info__container-avatar">
              {auth.image != "default.png" ? <img src={Global.url + "user/avatar/" + auth.image} className="container-avatar__img" alt="Foto de perfil" /> :
                <img src={avatar} className="container-avatar__img" alt="Foto de perfil" />}
            </div>
            <br />
            <input type="file" name='file0' id='file' />
          </div>
          <br />

          <input type="submit" value="Update" className='btn btn-success' />

        </form>
      </div>
    </>
  )
}
