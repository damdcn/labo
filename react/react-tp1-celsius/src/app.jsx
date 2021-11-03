const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
}

function toCelsius (fahrenheit) {
    return (fahrenheit - 32) * 5/9
}

function toFahrenheit (celcius) {
    return (celcius * (9/5)) + 32
}

function tryConvert(temperature, convert){
    const value = parseFloat(temperature)
    if (Number.isNaN(value))
        return ''
    return (Math.round(convert(value) * 100) / 100).toString()
}

function BoilingVedict ({celcius}) {
    let boiling = celcius >= 100;
    if(boiling)
        return <div className="alert alert-danger mt-4">Boiling</div>
    else
        return <div className="alert alert-primary mt-4">Not Boiling</div>
}



class TemperatureInput extends React.Component {

    constructor (props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange (e) {
        this.props.onTemperatureChange(e.target.value, e.target.id[0])
    }

    render() {
        let scaleName = scaleNames[this.props.scale];
        let scaleNameLow = scaleName.toLowerCase();
        return <form className="form-group">
            <label htmlFor={scaleNameLow}>Température (en degré {scaleName})</label>
            <input type="text" value={this.props.temperature} onChange={this.handleChange} name={scaleNameLow} id={scaleNameLow} className="form-control"/>
        </form>
    }
}

class Calculator extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            scale: 'c',
            temperature: ''
        }
        this.handleTemperatureChange = this.handleTemperatureChange.bind(this)
    }

    handleTemperatureChange (temperature, scale) {
        this.setState({
            temperature: temperature,
            scale: scale
        })
    }


    render () {
        const celsius = this.state.scale == 'c' ? this.state.temperature : tryConvert(this.state.temperature, toCelsius)
        const fahrenheit = this.state.scale == 'f' ? this.state.temperature : tryConvert(this.state.temperature, toFahrenheit)
        return <div>
            <TemperatureInput scale="c" temperature={celsius} onTemperatureChange={this.handleTemperatureChange}/>
            <TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={this.handleTemperatureChange}/>
            <BoilingVedict celcius={parseFloat(celsius)}/>
            {JSON.stringify(this.state)}
        </div>
    }
}

class Home extends React.Component {

    constructor(props) {
        super(props)
    }


    render () {
        return <Calculator/>
    }
    
}

ReactDOM.render(<Home/>, document.querySelector('#app'))