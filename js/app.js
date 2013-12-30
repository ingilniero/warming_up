var App = Ember.Application.create({
  LOG_TRANSITIONS: true
});

App.Router.map(function() {
  this.route('about', { path: '/aboutus' });
  this.route('credits');

  this.resource('products', function() {
    this.resource('product', { path: '/:title' });
  });
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

App.CONTACTS = [
  {
    name: 'Giamia',
    about: 'Although Giamia cmae form a humble spark of lightning, he quickly grew to be a great craftsman, providing  all the warming instruments needed by those close to him.',
    avatar: 'img/contacts/giamia.png'
  },
  {
    name: 'Anostagia',
    about: 'Knowing there was a need for it, Anostagia drew on her experience and spearheaded the Flint & Flame storefront. In addition to coding the site, she also creates a few products available in the store.',
    avatar: 'img/contacts/anostagia.png'
  }
];
