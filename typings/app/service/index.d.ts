// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportNews from '../../../app/service/news';
import ExportUser from '../../../app/service/user';

declare module 'egg' {
  interface IService {
    news: ExportNews;
    user: ExportUser;
  }
}
