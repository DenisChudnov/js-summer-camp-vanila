import {Film} from '../../utils/models/film.js';
import {filmsRef} from '../firebaseSettings';
import {getRequestToAPI} from '../firestoreCommunication';

/**
 * Function for make GET films query to API.
 * Actualy - is query constructor, which create query with parameters.
 * object queryParameters including next fields:
 * @param sortingByField string
 * @param sortingOrder string
 * @param limit int
 * @param direction string
 * @param endBeforeValue film field value (string)
 * @param startAfterValue film field value (string)
 * @param filterValue string
 * @return {Promise<*[]>} list of films, getted by parameters.
 */
export async function getFilmsQueryBuilder(queryParameters, callback) {

    if (queryParameters.filterValue !== '' && queryParameters.filterValue !== undefined){
        queryParameters.sortingByField = 'title';
        queryParameters.sortingOrder = 'asc';
    }
    queryParameters.sortingByField = changeOrderByFieldNameToValid(queryParameters.sortingByField);
    let query = filmsRef
        .orderBy(queryParameters.sortingByField, queryParameters.sortingOrder);

    if (queryParameters.filterValue !== ''){
        query = query
        .where('fields.title', '>=', queryParameters.filterValue)
        .where('fields.title','<=',queryParameters.filterValue+'\uf8ff')
    }

    if (queryParameters.direction === 'current'){
        query = query.limit(queryParameters.limit)
    }

    if (queryParameters.direction === 'next'){
        query = query.startAfter(queryParameters.startAfterValue)
            .limit(queryParameters.limit)
    }

    if (queryParameters.direction === 'prev'){
        query = query.endBefore(queryParameters.endBeforeValue)
            .limitToLast(queryParameters.limit)
    }

    return await getRequestToAPI(query, 'film', function(type, message){
        callback(type, message)
    });
}


/**
 * Simple function to make field names, getted from ui
 * valid for db query.
 * @param fieldName
 * @return {string} - name of field
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
 * @param dataToCast - data - document object from API
 * @return {Film} - object with Film class
 */
export function castToFilmClass(dataToCast) {
    const data = dataToCast.fields;
    data.pk = dataToCast.pk;
    return new Film(data);
}

/**
 * Function for get current film by primary key from API;
 * @param primaryKey - primary key of film
 * @return {Promise<*>} - film class object
 */
export async function getCurrentFilm(primaryKey, callback){
    const query = filmsRef
        .where('pk','==',primaryKey);
    const result = await getRequestToAPI(query,'film',function(type, message){
        callback(type, message)
    });
    return result[0];
}

