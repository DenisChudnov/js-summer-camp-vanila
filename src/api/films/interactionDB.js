import {db} from '../firebaseSettings';
import {Film} from '../../utils/models/film.js'

/**
 *
 */
export async function getFilms(
    sortingByField = 'pk',
    sortingOrder = 'asc',
    limit = 3,
    pageNumber = 1,
    direction = 'current',
    endBeforeValue = '',
    startAfterValue = '') {
    let gettedFilmList = [];
    let startPosition = (pageNumber - 1) * limit;
    sortingByField = changeOrderByFieldNameToValid(sortingByField);
    let query = db.collection('films')
        .orderBy(sortingByField, sortingOrder);
    if(direction == 'current'){
        query = query.limit(limit)
    }
    if(direction == 'next'){
        query = query.startAfter(startAfterValue)
            .limit(limit)
    }
    if (direction == 'prev'){
        query = query.endBefore(endBeforeValue)
            .limitToLast(limit)
    }
    await query
        .get()
        .then((snapshot) => {
            snapshot.docs.forEach(item => {
                if (item) {
                    let film = castToFilmClass(item.data());
                    gettedFilmList.push(film);
                }
            });
            if (gettedFilmList.length == 0){
                gettedFilmList = null;
            }
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

export async function isNextPageExist(sortingField = 'pk', sortingOrder = 'asc', limit = 3, page = 1, firstValueOnPage, lastValueOnPage){
    let nextPageContent = await getFilms(sortingField, sortingOrder,limit,(page),'next', firstValueOnPage,lastValueOnPage);
    if(!nextPageContent || nextPageContent.length == 0){
        return false
    }
    return true
}

export async function isPreviousPageExist(sortingField = 'pk', sortingOrder = 'asc', limit = 3, page = 1, firstValueOnPage, lastValueOnPage){
    if(page<=0){
        return false
    }
    let previousPageContent = await getFilms(sortingField, sortingOrder, limit, (page), 'prev', firstValueOnPage, lastValueOnPage)
    if(!previousPageContent || previousPageContent.length == 0){
        return false;
    }
    return true;
}

/**
 *
 * @param value
 * @param limit
 * @return {Promise<void>}
 */
export async function searchByTitle(value, limit){
   let query = db.collection('films')
       .where('fields.title', '>=', value)
       .where('fields.title','<=',value+'\uf8ff')

       .limit(limit);

   let gettedFilmList = [];

   await query.get()
       .then((snapshot) => {
           snapshot.docs.forEach(item => {
               if (item) {
                   let film = castToFilmClass(item.data());
                   gettedFilmList.push(film);
                   console.log(item.data().fields.title);
               }
           });
           if (gettedFilmList.length == 0){
               gettedFilmList = null;
           }
       }).catch((error) => {
           console.log('there are error  ' + error);
           gettedFilmList = null;
       });
   return gettedFilmList;

}
