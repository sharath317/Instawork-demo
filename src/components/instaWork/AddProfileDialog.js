import React, { Component } from 'react';
import {TextField,Button, DialogContainer, Toolbar } from 'react-md';
import {observer , inject} from 'mobx-react';

@inject('ProfileStore')
@observer
export default class AddProfileDialog extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    const newProfile = this.parseNewProfile(e,this.props.ProfileStore);
    if(newProfile){
      this.props.ProfileStore.postProfileData(newProfile);
    }
  };

  onHide = () =>{
    this.props.ProfileStore.addDialogVisible = false;
  }

  handleClick = (val) =>{
    this.props.ProfileStore.role = val;
  }

  parseNewProfile = (e) => [].reduce.call(e.target.elements, (profileData, el) => {
    const { name, value } = el;
    if (!name) { // buttons
      return profileData;
    }
    else{
      profileData[name] = value;
    }
    return profileData;
  }, {});

  render() {
    let {addDialogVisible,role } = this.props.ProfileStore;

    return (
      <DialogContainer
          id="simple-list-dialog"
          visible={addDialogVisible}
          title="Simple List Dialog"
          onHide={this.onHide}
        >
          <Toolbar
            title="Add a new team member"
            titleId="add-profile-dialog-title"
            fixed
            colored
          />
          <form onSubmit={this.handleSubmit} className="md-grid" style={{paddingTop:"2vh"}} aria-labelledby={`profile-group-title`}>
            <p style={{fontSize: "1.5em",color: "#3f51b5"}}>Info</p>
            <TextField
              id='profileName'
              name={`name`}
              label="name"
              customSize="title"
              defaultValue=""
              placeholder="name"
            />
            <TextField
              id='profileMail'
              name={`mail`}
              label="email"
              customSize="title"
              defaultValue=""
              placeholder="email"
            />
            <TextField
              id='profilePhone'
              name={`phone`}
              label="phone"
              customSize="title"
              defaultValue=""
              placeholder="phone number"
            />
            <div style={{padding:"10px 0px 10px 0px"}} className="md-text-field-container md-full-width md-text-field-container--input">
              <p style={{fontSize: "1.5em",color: "#3f51b5"}}>Role</p>
              <input type="radio" name="role" value="admin" checked={role==="admin"} onChange={()=>this.handleClick("admin")}></input> Admin
              <input type="radio" name="role" value="regular" checked={role==="regular"} onChange={()=>this.handleClick("regular")}></input> Regular
            </div>
            <Button raised secondary onClick={() => this.onHide()} style={{margin:"10px"}}>Close</Button>
            <Button raised primary type="submit" style={{margin:"10px"}}>Save</Button>
          </form>
        </DialogContainer>
    );
  }
}
