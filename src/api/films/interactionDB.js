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
    direction = 'next',
    endBeforeValue = '',
    startAfterValue = '') {
    let gettedFilmList = [];
    let startPosition = (pageNumber - 1) * limit;
    sortingByField = changeOrderByFieldNameToValid(sortingByField);
    let query = db.collection('films')
        .orderBy(sortingByField, sortingOrder);
    if(direction == 'next' && sortingOrder == 'asc'){
        query = query.startAfter(startPosition)
            .limit(limit)
    } else if (direction == 'prev' && sortingOrder == 'asc'){
        query = query.endAt(startPosition)
            .limit(limit)
    } else if (direction == 'next' && sortingOrder == 'desc'){
        console.log('start pos: '+startPosition);
        console.log('st aft'+startAfterValue)
        console.log('end bfr'+endBeforeValue)
        query = query
            .startAfter(startAfterValue)
            .limit(limit)
    } else if (direction == 'prev' && sortingOrder == 'desc'){
        query = query
            .endBefore(endBeforeValue)
            .limit(limit)
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


    // await db.collection('films')
    //     .orderBy(sortingByField, sortingOrder)
    //     .limit(limit)
    //     .startAfter(startPosition)
    //     .get()
    //     .then((snapshot) => {
    //         snapshot.docs.forEach(item => {
    //             if (item) {
    //                 let film = castToFilmClass(item.data());
    //                 gettedFilmList.push(film);
    //             }
    //         });
    //         if (gettedFilmList.length == 0){
    //             gettedFilmList = null;
    //         }
    //     }).catch((error) => {
    //         console.log('there are error  ' + error);
    //         gettedFilmList = null;
    //     });
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

export async function isNextPageExist(sortingField = 'pk', sortingOrder = 'asc', limit = 3, page = 1){

    let nextPageContent = await getFilms(sortingField, sortingOrder,limit,(page+1),'next');
    if(!nextPageContent || nextPageContent.length == 0){
        return false
    }
    console.log('get from next page');
    console.log(nextPageContent);
    console.log('====================')
    return true
}

export async function isPreviousPageExist(sortingField = 'pk', sortingOrder = 'asc', limit = 3, page = 1){
    if(page<=0){
        return false
    }

    let previousPageContent = await getFilms(sortingField, sortingOrder, limit, (page), 'prev')
    if(!previousPageContent || previousPageContent.length == 0){
        return false;
    }
    console.log('get from prev page exist')
    console.log(previousPageContent)
    console.log('============================')
    return true;

}

