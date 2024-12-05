import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import App from './App' // Assicurati che questo sia il percorso corretto dell'app
import books from './data/books.json' // Assicurati che il percorso a json sia corretto.

describe('EpiBooks App', () => {
  test('renders Welcome component', () => {
    render(<App />)
    const welcomeElement = screen.getByText(/welcome/i)
    expect(welcomeElement).toBeInTheDocument()
  })

  test('renders correct number of books', () => {
    render(<App />)
    const cards = screen.getAllByTestId('book-card') // Se necessario, aggiungi data-testid="book-card" ai tuoi elementi card
    expect(cards.length).toBe(books.length)
  })

  test('renders CommentArea component', () => {
    render(<App />)
    const commentAreaElement = screen.getByTestId('comment-area') // Assicurati di utilizzare data-testid="comment-area" nel tuo CommentArea
    expect(commentAreaElement).toBeInTheDocument()
  })

  test('filters books using navbar', () => {
    render(<App />)

    // Simula clic su un filtro, ad esempio "Fiction"
    const filterButton = screen.getByText(/fiction/i)
    fireEvent.click(filterButton)

    const filteredBooks = books.filter((book) => book.category === 'Fiction')
    const displayedBooks = screen.getAllByTestId('book-card')

    expect(displayedBooks.length).toBe(filteredBooks.length)
  })

  test('changes book border color on click', () => {
    render(<App />)

    const firstBook = screen.getAllByTestId('book-card')[0]
    fireEvent.click(firstBook)

    expect(firstBook).toHaveStyle('border-color: blue') // Modifica il colore in base alla tua logica

    const secondBook = screen.getAllByTestId('book-card')[1]
    fireEvent.click(secondBook)

    expect(firstBook).toHaveStyle('border-color: initial') // Cambia "initial" con lo stile di default del bordo
  })

  test('no SingleComment components when no book is clicked', () => {
    render(<App />)
    const singleCommentElements = screen.queryAllByTestId('single-comment') // usa il tuo data-testid
    expect(singleCommentElements.length).toBe(0)
  })

  test('loads comments correctly when a book with reviews is clicked', () => {
    render(<App />)

    const bookWithReviews = books.find(
      (book) => book.reviews && book.reviews.length > 0
    ) // Trova un libro con recensioni
    const bookCard = screen.getByText(bookWithReviews.title) // Supponendo che title sia il testo del tuo libro
    fireEvent.click(bookCard)

    const commentElements = screen.getAllByTestId('single-comment') // Assicurati di usare un data-testid per i commenti
    expect(commentElements.length).toBe(bookWithReviews.reviews.length)
  })
})
