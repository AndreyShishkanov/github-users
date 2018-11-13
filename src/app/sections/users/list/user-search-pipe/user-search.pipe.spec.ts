import {UserSearchPipe} from './user-search.pipe';
import {User} from '@classes/User';

describe('UserSearchPipe', () => {
    
    const pipe: UserSearchPipe = new UserSearchPipe();
    const users: User[] = [
        {
            email: 'na.lo@gmail.com',
            login: '',
            name: ''
        },
        {
            email: 'NA',
            login: 'lo',
            name: ''
        },
        {
            email: '',
            login: 'loginname',
            name: ''
        },
        {
            email: '',
            login: '',
            name: 'Nally Lowen'
        },
        {
            email: 'Borscht',
            login: 'Solyanka',
            name: 'Blini'
        }
    ];
    
    it('should create an instance', () => {
        expect(pipe).toBeTruthy();
    });
    
    it('should find only one result for "Nally Lowen"', () => {
        const result = pipe.transform(users, 'Nally Lowen');
        expect(result.length).toEqual(1);
    });
    
    it('should find all results for empty string', () => {
        const result = pipe.transform(users, '');
        expect(result.length).toEqual(users.length);
    });
    
    it('should find all results for null', () => {
        const result = pipe.transform(users, null);
        expect(result.length).toEqual(users.length);
    });
    
    it('should find equal results for "na" and "lo"', () => {
        const na = pipe.transform(users, 'na');
        const lo = pipe.transform(users, 'lo');
        expect(na.length).toEqual(lo.length);
    });
    
    it('should find 3 results for "na lo"', () => {
        const result = pipe.transform(users, 'na lo');
        expect(result.length).toEqual( 3);
    });
    
    it('should find 0 results for "nalo"', () => {
        const result = pipe.transform(users, 'nalo');
        expect(result.length).toEqual( 0);
    });
    
    it('should ignore upperCase and lowerCase', () => {
        const lowerCase = pipe.transform(users, 'na');
        const anyCase1 = pipe.transform(users, 'Na');
        const anyCase2 = pipe.transform(users, 'nA');
        const upperCase = pipe.transform(users, 'NA');
        
        expect(lowerCase.length === upperCase.length && upperCase.length === anyCase1.length && anyCase1.length === anyCase2.length).toBeTruthy();
    });
});
