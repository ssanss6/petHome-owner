const { getToken } = require('../../utils/auth');
const { get } = require('../../utils/request');
const { ROOM_IMAGES } = require('../../config/images');

Page({
  data: {
    loggedIn: false,
    pet: null,
    store: {
      name: '毛孩子宠物生活馆',
      addr: '北京 · 朝阳区望京 SOHO T3 · 营业中 09:00–21:00'
    },
    banner: {
      title: '新客寄养首单 8 折',
      sub: '含每日照护记录 · 照片实时同步'
    },
    entries: [
      { id: 1, icon: 'home-o', name: '寄养预约', desc: '按天计费 · 笼位可选' },
      { id: 2, icon: 'flower-o', name: '洗护预约', desc: '美容师时段可约' }
    ],
    rooms: [
      { id: 1, name: '标准间', price: 88, image: ROOM_IMAGES['标准间'] },
      { id: 2, name: '豪华间', price: 138, image: ROOM_IMAGES['豪华间'] },
      { id: 3, name: '猫咪房', price: 108, image: ROOM_IMAGES['猫咪房'] }
    ]
  },

  onShow() {
    const loggedIn = !!getToken();
    this.setData({ loggedIn });
    if (loggedIn) {
      get('/pets')
        .then((pets) => {
          this.setData({ pet: pets && pets.length > 0 ? this.mapPet(pets[0]) : null });
        })
        .catch(() => {});
    } else {
      this.setData({ pet: null });
    }
  },

  mapPet(p) {
    const expire = p.vaccineExpireDate ? new Date(p.vaccineExpireDate) : null;
    const vaccine = expire ? (expire >= new Date() ? '疫苗有效' : '疫苗到期') : '未登记疫苗';
    return {
      avatarUrl: p.avatarUrl || '',
      name: p.name,
      breed: p.breed || p.species || '',
      weight: p.weight ? p.weight + 'kg' : '',
      vaccine
    };
  },

  onTapService(e) {
    const name = e.currentTarget.dataset.name || '该服务';
    if (name === '寄养预约') {
      if (!this.data.loggedIn) {
        wx.navigateTo({ url: '/pages/login/login' });
      } else {
        wx.navigateTo({ url: '/pages/boarding/boarding' });
      }
    } else {
      wx.showToast({ title: name + '（开发中）', icon: 'none' });
    }
  },

  onTapManage() {
    if (!this.data.loggedIn) {
      wx.navigateTo({ url: '/pages/login/login' });
    } else {
      wx.navigateTo({ url: '/pages/pets/pets' });
    }
  }
});
