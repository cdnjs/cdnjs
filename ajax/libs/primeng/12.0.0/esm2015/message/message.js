import { NgModule, Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class UIMessage {
    constructor() {
        this.escape = true;
    }
    get icon() {
        let icon = null;
        if (this.severity) {
            switch (this.severity) {
                case 'success':
                    icon = 'pi pi-check';
                    break;
                case 'info':
                    icon = 'pi pi-info-circle';
                    break;
                case 'error':
                    icon = 'pi pi-times-circle';
                    break;
                case 'warn':
                    icon = 'pi pi-exclamation-triangle';
                    break;
                default:
                    icon = 'pi pi-info-circle';
                    break;
            }
        }
        return icon;
    }
}
UIMessage.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: UIMessage, deps: [], target: i0.ɵɵFactoryTarget.Component });
UIMessage.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: UIMessage, selector: "p-message", inputs: { severity: "severity", text: "text", escape: "escape", style: "style", styleClass: "styleClass" }, ngImport: i0, template: `
        <div aria-live="polite" class="p-inline-message p-component p-inline-message" *ngIf="severity" [ngStyle]="style" [class]="styleClass"
        [ngClass]="{'p-inline-message-info': (severity === 'info'),
                'p-inline-message-warn': (severity === 'warn'),
                'p-inline-message-error': (severity === 'error'),
                'p-inline-message-success': (severity === 'success'),
                'p-inline-message-icon-only': this.text == null}">
            <span class="p-inline-message-icon" [ngClass]="icon"></span>
            <div *ngIf="!escape; else escapeOut">
                <span *ngIf="!escape" class="p-inline-message-text" [innerHTML]="text"></span>
            </div>
            <ng-template #escapeOut>
                <span *ngIf="escape" class="p-inline-message-text">{{text}}</span>
            </ng-template>
        </div>
    `, isInline: true, styles: [".p-inline-message{display:inline-flex;align-items:center;justify-content:center;vertical-align:top}.p-inline-message-icon-only .p-inline-message-text{visibility:hidden;width:0}.p-fluid .p-inline-message{display:flex}"], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: UIMessage, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-message',
                    template: `
        <div aria-live="polite" class="p-inline-message p-component p-inline-message" *ngIf="severity" [ngStyle]="style" [class]="styleClass"
        [ngClass]="{'p-inline-message-info': (severity === 'info'),
                'p-inline-message-warn': (severity === 'warn'),
                'p-inline-message-error': (severity === 'error'),
                'p-inline-message-success': (severity === 'success'),
                'p-inline-message-icon-only': this.text == null}">
            <span class="p-inline-message-icon" [ngClass]="icon"></span>
            <div *ngIf="!escape; else escapeOut">
                <span *ngIf="!escape" class="p-inline-message-text" [innerHTML]="text"></span>
            </div>
            <ng-template #escapeOut>
                <span *ngIf="escape" class="p-inline-message-text">{{text}}</span>
            </ng-template>
        </div>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./message.css']
                }]
        }], propDecorators: { severity: [{
                type: Input
            }], text: [{
                type: Input
            }], escape: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }] } });
export class MessageModule {
}
MessageModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: MessageModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MessageModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: MessageModule, declarations: [UIMessage], imports: [CommonModule], exports: [UIMessage] });
MessageModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: MessageModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: MessageModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [UIMessage],
                    declarations: [UIMessage]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy9tZXNzYWdlL21lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLHVCQUF1QixFQUFFLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2xHLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBd0I3QyxNQUFNLE9BQU8sU0FBUztJQXRCdEI7UUE0QmEsV0FBTSxHQUFZLElBQUksQ0FBQztLQW1DbkM7SUE3QkcsSUFBSSxJQUFJO1FBQ0osSUFBSSxJQUFJLEdBQVcsSUFBSSxDQUFDO1FBRXhCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLFFBQU8sSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDbEIsS0FBSyxTQUFTO29CQUNWLElBQUksR0FBRyxhQUFhLENBQUM7b0JBQ3pCLE1BQU07Z0JBRU4sS0FBSyxNQUFNO29CQUNQLElBQUksR0FBRyxtQkFBbUIsQ0FBQztvQkFDL0IsTUFBTTtnQkFFTixLQUFLLE9BQU87b0JBQ1IsSUFBSSxHQUFHLG9CQUFvQixDQUFDO29CQUNoQyxNQUFNO2dCQUVOLEtBQUssTUFBTTtvQkFDUCxJQUFJLEdBQUcsNEJBQTRCLENBQUM7b0JBQ3hDLE1BQU07Z0JBRU47b0JBQ0ksSUFBSSxHQUFHLG1CQUFtQixDQUFDO29CQUMvQixNQUFNO2FBQ1Q7U0FDSjtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7O3NHQXhDUSxTQUFTOzBGQUFULFNBQVMsNkpBcEJSOzs7Ozs7Ozs7Ozs7Ozs7S0FlVDsyRkFLUSxTQUFTO2tCQXRCckIsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsV0FBVztvQkFDckIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7S0FlVDtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLFNBQVMsRUFBRSxDQUFDLGVBQWUsQ0FBQztpQkFDL0I7OEJBR1ksUUFBUTtzQkFBaEIsS0FBSztnQkFFRyxJQUFJO3NCQUFaLEtBQUs7Z0JBRUcsTUFBTTtzQkFBZCxLQUFLO2dCQUVHLEtBQUs7c0JBQWIsS0FBSztnQkFFRyxVQUFVO3NCQUFsQixLQUFLOztBQXNDVixNQUFNLE9BQU8sYUFBYTs7MEdBQWIsYUFBYTsyR0FBYixhQUFhLGlCQWhEYixTQUFTLGFBNENSLFlBQVksYUE1Q2IsU0FBUzsyR0FnRFQsYUFBYSxZQUpiLENBQUMsWUFBWSxDQUFDOzJGQUlkLGFBQWE7a0JBTHpCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUM7b0JBQ3BCLFlBQVksRUFBRSxDQUFDLFNBQVMsQ0FBQztpQkFDNUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLENvbXBvbmVudCxJbnB1dCxDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1tZXNzYWdlJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IGFyaWEtbGl2ZT1cInBvbGl0ZVwiIGNsYXNzPVwicC1pbmxpbmUtbWVzc2FnZSBwLWNvbXBvbmVudCBwLWlubGluZS1tZXNzYWdlXCIgKm5nSWY9XCJzZXZlcml0eVwiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIlxuICAgICAgICBbbmdDbGFzc109XCJ7J3AtaW5saW5lLW1lc3NhZ2UtaW5mbyc6IChzZXZlcml0eSA9PT0gJ2luZm8nKSxcbiAgICAgICAgICAgICAgICAncC1pbmxpbmUtbWVzc2FnZS13YXJuJzogKHNldmVyaXR5ID09PSAnd2FybicpLFxuICAgICAgICAgICAgICAgICdwLWlubGluZS1tZXNzYWdlLWVycm9yJzogKHNldmVyaXR5ID09PSAnZXJyb3InKSxcbiAgICAgICAgICAgICAgICAncC1pbmxpbmUtbWVzc2FnZS1zdWNjZXNzJzogKHNldmVyaXR5ID09PSAnc3VjY2VzcycpLFxuICAgICAgICAgICAgICAgICdwLWlubGluZS1tZXNzYWdlLWljb24tb25seSc6IHRoaXMudGV4dCA9PSBudWxsfVwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLWlubGluZS1tZXNzYWdlLWljb25cIiBbbmdDbGFzc109XCJpY29uXCI+PC9zcGFuPlxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cIiFlc2NhcGU7IGVsc2UgZXNjYXBlT3V0XCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCIhZXNjYXBlXCIgY2xhc3M9XCJwLWlubGluZS1tZXNzYWdlLXRleHRcIiBbaW5uZXJIVE1MXT1cInRleHRcIj48L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjZXNjYXBlT3V0PlxuICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiZXNjYXBlXCIgY2xhc3M9XCJwLWlubGluZS1tZXNzYWdlLXRleHRcIj57e3RleHR9fTwvc3Bhbj5cbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBzdHlsZVVybHM6IFsnLi9tZXNzYWdlLmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFVJTWVzc2FnZSB7XG5cbiAgICBASW5wdXQoKSBzZXZlcml0eTogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgdGV4dDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgZXNjYXBlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICBnZXQgaWNvbigpOiBzdHJpbmcge1xuICAgICAgICBsZXQgaWNvbjogc3RyaW5nID0gbnVsbDtcblxuICAgICAgICBpZiAodGhpcy5zZXZlcml0eSkge1xuICAgICAgICAgICAgc3dpdGNoKHRoaXMuc2V2ZXJpdHkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdzdWNjZXNzJzpcbiAgICAgICAgICAgICAgICAgICAgaWNvbiA9ICdwaSBwaS1jaGVjayc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdpbmZvJzpcbiAgICAgICAgICAgICAgICAgICAgaWNvbiA9ICdwaSBwaS1pbmZvLWNpcmNsZSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdlcnJvcic6XG4gICAgICAgICAgICAgICAgICAgIGljb24gPSAncGkgcGktdGltZXMtY2lyY2xlJztcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3dhcm4nOlxuICAgICAgICAgICAgICAgICAgICBpY29uID0gJ3BpIHBpLWV4Y2xhbWF0aW9uLXRyaWFuZ2xlJztcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGljb24gPSAncGkgcGktaW5mby1jaXJjbGUnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGljb247XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtVSU1lc3NhZ2VdLFxuICAgIGRlY2xhcmF0aW9uczogW1VJTWVzc2FnZV1cbn0pXG5leHBvcnQgY2xhc3MgTWVzc2FnZU1vZHVsZSB7IH1cbiJdfQ==