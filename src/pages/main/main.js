import './main.css';
import '../../components/header/header.js';
import {checkFBConnect} from "../../api/films/interactionDB";

document.getElementById('checkItOut').addEventListener('click',()=>{
    checkFBConnect();
})
