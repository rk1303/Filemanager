import React from 'react';

import "./popUp.css";
import Folder from './folder';

class PopUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            flag: false,
            newChange: ''
        }
    }
    handleChange = (event) => {
        let value = event.target.value;
        this.setState({ name: value });
    }
    handleNewChange = (event) => {
        let value = event.target.value;
        this.setState({ newChange: value });
    }
    createFolder = () => {
       this.props.closePopUp({name:this.state.name, child:[],id:Math.floor(Math.random() * 10000)});
    }
    closeClickPopUp = (event) => {
        if (event.target.className === 'popup') {
            this.createFolder();
        }
    }
    handleAdd =() => {
        this.setState({ flag: true });
    }
    handleChildrenAdded =(event) => {
        const child=this.props.data.children;
        child.push({name:event.target.value,child:[],id:Math.floor(Math.random() * 1000)})
        this.props.newChild({children:child});
        this.setState({ flag: false });
    }
    render() {
        const { data, closePopUp } = this.props;
        const { flag } = this.state;
        return (
            <div className='popup' onClick={this.closeClickPopUp}>
                <div className='popup_inner'>
                    {!data && <div>
                        <h1 className="title">Create new folder</h1>
                        <div className="modal-body">
                            <input type="text" maxLength="30" onChange={this.handleChange} className="input" placeholder="Enter folder name here..." />
                        </div>
                        <div className="actions">
                            <button onClick={this.createFolder} className="button">Create Folder</button>
                            <p className="helper">!Folder name should be less than 30 character</p>
                        </div>
                    </div>}
                    {data && <div>
                        <h1 className="title">Edit {data.name}</h1>
                        <div className="modal-body data-body">
                            {/* <section className="existingFolder" title="Existing Folder">
                                <span>Inside {data.name}</span>
                            </section> */}
                            {data && data.children && data.children.map((obj, ind) => {
                                return <Folder data={obj} key={ind} flag={true}/>
                            })}
                            {flag && <section className="existingFolder" title="Existing Folder">
                                <input type="text" maxLength="30" onChange={this.handleNewChange} onBlur={this.handleChildrenAdded} className="input" placeholder="Enter folder name here..." />
                            </section>}
                            <section className="addFolder" title="Add new folder" onClick={this.handleAdd}>
                                <span>+</span>
                            </section>
                        </div>
                        <div className="actions">
                            <button onClick={closePopUp} className="button">Close</button>
                        </div>
                    </div>
                    }
                </div>
            </div>
        )
    }
}
export default PopUp;