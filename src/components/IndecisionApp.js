import React from 'react';
import AddOption from './AddOption'
import Action from './Action'
import Header from './Header'
import Options from './Options'
import OptionModal from './OptionModal'

export default class IndecisionApp extends React.Component {
    state = {
        options: [],
        selectedOption: undefined
    };

    // constructor (props) {
    //     super(props);
    //     this.handleDeleteOptions=this.handleDeleteOptions.bind(this);
    //     this.handleDeleteOption=this.handleDeleteOption.bind(this);
    //     this.handlePick=this.handlePick.bind(this);
    //     this.handleAddOption=this.handleAddOption.bind(this);
    //     this.state = {
    //         options: [] // props.options -> need not use this as we are reading data from local storage
    //     };
    // }
    handleClearSelectedOption = () => {
        this.setState( () => ({ selectedOption: undefined }));
    }
    handleDeleteOptions = () => {
        this.setState( () => ({ options: [] }));
        // we need an extra parenthesis as we are returning object.
    }
    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => {
                return optionToRemove !== option;
            })
        }));
    }
    handlePick = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        this.setState(() => ({
            selectedOption: option
        }));
    }
    handleAddOption = (option) => {
        if(!option) {
            return 'Enter valid value to add item.'
        } else if (this.state.options.indexOf(option) > -1) {
            return 'This option already exists.'
        }

        this.setState( (prevState) => ({
            options: prevState.options.concat([option])
        }));
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
    render() {
        const subtitle = 'Let the world made of 0(s) and 1(s) decide!';
        return (
            <div>
                <Header subtitle={subtitle}/> 
                <div className='container'>
                    <Action 
                        hasOptions={this.state.options.length > 0}
                        handlePick={this.handlePick}
                    />
                    <div className="widget">
                        <Options 
                            options={this.state.options}
                            handleDeleteOptions={this.handleDeleteOptions}
                            handleDeleteOption={this.handleDeleteOption}
                        />
                        <AddOption 
                            handleAddOption={this.handleAddOption}
                        />
                    </div>
                    <OptionModal 
                        selectedOption={this.state.selectedOption}
                        handleClearSelectedOption={this.handleClearSelectedOption}
                    />
                </div>
            </div>
        );
    }
    // in <Header title=""/> we can give any name to key like we have given here title as name except "key" as this is reserved .
}