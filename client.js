console.log('client.js loaded - TrelloPowerUp initialize starting');

TrelloPowerUp.initialize({
  'card-buttons': function(t) {
    return [{
      icon: 'https://cialona-erik.github.io/Cialona-Card-Printer/printer-small.png',
      text: 'Print Card',
      condition: 'edit',
      callback: function(t) {
        // Only allowed fields!
        return t.card('id', 'name', 'desc', 'due', 'idMembers', 'cover')
        .then(function(card) {
          // Get all board members
          return t.members('id', 'fullName', 'avatarUrl').then(function(members) {
            // Match card's member IDs to member objects
            const memberData = (card.idMembers || []).map(id =>
              members.find(m => m.id === id)
            ).filter(Boolean);

            // Get the actual cover image URL (if any)
            let coverUrl = '';
            if (card.cover && card.cover.sharedSourceUrl) {
              coverUrl = card.cover.sharedSourceUrl;
            } else if (card.cover && card.cover.url) {
              coverUrl = card.cover.url;
            }

            // Compose URL with due date and members as JSON
            const url =
              'https://cialona-erik.github.io/Cialona-Card-Printer/print.html?' +
              'name=' + encodeURIComponent(card.name) +
              '&desc=' + encodeURIComponent(card.desc) +
              (coverUrl ? '&cover=' + encodeURIComponent(coverUrl) : '') +
              (card.due ? '&due=' + encodeURIComponent(card.due) : '') +
              (memberData.length ? '&members=' + encodeURIComponent(JSON.stringify(memberData)) : '');

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
