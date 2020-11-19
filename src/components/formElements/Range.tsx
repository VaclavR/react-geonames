import React from 'react'
import { Range } from '../../interfaces'
import styles from '../Filters.css'
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'

const Range = (props: Range): JSX.Element => {
    return (
        <div className={styles.range}>
            {/* <div className={styles.range}>
                <div>
                    <input
                        {...props.inputAttributes}
                        name="min"
                        value={props.minVal}
                        onChange={props.onChangeHandler}
                    />
                    <span title={props.minTitle}>{props.minShortTitle} {props.minVal}</span>
                </div>
                <div>
                    <input
                        {...props.inputAttributes}
                        name="max"
                        value={props.maxVal}
                        onChange={props.onChangeHandler}
                    />
                    <span title={props.maxTitle}>{props.maxShortTitle} {props.maxVal}</span>
                </div>
            </div> */}
            <Typography id="range-slider" gutterBottom>
                Population Range
            </Typography>
            <Slider
                max={props.sliderValue[1]}
                marks={[
                    { value: 1, label: '10mil' },
                    { value: 2, label: '20mil' },
                    { value: 3, label: '30mil' },
                    { value: 4, label: '40mil' },
                    { value: 5, label: '50mil' },
                    { value: 6, label: '60mil' },
                    { value: 7, label: '70mil' },
                    { value: 8, label: '100mil' },
                    { value: 9, label: '200mil' },
                    { value: 10, label: 'all' },

                ]}
                value={props.sliderValue}
                onChange={props.onChangeHandler}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={(value, index = 2) => value.toString() + ' - ' + index.toString()}
            />
        </div>
    )
}

export default Range
