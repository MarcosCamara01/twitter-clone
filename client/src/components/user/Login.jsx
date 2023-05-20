import React, { useState } from 'react'
import { useForm } from '../../hooks/useForm'
import { Global } from '../../helpers/Global';
import { useAuth } from '../../hooks/useAuth';

export const Login = () => {

    const { form, changed } = useForm({});
    const [logged, setLogged] = useState("not_logged");
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

                    <strong className='alert alert-form'>{logged == "logged" ? "User successfully logged" : ""}</strong>
                    <strong className='alert alert-form'>{logged == "error" ? "The user has not logged" : ""}</strong>

                    <h3 className='login-register_h3'>Login</h3>

                    <div className='form-group'>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" onChange={changed} autoComplete='off' />
                    </div>

                    <div className='form-group'>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" onChange={changed} />
                    </div>

                    <input type="submit" value="Login" className='post__button--white' />

                    <div className="bx_user_registered">
                        <p>To avoid having to use an email and password, you can use this already registered user.</p>
                        <p> Email: user@gmail.com Password: user</p>
                    </div>

                </form>
            </div>
        </>
    )
}
