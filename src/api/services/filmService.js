import {Film} from '../../utils/models/film.js';
import {filmsRef} from '../firebaseSettings';
import {getRequestToAPI, postRequestToAPI} from '../firestoreCommunication';
import {openModalWindow} from "../../components/modal/modal";

/**
 * Function for make GET films query to API.
 * Actualy - is query constructor, which create query with parameters.
 * object queryParameters including next fields:
 * @param {string} sortingByField - string, field name for sorting
 * @param {string} sortingOrder - order of sorting
 * @param {number} limit - count of films, which will returned
 * @param {string} direction - the page is relatively up-to-date - previous|current|next
 * @param {object} endBeforeValue film field value - first film on current page
 * @param {object} startAfterValue film field value - last film on current page
 * @param {string} filterValue - string, which entered in search string
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
 * @param {string} fieldName - name of field of film class
 * @return {string} - name of field on API doc
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
 * @param {Object} dataToCast - data - document object from API
 * @return {Film} - object with Film class
 */
export function castToFilmClass(dataToCast) {
    const data = dataToCast.fields;
    data.pk = dataToCast.pk;
    return new Film(data);
}

/**
 * Function for get current film by primary key from API;
 * @param {number} primaryKey - primary key of film
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

/**
 * Function for updating existing film
 * @param {Object} filmData - data of film, which need to set
 * @return {Promise<void>}
 */
export async function updateFilmQuery(filmData){
    const data = mapperFilmObjectToFBDoc(filmData);
    const existingFilmRefer = await  filmsRef
        .where('pk','==', data.pk)
        .get()
        .then((snapshot) => {
            return snapshot.docs.map((doc)=>{
                return doc.id;
            })
        });
    const query = filmsRef
        .doc(existingFilmRefer[0]);
    await postRequestToAPI(query, data)
        .then(value => {
            return value;
        })
        .catch(error => {
            return error;
        })
}

/**
 * Function for create new film
 * @param {Object} filmData - data of film for sending
 * @return {Promise<void>}
 */
export async function createFilmQuery(filmData){
    const data = mapperFilmObjectToFBDoc(filmData);
    const query = filmsRef
        .doc();
    await postRequestToAPI(query, data)
        .then(value => {
            return value;
        })
        .catch(error => {
            return error;
        })
}

/**
 * Simple function just for transform film data to fb format
 * @param {Object} film - object of class FILM
 * @return {Object} - doc object of film from API
 */
function mapperFilmObjectToFBDoc(film){
    const pk = film.pk;
    delete film.pk;
    return JSON.parse(JSON.stringify({
        pk:pk,
        model:'resources.film',
        fields:film
    }))
}

/**
 * Function with delete film by primary key request
 * @param {Number} primaryKey - primary key of deleting film;
 * @return {Promise<void>}
 */
export async function deleteCurrentFilm(primaryKey){
    let query = filmsRef;
    const Refer = await  filmsRef
        .where('pk', '==', primaryKey)
        .get()
        .then((snapshot) => {
            return snapshot.docs.map((doc) => {
                return doc.id;
            })
        });
    await query
        .doc(Refer[0])
        .delete()
        .then(() => {
            openModalWindow('success','Film was deleted successfully')
        })
        .catch((error) => {
            openModalWindow('error', error);
        })
}
