TrelloPowerUp.initialize({
  'card-buttons': function(t) {
    return [{
      icon: 'https://cialona-erik.github.io/Cialona-Card-Printer/printer-small.png', // Consider using SVG for better theming
      text: 'Print Card',
      condition: 'edit', // Show button only to users who can edit the board
      callback: function(t) {
        return t.card('name', 'desc').then(card => {
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
