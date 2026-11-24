const { get } = require('../../utils/request');

Page({
  data: {
    tasks: []
  },

  onLoad(options) {
    if (options.id) {
      get(`/care/orders/${options.id}/tasks`)
        .then((tasks) => this.setData({ tasks }))
        .catch(() => {});
    }
  }
});
