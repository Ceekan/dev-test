import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @HostBinding('attr.role')
  role = 'navigation';

  @Input()
  authenticated = false;

  @Output()
  signIn = new EventEmitter();

  @Output()
  signOut = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
