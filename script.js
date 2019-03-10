class Stopwatch extends React.Component {
    constructor() {
        super();
        this.state = {
            running: false,
            timeList: [],
            times: {
                miliseconds: 0,
                seconds: 0,
                minutes: 0,
            },
        }
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.reset = this.reset.bind(this);
        this.add = this.add.bind(this);
        this.clear = this.clear.bind(this);
    }

    step() {
        if (!this.state.running) return;
        this.calculate();
    }

    calculate() {
        this.setState(state => {
            const times = state.times;

            times.miliseconds += 1;
            if (times.miliseconds >= 100) {
                times.seconds += 1;
                times.miliseconds = 0;
            }
            if (times.seconds >= 60) {
                times.minutes += 1;
                times.seconds = 0;
            }

            return times
        })
    }

    start() {
        if (!this.state.running) {
            this.interval = setInterval(() => { this.step() }, 10)
            this.setState({ running: true })
        }
    }

    stop() {
        this.setState({ running: false })
    }

    reset() {
        this.setState(state => {
            const times = state.times;
            times.minutes = 0;
            times.seconds = 0;
            times.miliseconds = 0;
            return times
        })
    }

    pad0(value) {
        let result = value.toString();
        if (result.length < 2) {
            result = '0' + result;
        }
        return result;
    }

    format(times) {
        return `${this.pad0(times.minutes)}:${this.pad0(times.seconds)}:${this.pad0(times.miliseconds)}`;
    }

    add() {
        const timeList = [...this.state.timeList, this.state.times];
        this.setState({ timeList })
    }

    clear() {
        const remainder = this.state.timeList.filter(times => times.miliseconds == null);
        this.setState({ timeList: remainder });
    }

    render() {
        this.timeList = this.state.timeList.map(time => {
            return <li>{this.format(time)}</li>;
        })

        return (
            <div>
                <nav className="controls">

                    <a href="#" className="button" id='start' onClick={this.start}>Start</a>
                    <a href="#" className="button" id='stop' onClick={this.stop}>Stop</a>
                    <a href="#" className="button" id='reset' onClick={this.reset}>Reset</a>
                    <a href="#" className="button" id='add' onClick={this.add}>Add</a>
                    <a href="#" className="button" id='clear' onClick={this.clear}>Clear list</a>

                </nav>
                <div className="stopwatch">
                    <h1>{this.format(this.state.times)}</h1>
                </div>
                <ul class="results">{this.timeList}</ul>
            </div>

        )
    }
}


ReactDOM.render(
    <Stopwatch />,
    document.getElementById('root')
);

