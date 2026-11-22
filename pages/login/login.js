const { wxLogin, setToken, setUser } = require('../../utils/auth');
const { post } = require('../../utils/request');

Page({
  data: {
    loading: false,
    nickname: ''
  },

  onNicknameInput(e) {
    this.setData({ nickname: e.detail.value });
  },

  onTapWxLogin() {
    if (this.data.loading) return;
    this.setData({ loading: true });

    wxLogin()
      .then((code) => post('/api/auth/wx-login', { code, nickname: this.data.nickname }))
      .then((data) => {
        // data 为 LoginResponse：token/userId/userType/roles/nickname...
        setToken(data.token);
        setUser(data);
        wx.showToast({ title: '登录成功', icon: 'success' });
        setTimeout(() => {
          wx.navigateBack({
            fail: () => wx.reLaunch({ url: '/pages/index/index' })
          });
        }, 600);
      })
      .catch(() => {
        wx.showToast({ title: '登录失败', icon: 'none' });
      })
      .finally(() => {
        this.setData({ loading: false });
      });
  }
});
