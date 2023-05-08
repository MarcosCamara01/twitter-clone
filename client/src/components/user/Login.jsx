import React, { useState } from 'react'
import { useForm } from '../../hooks/useForm'
import { Global } from '../../helpers/Global';
import { useAuth } from '../../hooks/useAuth';

export const Login = () => {

    const { form, changed } = useForm({});
    const [saved, setLogged] = useState("not_logged");
    const { setAuth } = useAuth();

    const loginUser = async (e) => {
        e.preventDefault();

        const user = form;

        const request = await fetch(Global.url + "user/login", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await request.json();

        if (data.status == "success") {

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            setLogged("logged");

            setAuth(data.user);

            window.location.reload();
        } else {
            setLogged("error")
        }
    }

    return (
        <>
            <div className="content__form">

                <form className='config-form' onSubmit={loginUser}>

                    <h3 className='login-register_h3'>Login</h3>

                    <strong className='alert alert-success'>{saved == "logged" ? "User successfully logged" : ""}</strong>
                    <strong className='alert alert-error'>{saved == "error" ? "The user has not logged" : ""}</strong>

                    <div className='form-group'>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" onChange={changed} autoComplete='off' />
                    </div>

                    <div className='form-group'>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" onChange={changed} />
                    </div>

                    <input type="submit" value="Login" className='post__button--white' />

                </form>
            </div>
        </>
    )
}
