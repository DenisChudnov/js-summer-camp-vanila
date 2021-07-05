import {db} from '../firebaseSettings';
import {Film} from '../../utils/models/film.js'

/**
 *
 */
export async function getFilms(sortingByField = 'pk', sortingOrder = 'asc', limit = 3, pageNumber = 1) {
    let gettedFilmList = [];
    let startPosition = (pageNumber - 1) * limit;
    sortingByField = changeOrderByFieldNameToValid(sortingByField);
    await db.collection('films')
        .orderBy(sortingByField, sortingOrder)
        .limit(limit)
        .startAfter(startPosition)
        .get()
        .then((snapshot) => {
            snapshot.docs.forEach(item => {
                if (item) {
                    let film = castToFilmClass(item.data());
                    gettedFilmList.push(film);
                }
            });
        }).catch((error) => {
            console.log('there are error  ' + error);
            gettedFilmList = null;
        });
    return gettedFilmList;
}

/**
 *
 */
function changeOrderByFieldNameToValid(fieldName) {
    if (fieldName != 'pk') {
        fieldName = 'fields.' + fieldName;
    }
    return fieldName;
}

/**
 *
 */
function castToFilmClass(dataToCast) {
    let data = dataToCast.fields;
    data.pk = dataToCast.pk;
    return new Film(data);
}
