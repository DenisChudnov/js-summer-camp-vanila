/**
 * Function for return sorting field name
 * get table index, return field name
 */
export function transformation(index){
  let result = 'pk';
  switch (index) {
    case -1:
      result = 'pk';
      break;
    case 0:
      result = 'title';
      break;
    case 1:
      result = 'episode_id';
      break;
    case 2:
      result = 'release_date';
      break;
    case 3:
      result = 'director';
      break;
    case 4:
      result = 'producer';
      break;
    default:
      result = 'pk';
      break;
  }
  return result;
}
