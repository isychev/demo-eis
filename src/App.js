import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import logo from './logo.svg';
import './App.css';
import {selectorEntityData, entityFetch} from './ducks/entities'

function App(props) {
    const {dispatch, user} = props;
    useEffect(() => {
        dispatch(entityFetch({entityAlias: 'user'}));
    }, []);
    console.log('App Component props user');
    console.log(user);
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default connect(state => {
    return {
        user: selectorEntityData(state, {entityAlias: 'user'})
    }
})(App);
