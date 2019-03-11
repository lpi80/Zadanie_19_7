function randomString() {
    let chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    let str = '';
    for (let i = 0; i < 10; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
    
};

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
        this.addClick = this.addClick.bind(this);
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

            return times;
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
            return times;
        })
    }

   
    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(times.miliseconds)}`;
    }

    add(val) {
        const timeData = {
            times: val,
            id: randomString(),
        }
        const timeList = [...this.state.timeList, timeData];
        this.setState({ timeList })
    }

    addClick() {
        const time = Object.assign({},this.state.times);
        this.add(time);
    }

    clear() {
        const remainder = this.state.timeList.filter(id => id == '');
        this.setState({ timeList: remainder });
    }

    render() {
        const timeList = this.state.timeList.map(data => {
            return <li>{this.format(data.times)}</li>;
        })
        return (
            <div>
                <nav className="controls">

                    <button className="button" id='start' onClick={this.start}>Start</button>
                    <button className="button" id='stop' onClick={this.stop}>Stop</button>
                    <button className="button" id='reset' onClick={this.reset}>Reset</button>
                    <button className="button" id='add' onClick={this.addClick}>Add</button>
                    <button className="button" id='clear' onClick={this.clear}>Clear list</button>

                </nav>
                <div className="stopwatch">
                    <h1>{this.format(this.state.times)}</h1>
                </div>
                <ul class="results">{timeList}</ul>
            </div>

        )
    }
}


ReactDOM.render(
    <Stopwatch />,
    document.getElementById('root')
);

