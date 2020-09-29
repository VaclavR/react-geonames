import React from 'react'
import { Input } from '../../interfaces'

const Input = (props: Input): JSX.Element => {
    return (
        <input
            {...props.inputAttributes}
            onChange={props.onChangeHandler}
        />
    )
}

export default Input
