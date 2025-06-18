console.log('client.js loaded - TrelloPowerUp initialize starting');

TrelloPowerUp.initialize({
  'card-buttons': function(t) {
    console.log('card-buttons handler called');
    return [{
      icon: 'https://cialona-erik.github.io/Cialona-Card-Printer/printer-small.png',
      text: 'Print Card',
      condition: 'edit',
      callback: function(t) {
        console.log('Print Card button clicked');
        // Get all needed card fields
        return t.card('name', 'desc', 'cover', 'idMembers', 'due').then(card => {
          console.log('Card data fetched:', card);

          // Get the actual cover image URL (if any)
          let coverUrl = '';
          if (card.cover && card.cover.sharedSourceUrl) {
            coverUrl = card.cover.sharedSourceUrl;
          } else if (card.cover && card.cover.url) {
            coverUrl = card.cover.url;
          }

          // Now, get the members info by IDs
          return t.members('id', 'fullName', 'avatarUrl').then(members => {
            // Only include members that are assigned to this card
            const cardMembers = members.filter(m => (card.idMembers || []).includes(m.id));
            const url =
              'https://cialona-erik.github.io/Cialona-Card-Printer/print.html?' +
              'name=' + encodeURIComponent(card.name) +
              '&desc=' + encodeURIComponent(card.desc) +
              (coverUrl ? '&cover=' + encodeURIComponent(coverUrl) : '') +
              (card.due ? '&due=' + encodeURIComponent(card.due) : '') +
              '&members=' + encodeURIComponent(JSON.stringify(cardMembers));

            console.log('Opening modal with URL:', url);
            return t.modal({
              url,
              title: 'Print Card',
              height: 500,
              width: 880,
              fullscreen: false
            });
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
