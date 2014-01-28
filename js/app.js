var App = Ember.Application.create({
  LOG_TRANSITIONS: true
});

App.ApplicationAdapter = DS.FixtureAdapter.extend({});

App.Router.map(function() {
  this.route('credits');

  this.resource('products', function() {
    this.resource('product', { path: '/:product_id' });
    this.route('onsale');
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
  price: DS.attr('number'),
  reviews: DS.hasMany('review', { async: true }),
  crafter: DS.belongsTo('contact', { async: true })
});

App.Contact = DS.Model.extend({
  name: DS.attr('string'),
  about: DS.attr('string'),
  avatar: DS.attr('string'),
  products: DS.hasMany('product', { async: true })
});


App.Review = DS.Model.extend({
  text: DS.attr('string'),
  reviewedAt: DS.attr('date'),
  product: DS.belongsTo('product')
});

App.IndexController = Ember.ArrayController.extend({
  onSale: function() {
    return this.filterBy('isOnSale').slice(0,1);
  }.property('@each.isOnSale')
});

App.ContactsIndexController = Ember.ObjectController.extend({
  contactName: Ember.computed.alias('name'),
  avatar: 'img/contacts/avatar.png',
  open: function() {
    return ((new Date()).getDay() == 0) ? 'Closed' : 'Open';
  }.property()
});

App.ProductsController = Ember.ArrayController.extend({
  sortProperties: ['title'],
  sortAscending: false
});

App.ProductsIndexController = Ember.ArrayController.extend({
  deals: function() {
    return this.filter(function(product) {
      return product.get('price') <= 10;
    });
  }.property('@each.price')
});

App.ContactsIndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('contact', 2)
  }
})

App.ProductsIndexRoute = Ember.Route.extend({
  model: function(){
    return this.store.findAll('product');
  }
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
    return this.store.findAll('contact');
  }
});

App.ContactRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('contact', params.contact_id);
  }
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('product');
  }
});

App.ProductsOnsaleRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('products').filterBy('isOnSale');
  }
});

App.Product.FIXTURES = [
  {
    id: 1,
    title: 'Birch',
    image: 'img/products/birch.png',
    description: 'It burns well, without popping, even when frozen and freshly hewn. The bark will burn very well even when wet because of the oils it contains.',
    isOnSale: true,
    price: 10,
    reviews: [100, 101],
    crafter: 1
  },
  {
    id: 2,
    title: 'Bow-drill',
    image: 'img/products/bow-drill.png',
    description: 'This is an ancient method of starting fire without matches or a lighter. It uses friction to generate heat.',
    isOnSale: true,
    price: 20,
    reviews:[],
    crafter: 2
  },
  {
    id: 3,
    title: 'Flint',
    image: 'img/products/flint.png',
    description: 'When struck against steel, a flint edge will produce sparks. The hard flint edge shaves off a particle of the steel that exposes iron which reacts with oxygen from the atmosphere and can ignite the proper tinder.',
    isOnSale: false,
    price: 40,
    reviews: [],
    crafter: 1
  }
];


App.Review.FIXTURES = [
  {
    id: 100,
    text: 'Nice product',
    reviewedAt: new Date(),
    product: 1
  },
  {
    id: 101,
    text: 'Good one',
    reviewedAt: new Date(),
    product: 1
  }
];

App.Contact.FIXTURES = [
  {
    id: 1,
    name: 'Giamia',
    about: 'Although Giamia cmae form a humble spark of lightning, he quickly grew to be a great craftsman, providing  all the warming instruments needed by those close to him.',
    avatar: 'img/contacts/giamia.png',
    products: [1]
  },
  {
    id: 2,
    name: 'Anostagia',
    about: 'Knowing there was a need for it, Anostagia drew on her experience and spearheaded the Flint & Flame storefront. In addition to coding the site, she also creates a few products available in the store.',
    avatar: 'img/contacts/anostagia.png',
    products: [2]
  }
];
