// Load Trello Power-Up functionality
const t = TrelloPowerUp.iframe();

// This function is used when the iframe (index.html) has a button that calls window.printCard()
window.printCard = function () {
  return t.card('name', 'desc', 'labels', 'checklists').then(function (card) {
    const url = `https://cialona-erik.github.io/Cialona-Card-Printer/print.html?name=${encodeURIComponent(card.name)}&desc=${encodeURIComponent(card.desc)}&labels=${encodeURIComponent(JSON.stringify(card.labels))}`;
    return t.modal({
      url: url,
      fullscreen: false,
      height: 500,
      title: 'Print Card'
    });
  });
};

// Register the Power-Up capabilities — this is required!
TrelloPowerUp.initialize({
  'card-buttons': function (t) {
    return [{
      icon: 'https://cialona-erik.github.io/Cialona-Card-Printer/printer.png',
      text: 'Print Card',
      callback: function (t) {
        return t.card('name', 'desc', 'labels', 'checklists').then(function (card) {
          const url = `https://cialona-erik.github.io/Cialona-Card-Printer/print.html?name=${encodeURIComponent(card.name)}&desc=${encodeURIComponent(card.desc)}&labels=${encodeURIComponent(JSON.stringify(card.labels))}`;
          return t.modal({
            url: url,
            fullscreen: false,
            height: 500,
            title: 'Print Card'
          });
        });
      }
    }];
  },
  'card-back-section': function (t) {
    return {
      title: 'Card Tools',
      icon: 'https://cialona-erik.github.io/Cialona-Card-Printer/printer.png',
      content: {
        type: 'iframe',
        url: 'https://cialona-erik.github.io/Cialona-Card-Printer/index.html',
        height: 50
      }
    };
  }
});
