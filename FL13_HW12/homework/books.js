(function () {
  const BOOKS_STORAGE_KEY = 'books';
  if (!localStorage.getItem(BOOKS_STORAGE_KEY)) {
    const books = [
      {
        id: '1',
        name: 'The History of the Ancient World',
        author: 'Susan Wise Bauer',
        url: 'https://icdn5.themanual.com/image/themanual/' +
          'the-history-of-the-ancient-world-by-susan-wise-bauer-book-768x768.jpg',
        plot: 'Guides readers on a fast-paced yet thorough tour of the ancient worlds of Sumer, Egypt, India, China'
      },
      {
        id: '2',
        name: 'Guns, Germs, and Steel',
        author: 'Jared Diamond',
        url: 'https://icdn5.themanual.com/image/themanual/guns-germs-and-steel-by-jared-diamond-book-768x768.jpg',
        plot: 'The Fate of Human Societies isn’t the history of one particular place, people, or period'
      },
      {
        id: '3',
        name: 'A World Lit Only by Fire',
        author: 'William Manchester',
        url: 'https://icdn6.themanual.com/image/themanual/' +
          'a-world-lit-only-by-fire-by-william-manchester-book-768x768.jpg',
        plot: 'The book spans from the collapse of Rome through the Dark Ages'
      }
    ];
    localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(books));
  }
})()
