TrelloPowerUp.initialize({
  'card-buttons': function (t) {
    return [{
      icon: 'https://super-moxie-650636.netlify.app/printer-small.png',
      text: 'Print Card',
      callback: function (t) {
        return t.card('name', 'desc', 'labels', 'checklists').then(function (card) {
          const url = `https://super-moxie-650636.netlify.app/print.html?name=${encodeURIComponent(card.name)}&desc=${encodeURIComponent(card.desc)}&labels=${encodeURIComponent(JSON.stringify(card.labels))}`;
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
      icon: 'https://super-moxie-650636.netlify.app/printer-small.png',
      content: {
        type: 'iframe',
        url: 'https://super-moxie-650636.netlify.app/index.html',
        height: 50
      }
    };
  }
});

window.printCard = function () {
  return TrelloPowerUp.iframe().then(t => {
    return t.card('name', 'desc', 'labels', 'checklists')
      .then(function (card) {
        const url = `https://super-moxie-650636.netlify.app/print.html?name=${encodeURIComponent(card.name)}&desc=${encodeURIComponent(card.desc)}&labels=${encodeURIComponent(JSON.stringify(card.labels))}`;
        return t.modal({ url, fullscreen: false, height: 500, title: 'Print Card' });
      });
  });
};
