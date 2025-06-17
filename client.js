TrelloPowerUp.initialize({
  'card-buttons': function(t) {
    return [{
      icon: 'https://github.com/Cialona-Erik/Trello-Pretty-Card-Printer/blob/main/printer.png?raw=true',
      text: 'Print Card',
      callback: function(t) {
        return t.card('name', 'desc', 'labels', 'checklists').then(function(card) {
          const url = `./print.html?name=${encodeURIComponent(card.name)}&desc=${encodeURIComponent(card.desc)}&labels=${encodeURIComponent(JSON.stringify(card.labels))}`;
          return t.modal({
            url: url,
            fullscreen: false,
            height: 500,
            title: 'Print Card'
          });
        });
      }
    }];
  }
});
