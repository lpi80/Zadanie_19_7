'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function randomString() {
    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    var str = '';
    for (var i = 0; i < 10; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}

function pad0(value) {
    var result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
};

var Stopwatch = function (_React$Component) {
    _inherits(Stopwatch, _React$Component);

    function Stopwatch() {
        _classCallCheck(this, Stopwatch);

        var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this));

        _this.state = {
            running: false,
            timeList: [],
            times: {
                miliseconds: 0,
                seconds: 0,
                minutes: 0
            }
        };
        _this.start = _this.start.bind(_this);
        _this.stop = _this.stop.bind(_this);
        _this.reset = _this.reset.bind(_this);
        _this.addClick = _this.addClick.bind(_this);
        _this.clear = _this.clear.bind(_this);
        return _this;
    }

    _createClass(Stopwatch, [{
        key: 'step',
        value: function step() {
            if (!this.state.running) return;
            this.calculate();
        }
    }, {
        key: 'calculate',
        value: function calculate() {
            this.setState(function (state) {
                var times = state.times;

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
            });
        }
    }, {
        key: 'start',
        value: function start() {
            var _this2 = this;

            if (!this.state.running) {
                this.interval = setInterval(function () {
                    _this2.step();
                }, 10);
                this.setState({ running: true });
            }
        }
    }, {
        key: 'stop',
        value: function stop() {
            this.setState({ running: false });
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.setState(function (state) {
                var times = state.times;
                times.minutes = 0;
                times.seconds = 0;
                times.miliseconds = 0;
                return times;
            });
        }
    }, {
        key: 'format',
        value: function format(times) {
            return pad0(times.minutes) + ':' + pad0(times.seconds) + ':' + pad0(times.miliseconds);
        }
    }, {
        key: 'add',
        value: function add(val) {
            var timeData = {
                times: val,
                id: randomString()
            };
            var timeList = [].concat(_toConsumableArray(this.state.timeList), [timeData]);
            this.setState({ timeList: timeList });
        }
    }, {
        key: 'addClick',
        value: function addClick() {
            var time = Object.assign({}, this.state.times);
            this.add(time);
        }
    }, {
        key: 'clear',
        value: function clear() {
            var remainder = this.state.timeList.filter(function (id) {
                return id == '';
            });
            this.setState({ timeList: remainder });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var timeList = this.state.timeList.map(function (data) {
                return React.createElement(
                    'li',
                    null,
                    _this3.format(data.times)
                );
            });
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'nav',
                    { className: 'controls' },
                    React.createElement(
                        'button',
                        { className: 'button', id: 'start', onClick: this.start },
                        'Start'
                    ),
                    React.createElement(
                        'button',
                        { className: 'button', id: 'stop', onClick: this.stop },
                        'Stop'
                    ),
                    React.createElement(
                        'button',
                        { className: 'button', id: 'reset', onClick: this.reset },
                        'Reset'
                    ),
                    React.createElement(
                        'button',
                        { className: 'button', id: 'add', onClick: this.addClick },
                        'Add'
                    ),
                    React.createElement(
                        'button',
                        { className: 'button', id: 'clear', onClick: this.clear },
                        'Clear list'
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'stopwatch' },
                    React.createElement(
                        'h1',
                        null,
                        this.format(this.state.times)
                    )
                ),
                React.createElement(
                    'ul',
                    { 'class': 'results' },
                    timeList
                )
            );
        }
    }]);

    return Stopwatch;
}(React.Component);

ReactDOM.render(React.createElement(Stopwatch, null), document.getElementById('root'));
