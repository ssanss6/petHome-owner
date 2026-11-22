const { getToken } = require('./utils/auth');

App({
  globalData: {
    baseUrl: 'http://127.0.0.1:8080',
    userInfo: null
  },
  onLaunch() {
    // 启动时读取本地登录态
    this.globalData.userInfo = getToken() ? { loggedIn: true } : null;
  }
});
