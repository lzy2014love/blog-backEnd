// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportNews from '../../../app/service/news';

declare module 'egg' {
  interface IService {
    news: ExportNews;
  }
}
