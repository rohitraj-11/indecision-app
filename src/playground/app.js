class IndecisionApp extends React.Component {
    constructor (props) {
        super(props);
        this.handleDeleteOptions=this.handleDeleteOptions.bind(this);
        this.handleDeleteOption=this.handleDeleteOption.bind(this);
        this.handlePick=this.handlePick.bind(this);
        this.handleAddOption=this.handleAddOption.bind(this);
        this.state = {
            options: [] // props.options -> need not use this as we are reading data from local storage
        };
    }
    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            if(options) {
                this.setState( () => ({options: options}))
            }
        } catch (e) {
            // do nothing
        }
        
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevState.options.length !== this.state.options.length){
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options',json);
        }
    }
    componentwillUnmount() {
        console.log('componentWillMount');
    }
    handleDeleteOptions() {
        this.setState( () => ({ options: [] }));
        // we need an extra parenthesis as we are returning object.
    }
    handleDeleteOption(optionToRemove){
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => {
                return optionToRemove !== option;
            })
        }));
    }
    handlePick() {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        alert(option);
    }
    handleAddOption(option) {
        if(!option) {
            return 'Enter valid value to add item.'
        } else if (this.state.options.indexOf(option) > -1) {
            return 'This option already exists.'
        }

        this.setState( (prevState) => ({
            options: prevState.options.concat([option])
        }));
    }
    render() {
        const subtitle = 'Let the world made of 0(s) and 1(s) decide!';
        return (
            <div>
                <Header subtitle={subtitle}/> 
                <Action 
                    hasOptions={this.state.options.length > 0}
                    handlePick={this.handlePick}
                />
                <Options 
                    options={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption={this.handleDeleteOption}
                />
                <AddOption 
                    handleAddOption={this.handleAddOption}
                />
            </div>
        );
    }
    // in <Header title=""/> we can give any name to key like we have given here title as name except /key/ as this is reserved .
}

// IndecisionApp.defaultProps = {
//     options: []
// }

const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            {props.subtitle && <h2>{props.subtitle}</h2>}
        </div>
    );
}

Header.defaultProps = {
    title: 'Indecison!'
}

// class Header extends React.Component {
//     render() {
//         this.props
//         return (
//             <div>
//                 <h1>{this.props.title}</h1>
//                 <h2>{this.props.subtitle}</h2>
//             </div>
//         );
//     }
// }

const Action = (props) => {
    return (
        <div>
            <button 
            onClick={props.handlePick} 
            disabled={!props.hasOptions}
            >
                What should I do?
            </button>
        </div>
    );
}

// class Action extends React.Component {
//     render() {
//         return (
//             <div>
//                 <button 
//                 onClick={this.props.handlePick} 
//                 disabled={!this.props.hasOptions}
//                 >
//                     What should I do?
//                 </button>
//             </div>
//         );
//     }
//     // dnt write this.handlepick(), we just have to reference the function instead of calling it.
// }

const Options = (props) => {
    return (
        <div>
            <button onClick={props.handleDeleteOptions}>Remove All</button>
            {props.options.length === 0 && <p>Please add an option to get started!</p>}
            {
                props.options.map( (option) => (
                    <Option 
                        key={option} 
                        optionText={option}
                        handleDeleteOption={props.handleDeleteOption}
                    />
                ))
            }
        </div>
    );
}

// class Options extends React.Component {
//     render() {
//         return (
//             <div>
//                 <button onClick={this.props.handleDeleteOptions}>Remove All</button>
//                 {
//                     this.props.options.map( (option) => <Option key={option} optionText={option}/>) 
//                 }
//                 <Option />
//             </div>
//         );
//     }
// }

const Option = (props) => {
    return (
        <div>
            {props.optionText}
            <button 
                onClick={(e) => {
                    props.handleDeleteOption(props.optionText);
                }}
                // we can not call handleDeleteOption(props.optionText) becaue here we need to catch the e coming from event.
            >
                remove
            </button>
        </div>
    );
};

// class Option extends React.Component {
//     render() {
//         return (
//             <div>
//                 {this.props.optionText}
//             </div>
//         );
//     }
// }

class AddOption extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOption=this.handleAddOption.bind(this);
        this.state = {
            error: undefined
        };
        // we have to bind because we are using this in handleAddOpyion made in Option class.
    }
    handleAddOption(e) {
        e.preventDefault();

        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);

        this.setState(() => ({error: error}));

        if (!error) {
            e.target.elements.option.value = '';
        }
    }
    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option" />
                    <button>Add Option</button>
                </form>
            </div>
        );
    }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));




// cd desktop/react-course/indecision-app