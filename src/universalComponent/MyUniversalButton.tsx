import React, {ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type UniversalButtonPropsType = DefaultButtonPropsType & {
    title:string
    callback: () => void
}

export const MyUniversalButton = (props: UniversalButtonPropsType) => {

    return (
        <button className={props.className} onClick={props.callback}>{props.title}</button>
    );
};