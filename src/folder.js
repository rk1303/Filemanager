import React from 'react';

import './folder.css';
import PopUp from './popUp';


class Folder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPopUp: false,
            popUpData: {}
        }
    }
    handleRectclick = () => {

        !this.props.flag && this.setState({ popUpData: this.props.data, showPopUp: true });

    }
    handleClosePopUp=() => {
        this.setState({ showPopUp: false});
    }
    AddNewChild=(child) => {
        this.props.handleClosePopUp({
            id:this.props.data.id,
            children:child.children,
            edited:true
        });
    }
    render() {
        const { data } = this.props;
        const { popUpData, showPopUp } = this.state;
        return(
            <React.Fragment>
                <section className="rect" onClick={this.handleRectclick}>
                    <p className="data">{data.name}</p>
                </section>
                    {showPopUp && <PopUp data={popUpData} closePopUp={this.handleClosePopUp} newChild={this.AddNewChild} />}
            </React.Fragment>
        )
        }
    }

export default Folder;