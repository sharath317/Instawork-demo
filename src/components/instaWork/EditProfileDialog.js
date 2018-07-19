import React, { Component } from 'react';
import {TextField,Button, DialogContainer, Toolbar } from 'react-md';
import {observer , inject} from 'mobx-react';

@inject('ProfileStore')
@observer
export default class EditProfileDialog extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    const profile = this.parseNewProfile(e,this.props.ProfileStore);
    if(profile){
      this.props.ProfileStore.editProfileData(profile);
    }
  };

  onHide = () =>{
    this.props.ProfileStore.editDialogVisible = false;
  }

  handleClick = (val) =>{
    this.props.ProfileStore.role = val;
  }

  deleteProfile = (val) =>{
    this.props.ProfileStore.deleteProfile();
  }

  parseNewProfile = (e) => [].reduce.call(e.target.elements, (profileData, el) => {
    const { name, value, checked } = el;
    if (!name) { // buttons
      return profileData;
    }
    else if (name === "role") {
      if(checked){
          profileData[name] = value;
      }
    }
    else{
      profileData[name] = value;
    }
    return profileData;
  }, {});


  render() {
    let {editDialogVisible,clickedProfile,role } = this.props.ProfileStore;

    return (
      <DialogContainer
          id="simple-list-dialog"
          visible={editDialogVisible}
          title="Simple List Dialog"
          onHide={this.onHide}
        >
          <Toolbar
            title="Edit team member"
            titleId="edit-profile-dialog-title"
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
              defaultValue={clickedProfile.name}
              placeholder="name"
            />
            <TextField
              id='profileMail'
              name={`mail`}
              label="email"
              customSize="title"
              defaultValue={clickedProfile.mail}
              placeholder="email"
            />
            <TextField
              id='profilePhone'
              name={`phone`}
              label="phone"
              customSize="title"
              defaultValue={clickedProfile.phone}
              placeholder="phone number"
            />
            <div style={{padding:"10px 0px 10px 0px"}} className="md-text-field-container md-full-width md-text-field-container--input">
              <p style={{fontSize: "1.5em",color: "#3f51b5"}}>Role</p>
              <input type="radio" name="role" value="admin" checked={role==="admin"} onChange={()=>this.handleClick("admin")}></input> Admin
              <input type="radio" name="role" value="regular" checked={role==="regular"} onChange={()=>this.handleClick("regular")}></input> Regular
            </div>
            <Button raised secondary onClick={() => this.deleteProfile()} style={{margin:"10px"}}>Delete</Button>
            <Button raised primary type="submit" style={{margin:"10px"}}>Save</Button>
          </form>
        </DialogContainer>
    );
  }
}
