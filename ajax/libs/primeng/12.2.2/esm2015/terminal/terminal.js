import { NgModule, Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import * as i0 from "@angular/core";
import * as i1 from "./terminalservice";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
export class Terminal {
    constructor(el, terminalService, cd) {
        this.el = el;
        this.terminalService = terminalService;
        this.cd = cd;
        this.commands = [];
        this.subscription = terminalService.responseHandler.subscribe(response => {
            this.commands[this.commands.length - 1].response = response;
            this.commandProcessed = true;
        });
    }
    ngAfterViewInit() {
        this.container = DomHandler.find(this.el.nativeElement, '.p-terminal')[0];
    }
    ngAfterViewChecked() {
        if (this.commandProcessed) {
            this.container.scrollTop = this.container.scrollHeight;
            this.commandProcessed = false;
        }
    }
    set response(value) {
        if (value) {
            this.commands[this.commands.length - 1].response = value;
            this.commandProcessed = true;
        }
    }
    handleCommand(event) {
        if (event.keyCode == 13) {
            this.commands.push({ text: this.command });
            this.terminalService.sendCommand(this.command);
            this.command = '';
        }
    }
    focus(element) {
        element.focus();
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
Terminal.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Terminal, deps: [{ token: i0.ElementRef }, { token: i1.TerminalService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
Terminal.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Terminal, selector: "p-terminal", inputs: { welcomeMessage: "welcomeMessage", prompt: "prompt", style: "style", styleClass: "styleClass", response: "response" }, host: { classAttribute: "p-element" }, ngImport: i0, template: `
        <div [ngClass]="'p-terminal p-component'" [ngStyle]="style" [class]="styleClass" (click)="focus(in)">
            <div *ngIf="welcomeMessage">{{welcomeMessage}}</div>
            <div class="p-terminal-content">
                <div *ngFor="let command of commands">
                    <span class="p-terminal-prompt">{{prompt}}</span>
                    <span class="p-terminal-command">{{command.text}}</span>
                    <div class="p-terminal-response">{{command.response}}</div>
                </div>
            </div>
            <div class="p-terminal-prompt-container">
                <span class="p-terminal-content-prompt">{{prompt}}</span>
                <input #in type="text" [(ngModel)]="command" class="p-terminal-input" autocomplete="off" (keydown)="handleCommand($event)" autofocus>
            </div>
        </div>
    `, isInline: true, styles: [".p-terminal{height:18rem;overflow:auto}.p-terminal-prompt-container{display:flex;align-items:center}.p-terminal-input{flex:1 1 auto;border:0;background-color:transparent;color:inherit;padding:0;outline:0 none}.p-terminal-input::-ms-clear{display:none}"], directives: [{ type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Terminal, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-terminal',
                    template: `
        <div [ngClass]="'p-terminal p-component'" [ngStyle]="style" [class]="styleClass" (click)="focus(in)">
            <div *ngIf="welcomeMessage">{{welcomeMessage}}</div>
            <div class="p-terminal-content">
                <div *ngFor="let command of commands">
                    <span class="p-terminal-prompt">{{prompt}}</span>
                    <span class="p-terminal-command">{{command.text}}</span>
                    <div class="p-terminal-response">{{command.response}}</div>
                </div>
            </div>
            <div class="p-terminal-prompt-container">
                <span class="p-terminal-content-prompt">{{prompt}}</span>
                <input #in type="text" [(ngModel)]="command" class="p-terminal-input" autocomplete="off" (keydown)="handleCommand($event)" autofocus>
            </div>
        </div>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./terminal.css'],
                    host: {
                        'class': 'p-element'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.TerminalService }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { welcomeMessage: [{
                type: Input
            }], prompt: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], response: [{
                type: Input
            }] } });
export class TerminalModule {
}
TerminalModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: TerminalModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TerminalModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: TerminalModule, declarations: [Terminal], imports: [CommonModule, FormsModule], exports: [Terminal] });
TerminalModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: TerminalModule, imports: [[CommonModule, FormsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: TerminalModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule],
                    exports: [Terminal],
                    declarations: [Terminal]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVybWluYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvdGVybWluYWwvdGVybWluYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQTBDLEtBQUssRUFBWSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBb0IsTUFBTSxlQUFlLENBQUM7QUFDekssT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sYUFBYSxDQUFDOzs7OztBQTZCdkMsTUFBTSxPQUFPLFFBQVE7SUFvQmpCLFlBQW1CLEVBQWMsRUFBUyxlQUFnQyxFQUFTLEVBQXFCO1FBQXJGLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBUyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFBUyxPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQVZ4RyxhQUFRLEdBQVUsRUFBRSxDQUFDO1FBV2pCLElBQUksQ0FBQyxZQUFZLEdBQUcsZUFBZSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDckUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1lBQzVELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7UUFDakMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsZUFBZTtRQUNYLElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRUQsa0JBQWtCO1FBQ2QsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUM7WUFDdkQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztTQUNqQztJQUNMLENBQUM7SUFFRCxJQUNJLFFBQVEsQ0FBQyxLQUFhO1FBQ3RCLElBQUksS0FBSyxFQUFFO1lBQ1AsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3pELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7U0FDaEM7SUFDTCxDQUFDO0lBRUQsYUFBYSxDQUFDLEtBQW9CO1FBQzlCLElBQUksS0FBSyxDQUFDLE9BQU8sSUFBSSxFQUFFLEVBQUU7WUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBQyxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1NBQ3JCO0lBQ0wsQ0FBQztJQUVELEtBQUssQ0FBQyxPQUFvQjtRQUN0QixPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNuQztJQUNMLENBQUM7O3FHQTlEUSxRQUFRO3lGQUFSLFFBQVEseU5BdkJQOzs7Ozs7Ozs7Ozs7Ozs7S0FlVDsyRkFRUSxRQUFRO2tCQXpCcEIsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsWUFBWTtvQkFDdEIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7S0FlVDtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLFNBQVMsRUFBRSxDQUFDLGdCQUFnQixDQUFDO29CQUM3QixJQUFJLEVBQUU7d0JBQ0YsT0FBTyxFQUFFLFdBQVc7cUJBQ3ZCO2lCQUNKOytKQUdZLGNBQWM7c0JBQXRCLEtBQUs7Z0JBRUcsTUFBTTtzQkFBZCxLQUFLO2dCQUVHLEtBQUs7c0JBQWIsS0FBSztnQkFFRyxVQUFVO3NCQUFsQixLQUFLO2dCQStCRixRQUFRO3NCQURYLEtBQUs7O0FBaUNWLE1BQU0sT0FBTyxjQUFjOzsyR0FBZCxjQUFjOzRHQUFkLGNBQWMsaUJBdkVkLFFBQVEsYUFtRVAsWUFBWSxFQUFDLFdBQVcsYUFuRXpCLFFBQVE7NEdBdUVSLGNBQWMsWUFKZCxDQUFDLFlBQVksRUFBQyxXQUFXLENBQUM7MkZBSTFCLGNBQWM7a0JBTDFCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFDLFdBQVcsQ0FBQztvQkFDbkMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO29CQUNuQixZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUM7aUJBQzNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxDb21wb25lbnQsQWZ0ZXJWaWV3SW5pdCxBZnRlclZpZXdDaGVja2VkLE9uRGVzdHJveSxJbnB1dCxFbGVtZW50UmVmLENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBWaWV3RW5jYXBzdWxhdGlvbiwgQ2hhbmdlRGV0ZWN0b3JSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0RvbUhhbmRsZXJ9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7VGVybWluYWxTZXJ2aWNlfSBmcm9tICcuL3Rlcm1pbmFsc2VydmljZSc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gICBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLXRlcm1pbmFsJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cIidwLXRlcm1pbmFsIHAtY29tcG9uZW50J1wiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiAoY2xpY2spPVwiZm9jdXMoaW4pXCI+XG4gICAgICAgICAgICA8ZGl2ICpuZ0lmPVwid2VsY29tZU1lc3NhZ2VcIj57e3dlbGNvbWVNZXNzYWdlfX08L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXRlcm1pbmFsLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBjb21tYW5kIG9mIGNvbW1hbmRzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC10ZXJtaW5hbC1wcm9tcHRcIj57e3Byb21wdH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtdGVybWluYWwtY29tbWFuZFwiPnt7Y29tbWFuZC50ZXh0fX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXRlcm1pbmFsLXJlc3BvbnNlXCI+e3tjb21tYW5kLnJlc3BvbnNlfX08L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtdGVybWluYWwtcHJvbXB0LWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC10ZXJtaW5hbC1jb250ZW50LXByb21wdFwiPnt7cHJvbXB0fX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPGlucHV0ICNpbiB0eXBlPVwidGV4dFwiIFsobmdNb2RlbCldPVwiY29tbWFuZFwiIGNsYXNzPVwicC10ZXJtaW5hbC1pbnB1dFwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiIChrZXlkb3duKT1cImhhbmRsZUNvbW1hbmQoJGV2ZW50KVwiIGF1dG9mb2N1cz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vdGVybWluYWwuY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICAnY2xhc3MnOiAncC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgVGVybWluYWwgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LEFmdGVyVmlld0NoZWNrZWQsT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIHdlbGNvbWVNZXNzYWdlOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBwcm9tcHQ6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICBjb21tYW5kczogYW55W10gPSBbXTtcblxuICAgIGNvbW1hbmQ6IHN0cmluZztcblxuICAgIGNvbnRhaW5lcjogRWxlbWVudDtcblxuICAgIGNvbW1hbmRQcm9jZXNzZWQ6IGJvb2xlYW47XG5cbiAgICBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIHRlcm1pbmFsU2VydmljZTogVGVybWluYWxTZXJ2aWNlLCBwdWJsaWMgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGVybWluYWxTZXJ2aWNlLnJlc3BvbnNlSGFuZGxlci5zdWJzY3JpYmUocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb21tYW5kc1t0aGlzLmNvbW1hbmRzLmxlbmd0aCAtIDFdLnJlc3BvbnNlID0gcmVzcG9uc2U7XG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRQcm9jZXNzZWQgPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gRG9tSGFuZGxlci5maW5kKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJy5wLXRlcm1pbmFsJylbMF07XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdDaGVja2VkKCkge1xuICAgICAgICBpZiAodGhpcy5jb21tYW5kUHJvY2Vzc2VkKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5zY3JvbGxUb3AgPSB0aGlzLmNvbnRhaW5lci5zY3JvbGxIZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRQcm9jZXNzZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IHJlc3BvbnNlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRzW3RoaXMuY29tbWFuZHMubGVuZ3RoIC0gMV0ucmVzcG9uc2UgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZFByb2Nlc3NlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVDb21tYW5kKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09IDEzKSB7XG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRzLnB1c2goe3RleHQ6IHRoaXMuY29tbWFuZH0pO1xuICAgICAgICAgICAgdGhpcy50ZXJtaW5hbFNlcnZpY2Uuc2VuZENvbW1hbmQodGhpcy5jb21tYW5kKTtcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZCA9ICcnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9jdXMoZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgZWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLEZvcm1zTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbVGVybWluYWxdLFxuICAgIGRlY2xhcmF0aW9uczogW1Rlcm1pbmFsXVxufSlcbmV4cG9ydCBjbGFzcyBUZXJtaW5hbE1vZHVsZSB7IH1cbiJdfQ==