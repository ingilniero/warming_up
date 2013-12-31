var App = Ember.Application.create({
  LOG_TRANSITIONS: true
});

App.ApplicationAdapter = DS.FixtureAdapter.extend({});

App.Router.map(function() {
  this.route('credits');

  this.resource('products', function() {
    this.resource('product', { path: '/:product_id' });
  });


  this.resource('contacts', function() {
    this.resource('contact', { path: '/:contact_id' });
  });
});


App.Product = DS.Model.extend({
  title: DS.attr('string'),
  image: DS.attr('string'),
  description: DS.attr('string'),
  isOnSale: DS.attr('boolean'),
  price: DS.attr('number')
});

App.Contact = DS.Model.extend({
  name: DS.attr('string'),
  about: DS.attr('string'),
  avatar: DS.attr('string')
});

App.IndexController = Ember.Controller.extend({
  productsCount: 6,
  logo: 'img/logo.png',
  time: function() {
    return (new Date).toDateString();
  }.property()
});

App.ContactsIndexController = Ember.Controller.extend({
  contactName: 'Anostagia',
  avatar: 'img/contacts/avatar.png',
  open: function() {
    return ((new Date()).getDay() == 0) ? 'Closed' : 'Open';
  }.property()
});

App.ProductsRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('product');
  }
});

App.ProductRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('product', params.product_id);
  }
});

App.ContactsRoute = Ember.Route.extend({
  model: function() {
    return App.CONTACTS;
  }
});

App.ContactRoute = Ember.Route.extend({
  model: function(params) {
    return App.CONTACTS.findBy('name', params.name);
  }
});

App.Product.FIXTURES = [
  {
    id: 1,
    title: 'Birch',
    image: 'img/products/birch.png',
    description: 'It burns well, without popping, even when frozen and freshly hewn. The bark will burn very well even when wet because of the oils it contains.',
    isOnSale: true,
    price: 10
  },
  {
    id: 2,
    title: 'Bow-drill',
    image: 'img/products/bow-drill.png',
    description: 'This is an ancient method of starting fire without matches or a lighter. It uses friction to generate heat.',
    isOnSale: true,
    price: 20
  }
];

App.Contact.FIXTURES = [
  {
    id: 1,
    name: 'Giamia',
    about: 'Although Giamia cmae form a humble spark of lightning, he quickly grew to be a great craftsman, providing  all the warming instruments needed by those close to him.',
    avatar: 'img/contacts/giamia.png'
  },
  {
    id: 2,
    name: 'Anostagia',
    about: 'Knowing there was a need for it, Anostagia drew on her experience and spearheaded the Flint & Flame storefront. In addition to coding the site, she also creates a few products available in the store.',
    avatar: 'img/contacts/anostagia.png'
  }
];
