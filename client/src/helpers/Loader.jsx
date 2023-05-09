import React from 'react';
import { TailSpin } from 'react-loader-spinner';

export const Loader = () => {
    return (
        <TailSpin
            height="50"
            width="50"
            color="#E7E9EA"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />
    )
}
