import Ember from 'ember';

var TestHelpers = Ember.Object.extend({
  responseHash: function() {
    var page = this.pageFromRequest(this.request);
    var k = "" + this.name + "s";

    var res = {};
    res[k] = this.objsForPage(page);
    res.meta = {total_pages: this.totalPages()};

    return res;
  },

  objsForPage: function(page) {
    var perPage = this.perPageFromRequest(this.request);
    var s = (page - 1) * perPage;
    var e = s + 1;
    return this.all.slice(s,e+1);
  },

  pageFromRequest: function(request) {
    var res = request.queryParams.page;
    return parseInt(res);
  },

  perPageFromRequest: function(request) {
    var res = request.queryParams.per_page;
    return parseInt(res);
  },
  totalPages: function() {
    var perPage = this.perPageFromRequest(this.request);
    return parseInt((parseFloat(this.all.length) + parseFloat(perPage) - 0.01) / parseFloat(perPage));
  }
});

TestHelpers.reopenClass({
  responseHash: function(request, all, name) {
    return this.create({
      request: request,
      all: all,
      name: name
    }).responseHash();
  }
});

export default TestHelpers;
