console.log('client.js loaded - TrelloPowerUp initialize starting');

TrelloPowerUp.initialize({
  'card-buttons': function(t) {
    console.log('card-buttons handler called');
    return [{
      icon: 'https://cialona-erik.github.io/Cialona-Card-Printer/Print-Button.svg',
      text: 'Print this card',
      condition: 'edit',
      callback: function(t) {
        console.log('Print Card button clicked');
        // Get all needed card fields
        return t.card('name', 'desc', 'cover', 'due', 'members').then(card => {
          console.log('Card data fetched:', card);

          // Get the actual cover image URL (if any)
          let coverUrl = '';
          if (card.cover && card.cover.sharedSourceUrl) {
            coverUrl = card.cover.sharedSourceUrl;
          } else if (card.cover && card.cover.url) {
            coverUrl = card.cover.url;
          }

          // Prepare due date and members for URL
          const due = card.due ? card.due : '';
          const members = (card.members && card.members.length)
            ? JSON.stringify(card.members.map(m => ({ fullName: m.fullName, avatarUrl: m.avatarUrl })))
            : '';

          const url =
            'https://cialona-erik.github.io/Cialona-Card-Printer/print.html?' +
            'name=' + encodeURIComponent(card.name) +
            '&desc=' + encodeURIComponent(card.desc) +
            (coverUrl ? '&cover=' + encodeURIComponent(coverUrl) : '') +
            (due ? '&due=' + encodeURIComponent(due) : '') +
            (members ? '&members=' + encodeURIComponent(members) : '');

          console.log('Opening modal with URL:', url);
          return t.modal({
            url,
            title: 'Print Card - Cialona - Powered by E.Zwart',
            height: 500,
            width: 880,
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
