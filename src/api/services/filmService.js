import {Film} from '../../utils/models/film.js';
import {filmsRef} from "../firebaseSettings";
import {getRequestToAPI} from "../firestoreCommunication";

/**
 * Function for make GET films query to API.
 * Actualy - is query constructor, which create query with parameters.
 * retunr list of films, getted by parameters.
 * @param sortingByField string
 * @param sortingOrder string
 * @param limit int
 * @param direction string
 * @param endBeforeValue film field value (string)
 * @param startAfterValue film field value (string)
 * @param filterValue string
 * @return {Promise<*[]>}
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
    if(filterValue!==''){
        sortingByField = 'title';
        sortingOrder = 'asc';
    }
    sortingByField = changeOrderByFieldNameToValid(sortingByField);
    let query = filmsRef
        .orderBy(sortingByField, sortingOrder);

    if(filterValue!==''){
        query = query
        .where('fields.title', '>=', filterValue)
        .where('fields.title','<=',filterValue+'\uf8ff')
    }

    if(direction === 'current'){
        query = query.limit(limit)
    }

    if(direction === 'next'){
        query = query.startAfter(startAfterValue)
            .limit(limit)
    }

    if (direction === 'prev'){
        query = query.endBefore(endBeforeValue)
            .limitToLast(limit)
    }

    return await getRequestToAPI(query, 'film');
}


/**
 * Simple function to make field names, getted from ui
 * valid for db query.
 * @param fieldName
 * @return {string}
 */
function changeOrderByFieldNameToValid(fieldName) {
    if (fieldName !== 'pk') {
        fieldName = `fields.${fieldName}`;
    }
    return fieldName;
}

/**
 * Simple function for transform every document, getted from API
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
 * Function for check if next page is existing. Return true or false
 * @param sortingField
 * @param sortingOrder
 * @param limit
 * @param firstValueOnPage
 * @param lastValueOnPage
 * @return {Promise<boolean>}
 */
export async function isNextPageExist(sortingField = 'pk', sortingOrder = 'asc', limit = 3,  firstValueOnPage, lastValueOnPage){
    const nextPageContent = await getFilmsQueryBuilder(sortingField, sortingOrder,limit,'next', firstValueOnPage,lastValueOnPage);
    if(!nextPageContent || nextPageContent.length == 0){
        return false
    }
    return true
}

/**
 * Function for check, if previous page is exist. return true or false
 * @param sortingField
 * @param sortingOrder
 * @param limit
 * @param firstValueOnPage
 * @param lastValueOnPage
 * @return {Promise<boolean>}
 */
export async function isPreviousPageExist(sortingField = 'pk', sortingOrder = 'asc', limit = 3,  firstValueOnPage, lastValueOnPage){
    const previousPageContent = await getFilmsQueryBuilder(sortingField, sortingOrder, limit, 'prev', firstValueOnPage, lastValueOnPage)
    if(!previousPageContent || previousPageContent.length == 0){
        return false;
    }
    return true;
}

/**
 * Function for get current film by primary key from API;
 * @param primaryKey
 * @return {Promise<*>}
 */
export async function getCurrentFilm(primaryKey){
    const query = filmsRef
        .where('pk','==',primaryKey);
    const result = await getRequestToAPI(query,'film');
    return result[0];
}

