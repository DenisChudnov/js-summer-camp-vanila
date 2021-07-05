import './main.css';
import '../../components/header/header.js';
import {checkFBConnect, getFilms} from "../../api/films/interactionDB";

document.getElementById('checkItOut').addEventListener('click',()=>{
  getFilms('pk', 'asc', 3,2);
})
