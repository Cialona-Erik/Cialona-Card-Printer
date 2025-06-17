TrelloPowerUp.initialize({
  'card-buttons': function(t, opts) {
    return [{
      icon: 'https://cdn-icons-png.flaticon.com/512/1159/1159633.png',
      text: 'Print Card',
      callback: function(t) {
        return t.card('name', 'desc', 'labels', 'checklists')
          .then(card => {
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

// Expose for index.html button, too
window.printCard = function() {
  const t = TrelloPowerUp.iframe();
  t.card('name', 'desc', 'labels', 'checklists')
    .then(card => {
      const url = `./print.html?name=${encodeURIComponent(card.name)}&desc=${encodeURIComponent(card.desc)}&labels=${encodeURIComponent(JSON.stringify(card.labels))}`;
      t.modal({ url, fullscreen: false, height: 500, title: 'Print Card' });
    });
};