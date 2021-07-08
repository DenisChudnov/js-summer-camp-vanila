import {Film} from '../../utils/models/film.js';
import {filmsRef} from "../firebaseSettings";
import {getRequestToAPI} from "../firestoreCommunication";

/**
 *
 */
export async function getFilmsQueryBuilder(
    sortingByField = 'pk',
    sortingOrder = 'asc',
    limit = 3,
    direction = 'current',
    endBeforeValue = '',
    startAfterValue = '',
    filterValue = ''
    ) {
    if(filterValue!=''){
        sortingByField = 'title';
        sortingOrder = 'asc';
    }
    sortingByField = changeOrderByFieldNameToValid(sortingByField);
    let query = filmsRef
        .orderBy(sortingByField, sortingOrder);

    if(filterValue!=''){
        query = query
        .where('fields.title', '>=', filterValue)
        .where('fields.title','<=',filterValue+'\uf8ff')
    }

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

    let result = await getRequestToAPI(query,'film');
    return result;
}


/**
 * simple function to make field names, getted from ui
 * valid for db query.
 * @param fieldName
 * @return {string}
 */
function changeOrderByFieldNameToValid(fieldName) {
    if (fieldName != 'pk') {
        fieldName = 'fields.' + fieldName;
    }
    return fieldName;
}

/**
 * simple function for transform every document, getted from API
 * to frontend Film class object
 * @param dataToCast
 * @return {Film}
 */
export function castToFilmClass(dataToCast) {
    let data = dataToCast.fields;
    data.pk = dataToCast.pk;
    return new Film(data);
}

/**
 *
 * @param sortingField
 * @param sortingOrder
 * @param limit
 * @param firstValueOnPage
 * @param lastValueOnPage
 * @return {Promise<boolean>}
 */
export async function isNextPageExist(sortingField = 'pk', sortingOrder = 'asc', limit = 3,  firstValueOnPage, lastValueOnPage){
    let nextPageContent = await getFilmsQueryBuilder(sortingField, sortingOrder,limit,'next', firstValueOnPage,lastValueOnPage);
    if(!nextPageContent || nextPageContent.length == 0){
        return false
    }
    return true
}

/**
 *
 * @param sortingField
 * @param sortingOrder
 * @param limit
 * @param firstValueOnPage
 * @param lastValueOnPage
 * @return {Promise<boolean>}
 */
export async function isPreviousPageExist(sortingField = 'pk', sortingOrder = 'asc', limit = 3,  firstValueOnPage, lastValueOnPage){
    let previousPageContent = await getFilmsQueryBuilder(sortingField, sortingOrder, limit, 'prev', firstValueOnPage, lastValueOnPage)
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
   let query = filmsRef
       .where('fields.title', '>=', value)
       .where('fields.title','<=',value+'\uf8ff')
       .limit(limit);

    let result = await getRequestToAPI(query, 'film');
    return result;
}


/**
 *
 * @param primaryKey
 * @return {Promise<*>}
 */
export async function getCurrentFilm(primaryKey){
    let query = filmsRef
        .where('pk','==',primaryKey);
    let result = await getRequestToAPI(query,'film');
    return result[0];
}

