import { observable  , action } from "mobx";

class ProfileStore {

  @observable addDialogVisible = false;
  @observable editDialogVisible = false;
  @observable clickedProfile = {};
  @observable role = "";
  @observable profiles = [
    {id:"1", name: "Sharath Chandra",role:"admin",phone:"8553210878",mail:"yarra317@gmal.com"},
    {id:"2", name: "Mark Butcher",role:"regular",phone:"9490535454",mail:"yarra317@gmal.com"},
    {id:"3", name: "Jack Sparrow",role:"regular",phone:"966304589",mail:"yarra317@gmal.com"}
  ];

  @action postProfileData = (data) => {
    let count = this.profiles.length;
    if(count){
      data.id = this.profiles[count-1].id + 1;
    }
    else{
      data.id = 1;
    }
    this.profiles.push(data);
    this.addDialogVisible = false;
  }

  @action editProfileData = (data) => {
    let index = this.findIndex(this.clickedProfile.id);
    data.id = this.clickedProfile.id;
    this.profiles.splice(index,1,data);
    this.editDialogVisible = false;
    this.clickedProfile.role=this.role;
  }

  @action deleteProfile = () => {
    let index = this.findIndex(this.clickedProfile.id);
    this.profiles.splice(index,1);
    this.editDialogVisible = false;
  };
  
  @action showProfileDialog = () => {
    this.addDialogVisible = true;
  };

  @action showEditProfileDialog = (val) => {
    let index = this.findIndex(val);
    this.editDialogVisible = true;
    this.clickedProfile = this.profiles[index];
    this.role = this.clickedProfile.role;
  };

  @action findIndex(val){
    function filterByID(item) {
        return item.id === val;
    }
    let index = this.profiles.findIndex(filterByID);
    return index;
  }

}

export default new ProfileStore();
