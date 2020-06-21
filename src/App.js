import React from 'react';
import { connect } from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom';
import history from './globals/history';

//components
import OrderOverview from './components/orders/OrderOverview.jsx';

//actions
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.idleTimer = null;
    }
    componentDidMount() {
        /*
        if(window.localStorage.getItem('user_info')) {

        }*/
        
    }
    render() {
        return (
            <div className="App">
                <Router history={history}>
                    <Switch>
                        <Route path='*' component={OrderOverview}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {

    }
}


const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);