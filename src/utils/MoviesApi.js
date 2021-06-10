import { parseResponseFromServer } from '../utils/utils';
import { BEATFILM_URL } from '../utils/constants';

export function getAllMovies() {
  return fetch (`${BEATFILM_URL}/beatfilm-movies`)
    .then(parseResponseFromServer)
};
