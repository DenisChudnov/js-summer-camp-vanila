import './management.css';
import '../../components/header/header.js';
import '../../components/base.js';
import '../../components/modal/modal.js';
import '../../components/confirm/confirm.js';
import '../../components/accordion/accordion.js';
import {checkUserInLocalStorage} from "../../utils/authLocalStorage";
import {Film} from "../../utils/models/film";
import {getCurrentFilm} from "../../api/services/filmService";

//some variables for page managment
let characters = [];
let planets = [];
let species = [];
let starships = [];
let vehicles = [];
let film;

/**
 * For remove all alert, i made custom modal, which need for parameters.
 * @type {{close(): void, open(): (void|undefined)} & {setContent(*): void, destroy(): void}}
 */
const msgModal = $.modal({
    title: 'Hey!',
    closable: true,
    width: '300px',
    footerButtons: [
        {text: 'Close', type: 'primary', handler() {
                msgModal.close();
            }},
    ],
});

document
    .addEventListener('DOMContentLoaded', async () => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        if (!checkUserInLocalStorage()){
            openModalWindow('You should be authorized to watch this page, dude');
            window.open('auth.html', '_self');
        } else {
            const primaryKey = urlParams.get('pk')*1;
            if(primaryKey){
                film = await getCurrentFilm(primaryKey);
                openModalWindow(`welcome, dude! This page for ${film.title} film.`)
            } else {
                openModalWindow(`welcome, dude! This page for brand NEW FILM CREATION!!!`)
                film = new Film();
            }

        }
    })


/**
 * Function for call custom modal window
 * @param message string - message, which will displayed on modal window.
 */
function openModalWindow(message){
    msgModal.setContent(`
      <p>${message}</p>
    `);
    msgModal.open();
}
