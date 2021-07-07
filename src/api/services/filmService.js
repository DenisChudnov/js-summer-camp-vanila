import {Film} from '../../utils/models/film.js';
import {filmsRef} from "../firebaseSettings";

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

    let result = await makeRequestToAPI(query);
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
function castToFilmClass(dataToCast) {
    let data = dataToCast.fields;
    data.pk = dataToCast.pk;
    return new Film(data);
}

/**
 *
 * @param sortingField
 * @param sortingOrder
 * @param limit
 * @param page
 * @param firstValueOnPage
 * @param lastValueOnPage
 * @return {Promise<boolean>}
 */
export async function isNextPageExist(sortingField = 'pk', sortingOrder = 'asc', limit = 3, page = 1, firstValueOnPage, lastValueOnPage){
    let nextPageContent = await getFilms(sortingField, sortingOrder,limit,(page),'next', firstValueOnPage,lastValueOnPage);
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
 * @param page
 * @param firstValueOnPage
 * @param lastValueOnPage
 * @return {Promise<boolean>}
 */
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
   let query = filmsRef
       .where('fields.title', '>=', value)
       .where('fields.title','<=',value+'\uf8ff')
       .limit(limit);

    let result = await makeRequestToAPI(query);
    return result;
}

/**
 *
 * @param query
 * @return {Promise<*[]>}
 */
async function makeRequestToAPI(query){
    let filmListFromAPI = [];
    await query
        .get()
        .then((snapshot) => {
            snapshot.docs.forEach(item => {
                if (item) {
                    let film = castToFilmClass(item.data());
                    filmListFromAPI.push(film);
                }
            });
            if (filmListFromAPI.length == 0){
                filmListFromAPI = null;
            }
        }).catch((error) => {
            console.log('there are error  ' + error);
            filmListFromAPI = null;
        });
    return filmListFromAPI;
}

/**
 *
 * @param primaryKey
 * @return {Promise<*>}
 */
export async function getCurrentFilm(primaryKey){
    let query = filmsRef
        .where('pk','==',primaryKey);
    let result = await makeRequestToAPI(query);
    return result[0];
}






export async function queryBuilder(params){
    console.log('params: ')
    console.log(params)
    let query = filmsRef
        .orderBy(changeOrderByFieldNameToValid(params.sortingField), params.sortingOrder);

    if(params.filterValue != ''){
        query = query
            .where(changeOrderByFieldNameToValid(params.sortingField), '>=', params.filterValue)
            .where(changeOrderByFieldNameToValid(params.sortingField),'<=',params.filterValue+'\uf8ff')
    }

    if(params.paginateDirection == 'current'){
        query = query
            .limit(params.limit)
    }

    if(params.paginateDirection == 'next'){
        query = query.startAfter(params.lastValueOnPage)
            .limit(params.limit)
    }

    if (params.paginateDirection == 'prev'){
        query = query.endBefore(params.firstValueOnPage)
            .limitToLast(params.limit)
    }
    let result = await makeRequestToAPI(query);
    return result;

}

export async function newCheckNextPageExist(params){
    params.paginateDirection = 'next';
    let nextPageContent = await queryBuilder(params);
    if(!nextPageContent || nextPageContent.length == 0){
        return false
    }
    return true
}

export async function newCheckPrevPageExist(params){
    params.paginateDirection = 'prev';
    let prevPageContent = await queryBuilder(params);
    if(!prevPageContent || prevPageContent.length == 0){
        return false
    }
    return true
}
