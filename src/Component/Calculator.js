import React, { Component } from 'react';
const inputButtons = [
    ['C', '+/-', '%', '/'],
    [7, 8, 9, '*'],
    [4, 5, 6, '-'],
    [1, 2, 3, '+'],
    [0, '.', '=']
];
class Calculator extends Component {
    constructor(props) {
        super(props)
        this.state = {
            result: 0,
            previous: 0,
            next: '',
            operator: '',
            answer: 0,
            line: [],
            history: [0],
            historylen: 0
        }
    }
    calculate(data) {
        const { previous, next, result, history, historylen } = this.state;
        let length = historylen + 1
        let isOperator = isNaN(data)
        if (isOperator) {
            this.setState({
                historylen: length,
                previous: next,
                next: 0
            }, () => console.log('historylen', historylen))
            if (data == '=') {
                this.result()
            }

            else if (data === 'C') {
                this.clear()
            }
            else {
                this.seperate(data);
            }

        }

        else {
            let oldline = next == 0 ? data : next + '' + data
            let data2 = history;
            oldline = this.readHistory(data2, historylen) ? data2[historylen] + '' + oldline : oldline;
            data2[historylen] = oldline
            this.setState({ next: oldline, history: data2 })
        }
    }


    readHistory(data, len) {
        if (data[len] !== undefined) {
            return isNaN(data[len])
        }
        else {
            return false;
        }

    }

    result() {
        const { previous, next, history, operator } = this.state
        let data = history;
        let tempOperator = ''
        console.log('history', history)
        if (operator === '+') {
            tempOperator = parseInt(previous) + parseInt(next)
            data.push(tempOperator)
        }
        else if (operator === '-') {
            tempOperator = parseInt(previous) + parseInt(next)
            data.push(tempOperator)
        }
        else if (operator === '*') {
            console.log('next', next.length)
            if (next) {
                next.split('')
            }
            tempOperator = parseInt(previous) * next[1]
            data.push(tempOperator)
        }
        else if (operator === '/') {
            next.split('')
            tempOperator = parseInt(previous) / next[1]
            data.push(tempOperator)
        }


        this.setState({ history: data, previous: tempOperator })
    }
    clear() {
        this.setState({
            previous: 0,
            next: 0,
            historylen: 0,
            operator: '',
            result: 0, history: [0]
        })
    }
    seperate(data) {
        const { previous, history, next, operator } = this.state;
        // console.log('seperate',previous,history)
        if (operator === '+') {
            this.setState({ previous: parseInt(previous) + parseInt(next) })
        }
        else if (operator === '-') {
            this.setState({ previous: parseInt(previous) + parseInt(next) })
        }
        else if (operator === '*') {
            this.setState({ previous: parseInt(previous) + parseInt(next) })
        }
        else if (operator === '/') {
            this.setState({ previous: parseInt(previous) + parseInt(next) })
        }
        let data2 = history
        data2.push(data)

        this.setState({ history: data2, operator: data })
    }
    render() {
        const { history, result } = this.state
        return (
            <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', height: '100vh', padding: '20px', boxSizing: 'border-box' }}>
                <div style={{ padding: 5, width: '100%', maxWidth: 250, backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 8, boxShadow: '5px 8px 20px rgb(181,160,246)' }}>
                    <div style={{
                        display: 'flex', maxHeight: 150, overflow: 'auto', minHeight: 100,
                        flexDirection: 'column', alignItems: 'flex-end'
                    }}>
                        {history.map((item, index) => {
                            return (
                                <div>
                                    <p style={{ fontSize: 20, color: '#00ccff', margin: 0, padding: 0, marginRight: 5 }}>{item}</p>
                                </div>
                            )
                        })}
                    </div>
                    <div>
                        {inputButtons.map((items, index) => {
                            return (
                                <div style={{ display: 'flex', flexDirection: 'row', padding: 10, justifyContent: 'space-between', alignItems: 'center' }}>

                                    {items.map((item, index) => {
                                        if (item === '=') {
                                            return (<button
                                                style={{
                                                    height: 40, width: '40%', border: 'none',
                                                    backgroundColor: '#00ccff',
                                                    boxShadow: '3px 4px 5px rgb(149, 222, 241)',
                                                    borderRadius: '20px',
                                                    lineHeight: '40px'
                                                }}
                                                onClick={() => this.calculate(item)}
                                                value={item}>
                                                <p
                                                    style={{
                                                        fontSize: 18, margin: 0, padding: 0,
                                                        color: '#fff',
                                                    }}>
                                                    {item}</p>
                                            </button>)
                                        }
                                        else {
                                            return (
                                                <button
                                                    style={{
                                                        height: 40, width: 40, border: 'none',
                                                        backgroundColor: index === 3 ? '#00ccff' : '#fff',
                                                        boxShadow: index === 3 ? '3px 4px 5px rgb(149, 222, 241)' : '3px 4px 5px #ddd',
                                                        borderRadius: '50%',
                                                        lineHeight: '40px'
                                                    }}
                                                    onClick={() => this.calculate(item)}
                                                    value={item}>
                                                    <p
                                                        style={{
                                                            fontSize: 18, margin: 0, padding: 0,
                                                            color: index === 3 ? '#fff' : '#00ccff',
                                                        }}>
                                                        {item}</p>
                                                </button>

                                            )
                                        }
                                    })}
                                </div>
                            )
                        })

                        }
                    </div>




                </div>

            </div>

        )
    }
}

export default Calculator;