var App = Ember.Application.create({
  LOG_TRANSITIONS: true
});

App.Router.map(function() {
  this.route('about', { path: '/aboutus' });
  this.route('credits');

  this.resource('products');
  this.resource('product', { path: '/products/:title' });
});

App.IndexController = Ember.Controller.extend({
  productsCount: 6,
  logo: 'img/logo.png',
  time: function() {
    return (new Date).toDateString();
  }.property()
});

App.ProductsRoute = Ember.Route.extend({
  model: function() {
    return App.PRODUCTS;
  }
});

App.ProductRoute = Ember.Route.extend({
  model: function(params) {
    return App.PRODUCTS.findBy('title', params.title);
  }
});

App.PRODUCTS = [
  {
    title: 'Birch',
    image: 'img/products/birch.png',
    description: 'It burns well, without popping, even when frozen and freshly hewn. The bark will burn very well even when wet because of the oils it contains.',
    price: 10
  },
  {
    title: 'Bow-drill',
    image: 'img/products/bow-drill.png',
    description: 'This is an ancient method of starting fire without matches or a lighter. It uses friction to generate heat.',
    price: 20
  }
];
