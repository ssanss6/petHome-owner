const { get, post } = require('../../utils/request');

Page({
  data: {
    pets: [],
    rooms: [],
    petNames: [],
    roomNames: [],
    petIndex: -1,
    roomIndex: -1,
    checkInDate: '',
    checkOutDate: '',
    minDate: '',
    availableCount: -1,
    nights: 0,
    totalPrice: 0,
    submitting: false
  },

  onLoad() {
    const d = new Date();
    const min = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    this.setData({ minDate: min });
    this.loadPets();
    this.loadRooms();
  },

  loadPets() {
    get('/pets').then((pets) => {
      this.setData({
        pets,
        petNames: pets.map((p) => p.name),
        petIndex: pets.length > 0 ? 0 : -1
      });
    }).catch(() => {});
  },

  loadRooms() {
    get('/boarding/room-types').then((rooms) => {
      this.setData({
        rooms,
        roomNames: rooms.map((r) => `${r.name} · ¥${r.dailyPrice}/天`),
        roomIndex: rooms.length > 0 ? 0 : -1
      });
      this.refreshAvailability();
    }).catch(() => {});
  },

  onPetChange(e) {
    this.setData({ petIndex: Number(e.detail.value) });
  },

  onRoomChange(e) {
    this.setData({ roomIndex: Number(e.detail.value) });
    this.refreshAvailability();
  },

  onCheckInChange(e) {
    this.setData({ checkInDate: e.detail.value });
    this.refreshAvailability();
  },

  onCheckOutChange(e) {
    this.setData({ checkOutDate: e.detail.value });
    this.refreshAvailability();
  },

  refreshAvailability() {
    const { rooms, roomIndex, checkInDate, checkOutDate } = this.data;
    if (roomIndex < 0 || !checkInDate || !checkOutDate || checkInDate >= checkOutDate) {
      this.setData({ availableCount: -1, nights: 0, totalPrice: 0 });
      return;
    }
    const roomTypeId = rooms[roomIndex].id;
    get(`/boarding/availability?roomTypeId=${roomTypeId}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`)
      .then((cages) => {
        const nights = Math.round((new Date(checkOutDate) - new Date(checkInDate)) / 86400000);
        const totalPrice = Number(rooms[roomIndex].dailyPrice) * nights;
        this.setData({ availableCount: cages.length, nights, totalPrice });
      })
      .catch(() => {});
  },

  onSubmit() {
    const d = this.data;
    if (d.petIndex < 0) {
      wx.showToast({ title: '请先添加宠物', icon: 'none' });
      return;
    }
    if (d.roomIndex < 0) {
      wx.showToast({ title: '请选择房型', icon: 'none' });
      return;
    }
    if (!d.checkInDate || !d.checkOutDate) {
      wx.showToast({ title: '请选择入住和离店日期', icon: 'none' });
      return;
    }
    if (d.checkInDate >= d.checkOutDate) {
      wx.showToast({ title: '离店日期须晚于入住', icon: 'none' });
      return;
    }
    if (d.availableCount <= 0) {
      wx.showToast({ title: '该日期区间已满房', icon: 'none' });
      return;
    }

    this.setData({ submitting: true });
    wx.showModal({
      title: '确认下单',
      content: `${d.petNames[d.petIndex]} · ${d.roomNames[d.roomIndex]} · ${d.nights} 晚 · ¥${d.totalPrice}`,
      success: (res) => {
        if (!res.confirm) {
          this.setData({ submitting: false });
          return;
        }
        post('/boarding/orders', {
          petId: d.pets[d.petIndex].id,
          roomTypeId: d.rooms[d.roomIndex].id,
          checkInDate: d.checkInDate,
          checkOutDate: d.checkOutDate
        })
          .then(() => {
            wx.showToast({ title: '下单成功', icon: 'success' });
            setTimeout(() => wx.switchTab({ url: '/pages/orders/orders' }), 600);
          })
          .catch(() => {})
          .finally(() => this.setData({ submitting: false }));
      }
    });
  }
});
