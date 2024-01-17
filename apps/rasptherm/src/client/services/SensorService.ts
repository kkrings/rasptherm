/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ReadSensorModel } from '../models/ReadSensorModel';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class SensorService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Read Sensor
     * @returns ReadSensorModel Successful Response
     * @throws ApiError
     */
    public readSensorSensorReadGet(): CancelablePromise<ReadSensorModel> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/sensor/read',
        });
    }
}
