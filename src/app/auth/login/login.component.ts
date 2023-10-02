import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { User } from 'src/app/interfaces/user';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    public form!: FormGroup;
    public user!: User;
    public valCheck: string[] = ['remember'];

    constructor(
        public layoutService: LayoutService,
        private authService: AuthService,
        private router: Router,
        private formBuilder: FormBuilder,
    ) {}

    ngOnInit(): void {
        this.initializeForm();
    }

    initializeForm() {
        this.form = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });
    }

    login() {
        const user: User = this.form.value;

        this.authService
            .login(user)
            .then(() => this.router.navigate(['home']))
            .catch((e) => '');
    }
}
