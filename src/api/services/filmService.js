import {Film} from '../../utils/models/film.js';
import {filmsRef} from '../firebaseSettings';
import {getRequestToAPI, postRequestToAPI} from '../firestoreCommunication';
import {openModalWindow} from "../../components/modal/modal";

/**
 * Function for make GET films query to API.
 * Actualy - is query constructor, which create query with parameters.
 * retunr list of films, getted by parameters.
 * object queryParameters including next fields:
 * @param sortingByField string
 * @param sortingOrder string
 * @param limit int
 * @param direction string
 * @param endBeforeValue film field value (string)
 * @param startAfterValue film field value (string)
 * @param filterValue string
 * @return {Promise<*[]>}
 */
export async function getFilmsQueryBuilder(queryParameters) {

    if(queryParameters.filterValue!=='' && queryParameters.filterValue!==undefined){
        queryParameters.sortingByField = 'title';
        queryParameters.sortingOrder = 'asc';
    }
    queryParameters.sortingByField = changeOrderByFieldNameToValid(queryParameters.sortingByField);
    let query = filmsRef
        .orderBy(queryParameters.sortingByField, queryParameters.sortingOrder);

    if(queryParameters.filterValue!==''){
        query = query
        .where('fields.title', '>=', queryParameters.filterValue)
        .where('fields.title','<=',queryParameters.filterValue+'\uf8ff')
    }

    if(queryParameters.direction === 'current'){
        query = query.limit(queryParameters.limit)
    }

    if(queryParameters.direction === 'next'){
        query = query.startAfter(queryParameters.startAfterValue)
            .limit(queryParameters.limit)
    }

    if (queryParameters.direction === 'prev'){
        query = query.endBefore(queryParameters.endBeforeValue)
            .limitToLast(queryParameters.limit)
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
    const data = dataToCast.fields;
    data.pk = dataToCast.pk;
    return new Film(data);
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

function transformFilmObjectToFBDoc(film){
    const pk = film.pk;
    delete film.pk;
    return JSON.parse(JSON.stringify({
        pk:pk,
        model:'resources.film',
        fields:film
    }))
}

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
