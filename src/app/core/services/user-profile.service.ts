import { Injectable } from '@angular/core';
import { UserProfileModel } from '../models/user-profile.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserProfileService {

    private userProfileSubject = new BehaviorSubject<UserProfileModel | null>(null);

    constructor() { }
    setUserProfile(userName: string, email: string): void {
        const profile: UserProfileModel = {
            userName,
            emailAddress: email,
            mobileNumber: this.getCurrentProfile()?.mobileNumber || ""
        };
        this.userProfileSubject.next(profile);
    }
    getUserProfile$(): Observable<UserProfileModel | null> {
        return this.userProfileSubject.asObservable();
    }

    getCurrentProfile(): UserProfileModel | null {
        return this.userProfileSubject.getValue();
    }

    clearUserProfile(): void {
        this.userProfileSubject.next(null);
    }
}
