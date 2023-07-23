import React from 'react';
import { Oval } from 'react-loader-spinner';

export const Loader = () => {
    return (
        <Oval
            height={30}
            width={30}
            color="#1D9BF0"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor="#061F30"
            strokeWidth={5}
            strokeWidthSecondary={5}

        />
    )
}
