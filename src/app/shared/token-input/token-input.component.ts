import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-token-input',
    templateUrl: './token-input.component.html'
})
export class TokenInputComponent implements OnInit {
    
    token: string;
    
    constructor() {
    }
    
    ngOnInit() {
    
    }
    
    setToken(){
        localStorage.setItem('token', this.token);
        window.location.reload(false);
    }
}
