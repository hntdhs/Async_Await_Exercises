$(function() {
  let baseURL = 'https://deckofcardsapi.com/api/deck';

  // 1.
  async function part1() {
    let data = await $.getJSON(`${baseURL}/new/draw/`);
    let { suit, value } = data.cards[0];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
  }
  // data.cards[] is an object in the JSON response: {"success": true, "deck_id": "ix4k50zqs0er", "cards": [{"code": "7C", "image": "https://deckofcardsapi.com/static/img/7C.png", "images": {"svg": "https://deckofcardsapi.com/static/img/7C.svg", "png": "https://deckofcardsapi.com/static/img/7C.png"}, "value": "7", "suit": "CLUBS"}], "remaining": 51}
  part1();

  // 2.
  async function part2() {
    let firstCardData = await $.getJSON(`${baseURL}/new/draw/`);
    let deckId = firstCardData.deck_id;
    let secondCardData = await $.getJSON(`${baseURL}/${deckId}/draw/`);
    [firstCardData, secondCardData].forEach(card => {
      let { suit, value } = card.cards[0];
      console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    });
  }
  part2();

  // 3.
  async function setup() {
    let $btn = $('button');
    let $cardArea = $('#card-area');

    let deckData = await $.getJSON(`${baseURL}/new/shuffle/`);
    $btn.show().on('click', async function() {
      let cardData = await $.getJSON(`${baseURL}/${deckData.deck_id}/draw/`);
      let cardSrc = cardData.cards[0].image;
      let angle = Math.random() * 90 - 45;
      let randomX = Math.random() * 40 - 20;
      let randomY = Math.random() * 40 - 20;
      $cardArea.append(
        $('<img>', {
          src: cardSrc,
          css: {
            transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
          }
        })
      );
      if (cardData.remaining === 0) $btn.remove();
    });
  }
  setup();
});
