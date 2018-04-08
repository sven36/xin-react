import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Loading from 'lm-loading'
import FooterBar from '../../../components_common/FooterBar/FooterBar'
import { Link } from 'react-router';
class App extends Component {

    static childContextTypes = {


        loadingChangeHandle: PropTypes.func

    };

    constructor (props) {

        super(props);
        this.state = {

            loadingShow: false

        };

        this.loadingChangeHandle = this.loadingChangeHandle.bind(this);

    }

    getChildContext () {

        return {

            loadingChangeHandle: this.loadingChangeHandle

        }

    }

    componentDidMount () {

        console.log('in this stage you can setState safe');

    }

    componentWillUnmount () {

        console.log('dont forget clear timer or remove listener');

    }


    loadingChangeHandle (showState) {

        this.setState({
            loadingShow: showState
        });

    }

    render () {

        return (

            <div>

                { this.props.children }
                <Link to="/home">home</Link>
                <Link to="/highpass">HighPass</Link>
                <FooterBar />
                <Loading
                    isShow={this.state.loadingShow} opacity={0.3} />

            </div>



        )

    }

}

export default App;
