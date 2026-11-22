Page({
  data: {
    store: {
      name: '毛孩子宠物生活馆',
      addr: '北京 · 朝阳区望京 SOHO T3 · 营业中 09:00–21:00'
    },
    banner: {
      title: '新客寄养首单 8 折',
      sub: '含每日照护记录 · 照片实时同步'
    },
    entries: [
      { id: 1, icon: '🏠', name: '寄养预约', desc: '按天计费 · 笼位可选' },
      { id: 2, icon: '🛁', name: '洗护预约', desc: '美容师时段可约' }
    ],
    pet: {
      icon: '🐕',
      name: '豆豆',
      breed: '金毛',
      age: '3 岁',
      weight: '28kg',
      vaccine: '疫苗有效'
    },
    rooms: [
      { id: 1, icon: '🐕', name: '标准间', price: 88 },
      { id: 2, icon: '🐕', name: '豪华间', price: 138 },
      { id: 3, icon: '🐈', name: '猫咪房', price: 108 }
    ]
  },

  onTapService(e) {
    const name = e.currentTarget.dataset.name || '该服务';
    wx.showToast({ title: name + '（开发中）', icon: 'none' });
  },

  onTapManage() {
    wx.navigateTo({ url: '/pages/login/login' });
  }
});
