const { getToken, getUser, clearToken } = require('../../utils/auth');

Page({
  data: {
    loggedIn: false,
    nickname: ''
  },

  onShow() {
    const user = getUser();
    this.setData({
      loggedIn: !!getToken(),
      nickname: (user && user.nickname) || ''
    });
  },

  onTapLogin() {
    wx.navigateTo({ url: '/pages/login/login' });
  },

  onLogout() {
    clearToken();
    this.onShow();
    wx.showToast({ title: '已退出登录', icon: 'none' });
  }
});
