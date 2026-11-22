const { get, post, put } = require('../../utils/request');

Page({
  data: {
    id: null,
    form: {
      name: '',
      species: '犬',
      breed: '',
      gender: 1,
      weight: '',
      birthDate: '',
      vaccineExpireDate: '',
      allergyNote: ''
    },
    speciesOptions: ['犬', '猫', '其他'],
    speciesIndex: 0,
    genderOptions: ['公', '母', '未知'],
    genderIndex: 0,
    saving: false
  },

  onLoad(options) {
    if (options.id) {
      this.setData({ id: options.id });
      wx.setNavigationBarTitle({ title: '编辑宠物' });
      get(`/pets/${options.id}`)
        .then((pet) => {
          const form = { ...this.data.form, ...pet };
          this.setData({
            form,
            speciesIndex: this.data.speciesOptions.indexOf(pet.species) >= 0
              ? this.data.speciesOptions.indexOf(pet.species) : 0,
            genderIndex: this.data.genderOptions.indexOf(this.genderLabel(pet.gender)) >= 0
              ? this.data.genderOptions.indexOf(this.genderLabel(pet.gender)) : 0
          });
        })
        .catch(() => {});
    }
  },

  genderLabel(g) {
    if (g === 1) return '公';
    if (g === 2) return '母';
    return '未知';
  },

  onInput(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({ [`form.${field}`]: e.detail.value });
  },

  onSpecies(e) {
    const i = Number(e.detail.value);
    this.setData({ speciesIndex: i, 'form.species': this.data.speciesOptions[i] });
  },

  onGender(e) {
    const i = Number(e.detail.value);
    const map = [1, 2, 0];
    this.setData({ genderIndex: i, 'form.gender': map[i] });
  },

  onSave() {
    const { form, id } = this.data;
    if (!form.name) {
      wx.showToast({ title: '请填写宠物名', icon: 'none' });
      return;
    }
    this.setData({ saving: true });
    const payload = {
      name: form.name,
      species: form.species,
      breed: form.breed,
      gender: form.gender,
      weight: form.weight ? Number(form.weight) : null,
      birthDate: form.birthDate || null,
      vaccineExpireDate: form.vaccineExpireDate || null,
      allergyNote: form.allergyNote
    };
    const req = id ? put(`/pets/${id}`, payload) : post('/pets', payload);
    req
      .then(() => {
        wx.showToast({ title: '保存成功', icon: 'success' });
        setTimeout(() => wx.navigateBack(), 600);
      })
      .catch(() => {})
      .finally(() => this.setData({ saving: false }));
  }
});
