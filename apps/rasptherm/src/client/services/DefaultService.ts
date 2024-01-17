/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MetadataModel } from '../models/MetadataModel';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class DefaultService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Read Root
     * @returns MetadataModel Successful Response
     * @throws ApiError
     */
    public readRootGet(): CancelablePromise<MetadataModel> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/',
        });
    }
}
