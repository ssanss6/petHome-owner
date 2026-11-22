// 登录态管理：token + 用户信息存本地缓存
const TOKEN_KEY = 'pethome_token';
const USER_KEY = 'pethome_user';

function getToken() {
  return wx.getStorageSync(TOKEN_KEY) || '';
}

function setToken(token) {
  wx.setStorageSync(TOKEN_KEY, token);
}

function clearToken() {
  wx.removeStorageSync(TOKEN_KEY);
  wx.removeStorageSync(USER_KEY);
}

function getUser() {
  return wx.getStorageSync(USER_KEY) || null;
}

function setUser(user) {
  wx.setStorageSync(USER_KEY, user);
}

// 微信登录：wx.login 取临时 code
function wxLogin() {
  return new Promise((resolve, reject) => {
    wx.login({
      success(res) {
        if (res.code) {
          resolve(res.code);
        } else {
          reject(new Error('wx.login 未返回 code'));
        }
      },
      fail: reject
    });
  });
}

module.exports = { getToken, setToken, clearToken, getUser, setUser, wxLogin };
