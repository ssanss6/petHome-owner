const { get } = require('../../utils/request');
const { getToken } = require('../../utils/auth');

const STATUS_TEXT = {
  PENDING_PAY: '待支付',
  PENDING_CONFIRM: '待确认',
  PENDING_CHECK_IN: '待入住',
  BOARDING: '寄养中',
  PENDING_CHECK_OUT: '待离店',
  COMPLETED: '已完成',
  CANCELLED: '已取消',
  AFTER_SALE: '售后中'
};

Page({
  data: {
    loggedIn: false,
    orders: []
  },

  onShow() {
    const loggedIn = !!getToken();
    this.setData({ loggedIn });
    if (loggedIn) {
      this.loadOrders();
    }
  },

  loadOrders() {
    get('/boarding/orders').then((orders) => {
      orders.forEach((o) => {
        o.statusText = STATUS_TEXT[o.status] || o.status;
      });
      this.setData({ orders });
    }).catch(() => {});
  },

  onLogin() {
    wx.navigateTo({ url: '/pages/login/login' });
  }
});
