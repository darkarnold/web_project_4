class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameSelector = document.querySelector(nameSelector);
    this._jobSelector = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    this._userData = {
      name: this._nameSelector.textContent,
      job: this._jobSelector.textContent,
      //avatar: this._avatar.style.backgroundImage,
    };
    return this._userData;
  }

  setUserInfo(nameSelector, jobSelector, avatarSelector, id) {
    this._id = id;
    this._nameSelector.textContent = nameSelector;
    this._jobSelector.textContent = jobSelector;
    this._avatar.style.backgroundImage = `url('${avatarSelector}')`;
  }

  setAvatar(avatarSelector) {
    this._avatar.style.backgroundImage = `url('${avatarSelector}')`;
  }
}

export default UserInfo;
