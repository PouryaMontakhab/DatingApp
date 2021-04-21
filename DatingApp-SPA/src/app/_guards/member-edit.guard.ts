import { CanDeactivate } from '@angular/router';
import { MemberEditComponent } from '../members/MemberList/member-edit/member-edit.component';

  export class PreventUnsavedChanges implements CanDeactivate<MemberEditComponent> {
            canDeactivate(component : MemberEditComponent){
                if(component.editForm.dirty){
                    return confirm("Are you sure you want to continue ? Any unsaved changes will be lost !")
                }
                return true;
            }
    
  }
  