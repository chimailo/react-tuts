import React, { useState } from 'react'

const scale = {
    f : 'fahrenheit',
    c : 'celsuis',
}

function TempInput(props) {

    const handleTempChange = event => {
        return props.onTempChange(event.target.value)
    }

    return (
        <form className="mt-5">
            <fieldset>
                <label>Temperature in {scale[props.scale]}</label>
                <div className="form-group">
                    <input type="text" value={props.temp} onChange={handleTempChange}
                        className="form-control" placeholder={`Enter temperature in ${scale[props.scale]}`} />
                </div>
            </fieldset>
        </form>
    )
}


function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

function convert(temp, convertFunc) {
    const input = parseFloat(temp)
    if (Number.isNaN(input)) return '';

    const output = convertFunc(input)
    const rounded = Math.round(output * 1000) / 1000
    return rounded.toString()
}

function ConvertTemp() {
    const [temp, setTemp] = useState({value:''})
    const [scale, setScale] = useState({scale:'c'})

    const handleCelsuisChange = value => {
        setTemp({value});
        setScale({scale:'c',});
    }

    const handleFahrenheitChange = value => {
        setTemp({value});
        setScale({scale:'f',});
    }

    const fahrenheit = scale.scale === 'c' ? convert(temp.value, toFahrenheit) : temp;
    const celsuis = scale.scale === 'f' ? convert(temp.value, toCelsius) : temp;
    console.log(temp.value)

    return (
        <div className="container">
            <div className="row">
                <div className="col"></div>
                <div className="col-6">
                    <h1 className="mt-5">Temperature Converter</h1>
                    <TempInput scale="c" temp={celsuis} onTempChange={handleCelsuisChange} />
                    <TempInput scale="f" temp={fahrenheit} onTempChange={handleFahrenheitChange} />
                </div>
                <div className="col"></div>
            </div>
        </div>
    )
}

export default ConvertTemp;
