import React from 'react'
import { Select } from '../../interfaces'

const Select = (props: Select): JSX.Element => {
    const options: JSX.Element[] = props.options.map((option) => <option key={option.value + Math.random()} value={option.value}>{option.name}</option>)
    return (
        <select
            value={props.value}
            {...props.inputAttributes}
            onChange={props.onChangeHandler}
        >{options}</select>
    )
}

export default Select
