import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { Language } from '../../../shared/models/language';
import { UserService } from '../../../user.service';
import { Subscription } from 'rxjs';
import { MentorService } from '../../../shared/services/mentor.service';
import { UserStoreService } from '../../../shared/services/stores/user-store.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-modal-edit-languages',
  templateUrl: './modal-edit-languages.component.html',
  styleUrl: './modal-edit-languages.component.scss',
})
export class ModalEditLanguagesComponent implements OnInit {
  @Input() question: string = '';
  @Input() subtitle: string = '';
  @Output() onValidate = new EventEmitter<Language[]>();
  @Output() onCancel = new EventEmitter();
  @Input() visible: boolean = true;

  @Input() selectedLanguages!: Language[];
  languages!: Language[];

  userService = inject(UserService);
  userStoreService = inject(UserStoreService);
  destroyRef = inject(DestroyRef);

  userServiceSubscription!: Subscription;

  focusBtnCancel = true;
  focusBtnValidate = false;

  constructor() {}

  ngOnInit(): void {
    this.userServiceSubscription = this.userService
      .getListLanguages()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((listLanguages) => {
        this.languages = listLanguages;
      });
  }

  showDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
    this.onCancel.emit();
  }

  validate() {
    this.userService
      .updateMentorLanguages(this.selectedLanguages, this.destroyRef)
      .subscribe();

    this.onValidate.emit(this.selectedLanguages);
  }

  cancel() {
    this.onCancel.emit();
  }

  focusValidate() {
    this.focusBtnValidate = true;
  }

  focusOutValidate() {
    this.focusBtnValidate = false;
  }

  focusCancel() {
    this.focusBtnCancel = true;
  }

  focusOutCancel() {
    this.focusBtnCancel = false;
  }
}
