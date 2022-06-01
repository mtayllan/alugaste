import { viewBook_Stay } from 'alugaste-core/book_stays/book_stay.js'

export const getBookStay = (req,res) => {
    const book_stay = viewBook_Stay();
    res.render('book_stay/view', { book_stay })
};