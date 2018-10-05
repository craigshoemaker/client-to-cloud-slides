import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TodoEditorComponent } from './todo-editor/todo-editor.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { BaseComponent } from './base-component/base.component';
import { NavComponent } from './nav/nav.component';
import { CrudComponent } from './crud/crud.component';
import { LocalConflictComponent } from './local-conflict/local-conflict.component';
import { SyncComponent } from './sync/sync.component';
import { SyncConflictComparerComponent } from './sync-conflict-comparer/sync-conflict-comparer.component';
import { SlideNavBottomComponent } from './slide-nav-bottom/slide-nav-bottom.component';
import { ApiInitComponent } from './api-init/api-init.component';
import { ApiGetComponent } from './api-get/api-get.component';
import { ApiAddComponent } from './api-add/api-add.component';
import { ApiUpdateComponent } from './api-update/api-update.component';
import { ApiDeleteComponent } from './api-delete/api-delete.component';
import { ApiSyncComponent } from './api-sync/api-sync.component';
import { ApiAlldocsComponent } from './api-alldocs/api-alldocs.component';
import { ApiBulkdocsComponent } from './api-bulkdocs/api-bulkdocs.component';
import { ApiImmediateConflictComponent } from './api-immediate-conflict/api-immediate-conflict.component';
import { SlideTakeawaysComponent } from './slide-takeaways/slide-takeaways.component';
import { SlideAnatomyComponent } from './slide-anatomy/slide-anatomy.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoEditorComponent,
    IntroductionComponent,
    BaseComponent,
    NavComponent,
    CrudComponent,
    LocalConflictComponent,
    SyncComponent,
    SyncConflictComparerComponent,
    SlideNavBottomComponent,
    ApiInitComponent,
    ApiGetComponent,
    ApiAddComponent,
    ApiUpdateComponent,
    ApiDeleteComponent,
    ApiSyncComponent,
    ApiAlldocsComponent,
    ApiBulkdocsComponent,
    ApiImmediateConflictComponent,
    SlideTakeawaysComponent,
    SlideAnatomyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
