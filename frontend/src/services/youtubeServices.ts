import request from './request'

export const fetchVideos = (resourceIds: string) => {
  const response = request(
    'GET',
    'https://youtube.googleapis.com/youtube/v3/videos',
    {
      part: 'snippet,statistics',
      id: resourceIds,
      key: process.env.REACT_APP_YOUTUBE_API_KEY,
    },
    false
  );

  return response;
}