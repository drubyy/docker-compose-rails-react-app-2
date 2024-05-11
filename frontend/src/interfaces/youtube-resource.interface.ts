export interface IYtResourceRes {
  etag: string;
  items: IYtResourceItem[];
  kind: string;
  pageInfo: {
    resultsPerPage: number;
    totalResults: number;
  }
}

export interface IYtResourceItem {
  id: string;
  etag: string;
  kind: string;
  snippet: {
    categoryId: string;
    channelId: string;
    channelTitle: string;
    description: string;
    liveBroadcastContent: string;
    title: string;
  };
  statistics: {
    viewCount: string;
    likeCount: string;
    favoriteCount: string;
    commentCount: string;
  };
}