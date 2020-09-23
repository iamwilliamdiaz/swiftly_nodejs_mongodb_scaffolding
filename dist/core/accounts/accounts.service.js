"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_service_1 = require("../../databases/mongodb.service");
const hash_generator_util_1 = require("../../util/hash.generator.util");
/**
 * Database and model names
 */
const exampleDb = "example-db";
const AccountsModel = "Accounts";
class AccountsService {
    /**
     * Summary: Create account
     * @description Create account
     * @Method POST
     * @function createAccountsSrv
     * @param {any} _query, _params or _body
     * @memberof accounts
     */
    createAccountsSrv(_headers, _params, _body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                /**
                 * Summary: Create a new account
                 * @description Create a new account in the cluster
                 */
                const _accountInformation = {
                    user_id: hash_generator_util_1.hashGenerator.getUniqueHash(),
                    group_id: hash_generator_util_1.hashGenerator.getUniqueHash(),
                    firstname: _body.firstname,
                    lastname: _body.lastname,
                };
                try {
                    const _createResult = yield mongodb_service_1.mongoDBService.createDoc(exampleDb, AccountsModel, hash_generator_util_1.hashGenerator.injectHash(_accountInformation));
                    /** Resolve the promise */
                    resolve({
                        statusCode: 200,
                        data: _createResult.ops
                    });
                }
                catch (_err) {
                    /** Reject the promise */
                    reject({
                        statusCode: 503,
                        message: _err,
                    });
                }
            }));
        });
    }
    /**
     * Summary: Create account
     * @description Create account
     * @Method POST
     * @function createAccountsSrv
     * @param {any} _query, _params or _body
     * @memberof accounts
     */
    getAllAccountsSrv(_headers, _query, _body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const _dbQuery = {
                    criteria: {},
                    skip: _query.skip,
                    limit: _query.limit,
                    sort: _query.sort
                };
                try {
                    console.log(_dbQuery);
                    const _searchResult = yield mongodb_service_1.mongoDBService.searchDoc(exampleDb, AccountsModel, _dbQuery);
                    /** Resolve the promise */
                    resolve({
                        statusCode: (_searchResult) ? 200 : 404,
                        data: _searchResult
                    });
                }
                catch (_err) {
                    /** Reject the promise */
                    reject({
                        statusCode: 503,
                        message: _err,
                    });
                }
            }));
        });
    }
    /**
     * Summary: Returns account information by Id
     * @description Returns account information associated with the ID requested
     * @Method GET
     * @function getAccountByIdSrv
     * @param {any} _query, _params or _body
     * @memberof accounts
     */
    getAccountByIdSrvc(_headers, _params, _query) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const _dbQuery = {
                    user_id: _params.user_id
                };
                try {
                    const _findResult = yield mongodb_service_1.mongoDBService.findDoc(exampleDb, AccountsModel, _dbQuery);
                    /** Resolve the promise */
                    resolve({
                        statusCode: (_findResult) ? 200 : 404,
                        data: _findResult
                    });
                }
                catch (_err) {
                    /** Reject the promise */
                    reject({
                        statusCode: 503,
                        message: _err,
                    });
                }
            }));
        });
    }
    /**
     * Summary: Returns account information by criteria
     * @description Returns account information associated with the criteria requested
     * @Method GET
     * @function searchAccountByCriteriaSrvc
     * @param {any} _query, _params or _body
     * @memberof accounts
     */
    searchAccountByCriteriaSrvc(_headers, _params, _query) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const _dbQuery = {
                    criteria: {
                        $or: [
                            { "firstname": { "$regex": `^.*${_query.criteria}`, "$options": "si" } },
                            { "lastname": { "$regex": `^.*${_query.criteria}`, "$options": "si" } }
                        ]
                    },
                    skip: _query.skip,
                    limit: _query.limit,
                    sort: _query.sort
                };
                try {
                    const _searchResult = yield mongodb_service_1.mongoDBService.searchDoc(exampleDb, AccountsModel, _dbQuery);
                    /** Resolve the promise */
                    resolve({
                        statusCode: (_searchResult) ? 200 : 404,
                        data: _searchResult
                    });
                }
                catch (_err) {
                    /** Reject the promise */
                    reject({
                        statusCode: 503,
                        message: _err,
                    });
                }
            }));
        });
    }
    /**
     * Summary: Update the existing account
     * @description Update the existing account
     * @Method POST
     * @function createAccountsSrv
     * @param {any} _query, _params or _body
     * @memberof accounts
     */
    deleteAccountByIdSrv(_headers, _params, _body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                /**
                 * Summary: Query the existing account
                 */
                const _dbQuery = {
                    user_id: _params.user_id
                };
                try {
                    const _deleteResult = yield mongodb_service_1.mongoDBService.deleteDoc(exampleDb, AccountsModel, _dbQuery);
                    /** Resolve the promise */
                    resolve({
                        statusCode: 204,
                        data: _deleteResult
                    });
                }
                catch (_err) {
                    /** Reject the promise */
                    reject({
                        statusCode: 503,
                        message: _err,
                    });
                }
            }));
        });
    }
    /**
     * Summary: Update the existing account
     * @description Update the existing account
     * @Method POST
     * @function createAccountsSrv
     * @param {any} _query, _params or _body
     * @memberof accounts
     */
    updateAccountByIdSrv(_headers, _params, _body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                /**
                 * Summary: Query the existing account
                 */
                const _dbQuery = {
                    user_id: _params.user_id
                };
                /**
                 * Summary: Create a new account
                 */
                const _accountInformation = {
                    $set: {
                        firstname: _body.firstname,
                        lastname: _body.lastname,
                    }
                };
                try {
                    const _updateResult = yield mongodb_service_1.mongoDBService.updateDoc(exampleDb, AccountsModel, _dbQuery, _accountInformation);
                    /** Resolve the promise */
                    resolve({
                        statusCode: 204,
                        data: _updateResult.result
                    });
                }
                catch (_err) {
                    /** Reject the promise */
                    reject({
                        statusCode: 503,
                        message: _err,
                    });
                }
            }));
        });
    }
}
exports.AccountsService = AccountsService;
//# sourceMappingURL=accounts.service.js.map