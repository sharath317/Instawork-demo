import React, { Component } from "react";
import AddProfileDialog from './AddProfileDialog';
import EditProfileDialog from './EditProfileDialog';
import { Card, CardText,Cell } from 'react-md';
import {observer , inject} from 'mobx-react';
import { FontIcon } from 'react-md';

@inject('ProfileStore')
@observer
class ListProfile extends Component {

  showProfileDialog = () => {
    this.props.ProfileStore.showProfileDialog();
  }

  showEditProfileDialog = (id) => {
    this.props.ProfileStore.showEditProfileDialog(id);
  }

  render() {
    let {profiles}  = this.props.ProfileStore;

    return (
      <div>
        <Card className="md-cell">
          <div className="md-grid md-full-width">
            <Cell size={10} style={{textAlign:'left'}}>
              <h2>{"Team Members"}</h2>
              <h3 style={{color:"grey"}}>{"you have " + profiles.length + " team members"}</h3>
            </Cell>
            <Cell size={2} style={{textAlign:'right'}}>
              <button style={{cursor:'pointer',border:'0px',background:"white"}}
                onClick={() => this.showProfileDialog()}>
                <span style={{color:"#3f63b5",fontSize:"3.5em"}}>
                  {`+`}
                </span>
              </button>
            </Cell>
          </div>
          <CardText>
            {profiles.map(({name,role,phone,mail,id }) => (
              <div onClick={() => this.showEditProfileDialog(id)} key={name} className="md-grid md-full-width" style={{display:'flex',background:'#eee',borderBottom: '2px solid white'}}>
                <Cell size={2} style={{textAlign:'left'}}>
                  <span style={{fontSize:"3em"}}>
                    <FontIcon iconClassName="fa fa-user-circle" />
                  </span>
                </Cell>
                <Cell size={10} style={{textAlign:'left'}}>
                  <p>
                    <span style={{fontSize:"1.5em"}}>
                      {name}
                    </span>
                    <span style={{color:"grey"}}>
                      {`(`+role+`)`}
                    </span>
                  </p>
                  <p>
                    <span style={{color:"grey"}}>
                      {phone}
                    </span>
                  </p>
                  <p>
                    <span style={{color:"grey"}}>
                      {mail}
                    </span>
                  </p>
                </Cell>
              </div>
            ))}
          </CardText>
        </Card>
        <AddProfileDialog/>
        <EditProfileDialog/>
      </div>
    )
  }
}
export default ListProfile;
