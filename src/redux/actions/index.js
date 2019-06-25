import appApiService from '../../core/AppApiService'

export const GET_IMAGES = 'GET_IMAGES';

export function getImages(details) {
    const request = appApiService('getImages', details);
    return {
      type: GET_IMAGES,
      payload: request
    };
}
  