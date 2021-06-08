import React from 'react';

export default class AddOption extends React.Component {
    state = { // this is possible because of transform-class-properties plugin
        error: undefined
    }
    
    // constructor(props) {
    //     super(props);
    //     this.handleAddOption=this.handleAddOption.bind(this);
    //     this.state = {
    //          error: undefined
    //     };
    //     // we have to bind because we are using this in handleAddOpyion made in Option class.
    // }

    // we convert all functions to arrow functions so we need not bind them, possible because of transform-class-properties plugin
    handleAddOption = (e) => {
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
                {this.state.error && <p className="add-option-error">{this.state.error}</p>}
                <form  className="add-option" onSubmit={this.handleAddOption}>
                    <input className="add-option__input" type="text" name="option" />
                    <button className="button">Add Option</button>
                </form>
            </div>
        );
    }
}