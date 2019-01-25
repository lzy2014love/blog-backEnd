// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportToken from '../../../app/controller/token';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    token: ExportToken;
    user: ExportUser;
  }
}
