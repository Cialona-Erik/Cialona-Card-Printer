console.log('client.js loaded - TrelloPowerUp initialize starting');
console.log('client.js loaded (initialize)');

TrelloPowerUp.initialize({
  'card-buttons': function(t) {
    console.log('card-buttons handler called');
    return [{
      icon: 'https://cialona-erik.github.io/Cialona-Card-Printer/printer-small.png',
      text: 'Print Card',
      condition: 'edit',
      callback: function(t) {
        console.log('Print Card button clicked');
        return t.card('name', 'desc').then(card => {
          console.log('Card data fetched:', card);
          const url = `https://cialona-erik.github.io/Cialona-Card-Printer/print.html?name=${encodeURIComponent(card.name)}&desc=${encodeURIComponent(card.desc)}`;
          return t.modal({
            url: url,
            title: 'Print Card',
            height: 500,
            fullscreen: false
          });
        });
      }
    }];
  },

  'card-back-section': function(t) {
    console.log('card-back-section handler called');
    return {
      title: 'Card Tools',
      icon: 'https://cialona-erik.github.io/Cialona-Card-Printer/printer-small.png',
      content: {
        type: 'iframe',
        url: 'https://cialona-erik.github.io/Cialona-Card-Printer/index.html',
        height: 50
      }
    };
  }
});
