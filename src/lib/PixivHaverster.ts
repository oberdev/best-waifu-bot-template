import * as PixivAppApi from 'pixiv-app-api';
import { Job, scheduleJob } from 'node-schedule';

interface PixivHaversterParams {
    searchQuery?: string;
    picsPerHaverst?: number;
    limitRating?: number;
}

export class PixivHaverster implements PixivHaversterParams {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private pixivApiInstance: any;
    searchQuery: string;
    picsPerHaverst: number;
    limitRating: number;
    private haverstJob: Job;

    constructor(login: string, password: string) {
        this.pixivApiInstance = new PixivAppApi(login, password);
    }

    setParams(params: PixivHaversterParams) {
        const { searchQuery, picsPerHaverst, limitRating } = params;
        this.searchQuery = searchQuery ? searchQuery : this.searchQuery;
        this.picsPerHaverst = picsPerHaverst ? picsPerHaverst : this.picsPerHaverst;
        this.limitRating = limitRating ? limitRating : this.limitRating;
    }

    runHaverster(timeMask: string) {
        if (this.haverstJob) {
            throw new Error('Haverster already in work, stop haverster by using stopHaverster method');
        } else if (!(this.searchQuery && this.picsPerHaverst && this.limitRating)) {
            throw new Error(
                ' Looks like that some haverster params (searchQuery, picsPerHaverst, limitRating) not set or equals undefined\n. Please make sure that params were initialized',
            );
        } else this.haverstJob = scheduleJob(timeMask, () => {});
    }

    stopHaverster() {
        this.haverstJob.cancel();
        this.haverstJob = undefined;
    }
}
