const t = TrelloPowerUp.iframe();

window.printCard = async function () {
  const card = await t.card('name', 'desc', 'labels', 'checklists');

  const url = `./print.html?name=${encodeURIComponent(card.name)}&desc=${encodeURIComponent(card.desc)}&labels=${encodeURIComponent(JSON.stringify(card.labels))}`;

  t.modal({
    url: url,
    fullscreen: false,
    height: 500,
    title: 'Print Card Layout'
  });
};
