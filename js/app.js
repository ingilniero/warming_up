var App = Ember.Application.create({
  LOG_TRANSITIONS: true
});

App.Router.map(function() {
  this.route('about', { path: '/aboutus' });
  this.route('credits');

  this.resource('products');
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

App.PRODUCTS = [
  {
    name: 'Birch',
    image: 'img/products/birch.png',
    description: 'It burns well, without popping, even when frozen and freshly hewn. The bark will burn very well even when wet because of the oils it contains.',
    price: 10
  },
  {
    name: 'Bow-drill',
    image: 'img/products/bow-drill.png',
    description: 'This is an ancient method of starting fire without matches or a lighter. It uses friction to generate heat.',
    price: 20
  }
];
