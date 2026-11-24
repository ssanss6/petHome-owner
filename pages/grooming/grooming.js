const { get, post } = require('../../utils/request');

Page({
  data: {
    services: [],
    groomers: [],
    pets: [],
    serviceIndex: -1,
    groomerIndex: -1,
    petIndex: -1,
    date: '',
    slots: ['09:00', '11:00', '14:00', '16:00', '18:00'],
    slotIndex: -1,
    serviceNames: [],
    groomerNames: [],
    petNames: [],
    submitting: false
  },

  onLoad() {
    this.setData({ date: this.formatDate(new Date()) });
  },

  onShow() {
    this.loadData();
  },

  formatDate(d) {
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${m}-${day}`;
  },

  loadData() {
    get('/grooming/services').then((services) => {
      this.setData({
        services,
        serviceNames: services.map((s) => `${s.name} · ¥${s.price}`),
        serviceIndex: services.length > 0 ? 0 : -1
      });
    }).catch(() => {});
    get('/grooming/groomers').then((groomers) => {
      this.setData({
        groomers,
        groomerNames: groomers.map((g) => g.name),
        groomerIndex: groomers.length > 0 ? 0 : -1
      });
    }).catch(() => {});
    get('/pets').then((pets) => {
      this.setData({
        pets,
        petNames: pets.map((p) => p.name),
        petIndex: pets.length > 0 ? 0 : -1
      });
    }).catch(() => {});
  },

  onDateChange(e) { this.setData({ date: e.detail.value }); },
  onServiceChange(e) { this.setData({ serviceIndex: Number(e.detail.value) }); },
  onGroomerChange(e) { this.setData({ groomerIndex: Number(e.detail.value) }); },
  onPetChange(e) { this.setData({ petIndex: Number(e.detail.value) }); },
  onSlotTap(e) { this.setData({ slotIndex: Number(e.currentTarget.dataset.index) }); },

  submit() {
    const { services, groomers, pets, serviceIndex, groomerIndex, petIndex, date, slots, slotIndex } = this.data;
    if (serviceIndex < 0 || groomerIndex < 0 || petIndex < 0 || slotIndex < 0) {
      wx.showToast({ title: '请完整选择', icon: 'none' });
      return;
    }
    if (this.data.submitting) return;
    this.setData({ submitting: true });
    const body = {
      petId: pets[petIndex].id,
      serviceItemId: services[serviceIndex].id,
      groomerId: groomers[groomerIndex].id,
      serviceDate: date,
      slot: slots[slotIndex],
      remark: ''
    };
    post('/grooming/orders', body)
      .then((order) => post(`/grooming/orders/${order.id}/pay`, {}))
      .then(() => {
        this.setData({ submitting: false });
        wx.showToast({ title: '预约成功', icon: 'success' });
        setTimeout(() => wx.navigateBack(), 1200);
      })
      .catch(() => this.setData({ submitting: false }));
  }
});
