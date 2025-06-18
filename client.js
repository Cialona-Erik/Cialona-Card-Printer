console.log('client.js loaded - TrelloPowerUp initialize starting');

// Extract the print callback as a named function for manifest binding
function printCard(t) {
  console.log('Print Card button clicked');
  return t.card('name', 'desc', 'cover', 'due', 'members').then(card => {
    console.log('Card data fetched:', card);

    let coverUrl = '';
    if (card.cover && card.cover.sharedSourceUrl) {
      coverUrl = card.cover.sharedSourceUrl;
    } else if (card.cover && card.cover.url) {
      coverUrl = card.cover.url;
    }

    const due = card.due ? card.due : '';
    const members = (card.members && card.members.length)
      ? JSON.stringify(card.members.map(m => ({
          fullName: m.fullName,
          avatarUrl: m.avatarUrl
        })))
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
      title: 'Print this Card - Powered by E.Zwart',
      height: 500,
      width: 880,
      fullscreen: false
    });
  });
}

// Main Power-Up initializer
TrelloPowerUp.initialize({
  'card-buttons': function(t) {
    console.log('card-buttons handler called');
    return [{
      icon: 'https://cialona-erik.github.io/Cialona-Card-Printer/Print-Button.svg',
      text: 'Print this card',
      condition: 'edit',
      callback: printCard
    }];
  },

  'printCard': printCard,
'card-back-section': function(t) {
  return t.signUrl('https://cialona-erik.github.io/Cialona-Card-Printer/print-button.html?signed').then(signedUrl => ({
    title: 'Print this Card - Powered by E.Zwart',
    icon: 'https://cialona-erik.github.io/Cialona-Card-Printer/Print-Button.svg',
    content: {
      type: 'iframe',
      url: signedUrl,
      height: 60
    }
  }));
}
  
});
