import {Film} from '../../utils/models/film.js';
import {filmsRef} from '../firebaseSettings';
import {getRequestToAPI, postRequestToAPI} from '../firestoreCommunication';
import {openModalWindow} from "../../components/modal/modal";

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

/**
 * function for send film's data to server.
 * If film with same primary key is already exist -
 * there are build update query.
 * If is brand new film - build create query
 * @param filmData
 * @return {Promise<void>}
 */
export async function sendFilmDataToServer(filmData){
    const data = transformFilmObjectToFBDoc(filmData);
    let query = filmsRef;
    const existingFilmRefer = await  filmsRef
        .where('pk','==',data.pk)
        .get()
        .then((snapshot)=>{
            return snapshot.docs.map((doc)=>{
                return doc.id;
            })
        });
    if(existingFilmRefer.length>0){
        query = query.doc(existingFilmRefer[0]);
    } else {
        query = query
            .doc();
    }
    await postRequestToAPI(query, data);
}

/**
 * Simple function just for transform film data to fb format
 * @param film
 * @return {any}
 */
function transformFilmObjectToFBDoc(film){
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
 * @param primaryKey
 * @return {Promise<void>}
 */
export async function deleteCurrentFilm(primaryKey){
    let query = filmsRef;
    const Refer = await  filmsRef
        .where('pk','==',primaryKey)
        .get()
        .then((snapshot)=>{
            return snapshot.docs.map((doc)=>{
                return doc.id;
            })
        });

    await query
        .doc(Refer[0])
        .delete()
        .then(()=>{
            openModalWindow('success','Film was deleted successfully')
        })
        .catch((error)=>{
            openModalWindow('error',error);
        })
}
