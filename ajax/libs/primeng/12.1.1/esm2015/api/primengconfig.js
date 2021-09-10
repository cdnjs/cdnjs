import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FilterMatchMode } from './filtermatchmode';
import * as i0 from "@angular/core";
export class PrimeNGConfig {
    constructor() {
        this.ripple = false;
        this.filterMatchModeOptions = {
            text: [
                FilterMatchMode.STARTS_WITH,
                FilterMatchMode.CONTAINS,
                FilterMatchMode.NOT_CONTAINS,
                FilterMatchMode.ENDS_WITH,
                FilterMatchMode.EQUALS,
                FilterMatchMode.NOT_EQUALS
            ],
            numeric: [
                FilterMatchMode.EQUALS,
                FilterMatchMode.NOT_EQUALS,
                FilterMatchMode.LESS_THAN,
                FilterMatchMode.LESS_THAN_OR_EQUAL_TO,
                FilterMatchMode.GREATER_THAN,
                FilterMatchMode.GREATER_THAN_OR_EQUAL_TO
            ],
            date: [
                FilterMatchMode.DATE_IS,
                FilterMatchMode.DATE_IS_NOT,
                FilterMatchMode.DATE_BEFORE,
                FilterMatchMode.DATE_AFTER
            ]
        };
        this.translation = {
            startsWith: 'Starts with',
            contains: 'Contains',
            notContains: 'Not contains',
            endsWith: 'Ends with',
            equals: 'Equals',
            notEquals: 'Not equals',
            noFilter: 'No Filter',
            lt: 'Less than',
            lte: 'Less than or equal to',
            gt: 'Greater than',
            gte: 'Greater than or equal to',
            is: 'Is',
            isNot: 'Is not',
            before: 'Before',
            after: 'After',
            dateIs: 'Date is',
            dateIsNot: 'Date is not',
            dateBefore: 'Date is before',
            dateAfter: 'Date is after',
            clear: 'Clear',
            apply: 'Apply',
            matchAll: 'Match All',
            matchAny: 'Match Any',
            addRule: 'Add Rule',
            removeRule: 'Remove Rule',
            accept: 'Yes',
            reject: 'No',
            choose: 'Choose',
            upload: 'Upload',
            cancel: 'Cancel',
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dateFormat: 'mm/dd/yy',
            today: 'Today',
            weekHeader: 'Wk',
            weak: 'Weak',
            medium: 'Medium',
            strong: 'Strong',
            passwordPrompt: 'Enter a password',
            emptyMessage: 'No results found',
            emptyFilterMessage: 'No results found'
        };
        this.zIndex = {
            modal: 1100,
            overlay: 1000,
            menu: 1000,
            tooltip: 1100
        };
        this.translationSource = new Subject();
        this.translationObserver = this.translationSource.asObservable();
    }
    getTranslation(key) {
        return this.translation[key];
    }
    setTranslation(value) {
        this.translation = Object.assign(Object.assign({}, this.translation), value);
        this.translationSource.next(this.translation);
    }
}
PrimeNGConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: PrimeNGConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
PrimeNGConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: PrimeNGConfig, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: PrimeNGConfig, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbWVuZ2NvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy9hcGkvcHJpbWVuZ2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDOztBQUlwRCxNQUFNLE9BQU8sYUFBYTtJQUQxQjtRQUdJLFdBQU0sR0FBWSxLQUFLLENBQUM7UUFFeEIsMkJBQXNCLEdBQUc7WUFDckIsSUFBSSxFQUFFO2dCQUNGLGVBQWUsQ0FBQyxXQUFXO2dCQUMzQixlQUFlLENBQUMsUUFBUTtnQkFDeEIsZUFBZSxDQUFDLFlBQVk7Z0JBQzVCLGVBQWUsQ0FBQyxTQUFTO2dCQUN6QixlQUFlLENBQUMsTUFBTTtnQkFDdEIsZUFBZSxDQUFDLFVBQVU7YUFDN0I7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsZUFBZSxDQUFDLE1BQU07Z0JBQ3RCLGVBQWUsQ0FBQyxVQUFVO2dCQUMxQixlQUFlLENBQUMsU0FBUztnQkFDekIsZUFBZSxDQUFDLHFCQUFxQjtnQkFDckMsZUFBZSxDQUFDLFlBQVk7Z0JBQzVCLGVBQWUsQ0FBQyx3QkFBd0I7YUFDM0M7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsZUFBZSxDQUFDLE9BQU87Z0JBQ3ZCLGVBQWUsQ0FBQyxXQUFXO2dCQUMzQixlQUFlLENBQUMsV0FBVztnQkFDM0IsZUFBZSxDQUFDLFVBQVU7YUFDN0I7U0FDSixDQUFDO1FBRU0sZ0JBQVcsR0FBZ0I7WUFDL0IsVUFBVSxFQUFFLGFBQWE7WUFDekIsUUFBUSxFQUFFLFVBQVU7WUFDcEIsV0FBVyxFQUFFLGNBQWM7WUFDM0IsUUFBUSxFQUFFLFdBQVc7WUFDckIsTUFBTSxFQUFFLFFBQVE7WUFDaEIsU0FBUyxFQUFF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dXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEZpbHRlck1hdGNoTW9kZSB9IGZyb20gJy4vZmlsdGVybWF0Y2htb2RlJztcbmltcG9ydCB7IFRyYW5zbGF0aW9uIH0gZnJvbSAnLi90cmFuc2xhdGlvbic7XG5cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIFByaW1lTkdDb25maWcge1xuXG4gICAgcmlwcGxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBmaWx0ZXJNYXRjaE1vZGVPcHRpb25zID0ge1xuICAgICAgICB0ZXh0OiBbXG4gICAgICAgICAgICBGaWx0ZXJNYXRjaE1vZGUuU1RBUlRTX1dJVEgsXG4gICAgICAgICAgICBGaWx0ZXJNYXRjaE1vZGUuQ09OVEFJTlMsXG4gICAgICAgICAgICBGaWx0ZXJNYXRjaE1vZGUuTk9UX0NPTlRBSU5TLFxuICAgICAgICAgICAgRmlsdGVyTWF0Y2hNb2RlLkVORFNfV0lUSCxcbiAgICAgICAgICAgIEZpbHRlck1hdGNoTW9kZS5FUVVBTFMsXG4gICAgICAgICAgICBGaWx0ZXJNYXRjaE1vZGUuTk9UX0VRVUFMU1xuICAgICAgICBdLFxuICAgICAgICBudW1lcmljOiBbXG4gICAgICAgICAgICBGaWx0ZXJNYXRjaE1vZGUuRVFVQUxTLFxuICAgICAgICAgICAgRmlsdGVyTWF0Y2hNb2RlLk5PVF9FUVVBTFMsXG4gICAgICAgICAgICBGaWx0ZXJNYXRjaE1vZGUuTEVTU19USEFOLFxuICAgICAgICAgICAgRmlsdGVyTWF0Y2hNb2RlLkxFU1NfVEhBTl9PUl9FUVVBTF9UTyxcbiAgICAgICAgICAgIEZpbHRlck1hdGNoTW9kZS5HUkVBVEVSX1RIQU4sXG4gICAgICAgICAgICBGaWx0ZXJNYXRjaE1vZGUuR1JFQVRFUl9USEFOX09SX0VRVUFMX1RPXG4gICAgICAgIF0sXG4gICAgICAgIGRhdGU6IFtcbiAgICAgICAgICAgIEZpbHRlck1hdGNoTW9kZS5EQVRFX0lTLFxuICAgICAgICAgICAgRmlsdGVyTWF0Y2hNb2RlLkRBVEVfSVNfTk9ULFxuICAgICAgICAgICAgRmlsdGVyTWF0Y2hNb2RlLkRBVEVfQkVGT1JFLFxuICAgICAgICAgICAgRmlsdGVyTWF0Y2hNb2RlLkRBVEVfQUZURVJcbiAgICAgICAgXVxuICAgIH07XG5cbiAgICBwcml2YXRlIHRyYW5zbGF0aW9uOiBUcmFuc2xhdGlvbiA9IHtcbiAgICAgICAgc3RhcnRzV2l0aDogJ1N0YXJ0cyB3aXRoJyxcbiAgICAgICAgY29udGFpbnM6ICdDb250YWlucycsXG4gICAgICAgIG5vdENvbnRhaW5zOiAnTm90IGNvbnRhaW5zJyxcbiAgICAgICAgZW5kc1dpdGg6ICdFbmRzIHdpdGgnLFxuICAgICAgICBlcXVhbHM6ICdFcXVhbHMnLFxuICAgICAgICBub3RFcXVhbHM6ICdOb3QgZXF1YWxzJyxcbiAgICAgICAgbm9GaWx0ZXI6ICdObyBGaWx0ZXInLFxuICAgICAgICBsdDogJ0xlc3MgdGhhbicsXG4gICAgICAgIGx0ZTogJ0xlc3MgdGhhbiBvciBlcXVhbCB0bycsXG4gICAgICAgIGd0OiAnR3JlYXRlciB0aGFuJyxcbiAgICAgICAgZ3RlOiAnR3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvJyxcbiAgICAgICAgaXM6ICdJcycsXG4gICAgICAgIGlzTm90OiAnSXMgbm90JyxcbiAgICAgICAgYmVmb3JlOiAnQmVmb3JlJyxcbiAgICAgICAgYWZ0ZXI6ICdBZnRlcicsXG4gICAgICAgIGRhdGVJczogJ0RhdGUgaXMnLFxuICAgICAgICBkYXRlSXNOb3Q6ICdEYXRlIGlzIG5vdCcsXG4gICAgICAgIGRhdGVCZWZvcmU6ICdEYXRlIGlzIGJlZm9yZScsXG4gICAgICAgIGRhdGVBZnRlcjogJ0RhdGUgaXMgYWZ0ZXInLFxuICAgICAgICBjbGVhcjogJ0NsZWFyJyxcbiAgICAgICAgYXBwbHk6ICdBcHBseScsXG4gICAgICAgIG1hdGNoQWxsOiAnTWF0Y2ggQWxsJyxcbiAgICAgICAgbWF0Y2hBbnk6ICdNYXRjaCBBbnknLFxuICAgICAgICBhZGRSdWxlOiAnQWRkIFJ1bGUnLFxuICAgICAgICByZW1vdmVSdWxlOiAnUmVtb3ZlIFJ1bGUnLFxuICAgICAgICBhY2NlcHQ6ICdZZXMnLFxuICAgICAgICByZWplY3Q6ICdObycsXG4gICAgICAgIGNob29zZTogJ0Nob29zZScsXG4gICAgICAgIHVwbG9hZDogJ1VwbG9hZCcsXG4gICAgICAgIGNhbmNlbDogJ0NhbmNlbCcsXG4gICAgICAgIGRheU5hbWVzOiBbXCJTdW5kYXlcIiwgXCJNb25kYXlcIiwgXCJUdWVzZGF5XCIsIFwiV2VkbmVzZGF5XCIsIFwiVGh1cnNkYXlcIiwgXCJGcmlkYXlcIiwgXCJTYXR1cmRheVwiXSxcbiAgICAgICAgZGF5TmFtZXNTaG9ydDogW1wiU3VuXCIsIFwiTW9uXCIsIFwiVHVlXCIsIFwiV2VkXCIsIFwiVGh1XCIsIFwiRnJpXCIsIFwiU2F0XCJdLFxuICAgICAgICBkYXlOYW1lc01pbjogW1wiU3VcIixcIk1vXCIsXCJUdVwiLFwiV2VcIixcIlRoXCIsXCJGclwiLFwiU2FcIl0sXG4gICAgICAgIG1vbnRoTmFtZXM6IFtcIkphbnVhcnlcIixcIkZlYnJ1YXJ5XCIsXCJNYXJjaFwiLFwiQXByaWxcIixcIk1heVwiLFwiSnVuZVwiLFwiSnVseVwiLFwiQXVndXN0XCIsXCJTZXB0ZW1iZXJcIixcIk9jdG9iZXJcIixcIk5vdmVtYmVyXCIsXCJEZWNlbWJlclwiXSxcbiAgICAgICAgbW9udGhOYW1lc1Nob3J0OiBbXCJKYW5cIiwgXCJGZWJcIiwgXCJNYXJcIiwgXCJBcHJcIiwgXCJNYXlcIiwgXCJKdW5cIixcIkp1bFwiLCBcIkF1Z1wiLCBcIlNlcFwiLCBcIk9jdFwiLCBcIk5vdlwiLCBcIkRlY1wiXSxcbiAgICAgICAgZGF0ZUZvcm1hdDogJ21tL2RkL3l5JyxcbiAgICAgICAgdG9kYXk6ICdUb2RheScsXG4gICAgICAgIHdlZWtIZWFkZXI6ICdXaycsXG4gICAgICAgIHdlYWs6ICdXZWFrJyxcbiAgICAgICAgbWVkaXVtOiAnTWVkaXVtJyxcbiAgICAgICAgc3Ryb25nOiAnU3Ryb25nJyxcbiAgICAgICAgcGFzc3dvcmRQcm9tcHQ6ICdFbnRlciBhIHBhc3N3b3JkJyxcbiAgICAgICAgZW1wdHlNZXNzYWdlOiAnTm8gcmVzdWx0cyBmb3VuZCcsXG4gICAgICAgIGVtcHR5RmlsdGVyTWVzc2FnZTogJ05vIHJlc3VsdHMgZm91bmQnXG4gICAgfVxuXG4gICAgekluZGV4ID0ge1xuICAgICAgICBtb2RhbDogMTEwMCxcbiAgICAgICAgb3ZlcmxheTogMTAwMCxcbiAgICAgICAgbWVudTogMTAwMCxcbiAgICAgICAgdG9vbHRpcDogMTEwMFxuICAgIH1cblxuICAgIHByaXZhdGUgdHJhbnNsYXRpb25Tb3VyY2UgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cbiAgICB0cmFuc2xhdGlvbk9ic2VydmVyID0gdGhpcy50cmFuc2xhdGlvblNvdXJjZS5hc09ic2VydmFibGUoKTtcblxuICAgIGdldFRyYW5zbGF0aW9uKGtleTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zbGF0aW9uW2tleV07XG4gICAgfVxuXG4gICAgc2V0VHJhbnNsYXRpb24odmFsdWU6IFRyYW5zbGF0aW9uKSB7XG4gICAgICAgIHRoaXMudHJhbnNsYXRpb24gPSB7Li4udGhpcy50cmFuc2xhdGlvbiwgLi4udmFsdWV9O1xuICAgICAgICB0aGlzLnRyYW5zbGF0aW9uU291cmNlLm5leHQodGhpcy50cmFuc2xhdGlvbik7XG4gICAgfVxufVxuIl19