import { viewMy_Stays } from 'alugaste-core/my_stays/my_stays.js'

export const getMyStays = (req,res) => {
    const my_stays = viewMy_Stays();
    res.render('my_stays/view', { my_stays })
};