import './details.css';
import '../../components/header/header.js';

document.addEventListener('DOMContentLoaded', ()=>{

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const primaryKey = urlParams.get('pk');
  console.log('IF ITS DETAILS PAGE, ITS PAGE OF '+primaryKey+' FILM!');
    
});
