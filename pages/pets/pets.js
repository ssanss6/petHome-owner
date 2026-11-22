const { getToken } = require('../../utils/auth');
const { get, del } = require('../../utils/request');

Page({
  data: {
    loggedIn: false,
    pets: [],
    loading: false
  },

  onShow() {
    const loggedIn = !!getToken();
    this.setData({ loggedIn });
    if (loggedIn) {
      this.loadPets();
    }
  },

  loadPets() {
    this.setData({ loading: true });
    get('/pets')
      .then((pets) => this.setData({ pets }))
      .catch(() => {})
      .finally(() => this.setData({ loading: false }));
  },

  onAdd() {
    wx.navigateTo({ url: '/pages/pets/edit' });
  },

  onEdit(e) {
    wx.navigateTo({ url: `/pages/pets/edit?id=${e.currentTarget.dataset.id}` });
  },

  onDelete(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确认删除该宠物？',
      success: (res) => {
        if (res.confirm) {
          del(`/pets/${id}`)
            .then(() => {
              wx.showToast({ title: '已删除', icon: 'none' });
              this.loadPets();
            })
            .catch(() => {});
        }
      }
    });
  },

  onLogin() {
    wx.navigateTo({ url: '/pages/login/login' });
  }
});
