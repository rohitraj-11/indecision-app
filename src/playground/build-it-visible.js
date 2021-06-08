class Visibility extends React.component {
    constructor(props) {
        super(props);
        this.handleToggleVisibility = this.handleToggleVisibility.bind(this);
        this.state = {
            flag: false
        }
    }
    handleToggleVisibility () {
        this.setState( (prevState) => {
            return {
                flag: !prevState.flag
            };
        } );
    }
    render () {
        return (
            <div>
            <h1>Visibility Toggle</h1>
            <button onClick={this.handleToggleVisibility}>{this.state.flag ? 'Hide details': 'Show Details'}</button>
            {this.state.flag && (
                <div>
                    <p>These are the details!</p>
                </div>
            )}
            </div>
        );
    }
}

ReactDOM.render(<VisibilityToggle />, document.getElementById('app'));

// console.log('App.js is running!');

// const appRoot = document.getElementById('app');

// let flag = false;

// const func = () => {
//     flag = !flag;
//     render();
// }

// const render = () => {

//     const template = (
        // <div>
        //     <h1>Visibility Toggle</h1>
        //     <button onClick={func}>{flag ? 'Hide details': 'Show Details'}</button>
        //     {flag && (
        //         <div>
        //             <p>These are the details!</p>
        //         </div>
        //     )}
        // </div>
//     );

//     ReactDOM.render(template, appRoot)
// };

// render();
