import React, { useState } from 'react'
import { useForm } from '../../hooks/useForm'
import { Global } from '../../helpers/Global';

export const Register = () => {

    const { form, changed } = useForm({});
    const [saved, setSaved] = useState("not_sended");

    const saveUser = async (e) => {
        e.preventDefault();

        let newUser = form;

        const request = await fetch(Global.url + "user/register", {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await request.json();

        if (data.status == "success") {
            setSaved("saved");
        } else {
            setSaved("error")
        }

    }

    return (
        <>
            <div className="content__form">

                <form className='config-form' onSubmit={saveUser}>

                    <h3 className='login-register_h3'>Register</h3>

                    <strong className='alert alert-success'>{saved == "saved" ? "User successfully registered" : ""}</strong>
                    <strong className='alert alert-error'>{saved == "error" ? "The user has not registered" : ""}</strong>

                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" name='name' onChange={changed} autoComplete='no' />
                    </div>

                    <div className="form-group">
                        <label htmlFor="surname">Surname</label>
                        <input type="text" name='surname' onChange={changed} autoComplete='no' />
                    </div>

                    <div className="form-group">
                        <label htmlFor="nick">Nickname</label>
                        <input type="text" name='nick' onChange={changed} autoComplete='off' />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name='email' onChange={changed} autoComplete='off' />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name='password' onChange={changed} />
                    </div>

                    <input type="submit" value="Register" className='post__button--white' />
                </form>
            </div>
        </>
    )
}
