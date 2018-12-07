// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdminRequired from '../../../app/middleware/adminRequired';
import ExportErrorHandler from '../../../app/middleware/errorHandler';
import ExportLoginRequired from '../../../app/middleware/loginRequired';
import ExportPagination from '../../../app/middleware/pagination';

declare module 'egg' {
  interface IMiddleware {
    adminRequired: typeof ExportAdminRequired;
    errorHandler: typeof ExportErrorHandler;
    loginRequired: typeof ExportLoginRequired;
    pagination: typeof ExportPagination;
  }
}
