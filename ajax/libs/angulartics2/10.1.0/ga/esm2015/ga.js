import { Injectable } from '@angular/core';
import { Angulartics2, } from 'angulartics2';
import * as i0 from "@angular/core";
import * as i1 from "angulartics2";
export class GoogleAnalyticsDefaults {
    constructor() {
        this.additionalAccountNames = [];
        this.userId = null;
        this.transport = '';
        this.anonymizeIp = false;
    }
}
export class Angulartics2GoogleAnalytics {
    constructor(angulartics2) {
        this.angulartics2 = angulartics2;
        this.dimensionsAndMetrics = [];
        const defaults = new GoogleAnalyticsDefaults();
        // Set the default settings for this module
        this.angulartics2.settings.ga = Object.assign(Object.assign({}, defaults), this.angulartics2.settings.ga);
        this.settings = this.angulartics2.settings.ga;
        this.angulartics2.setUsername.subscribe((x) => this.setUsername(x));
        this.angulartics2.setUserProperties.subscribe(x => this.setUserProperties(x));
    }
    startTracking() {
        this.angulartics2.pageTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(x => this.pageTrack(x.path));
        this.angulartics2.eventTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(x => this.eventTrack(x.action, x.properties));
        this.angulartics2.exceptionTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(x => this.exceptionTrack(x));
        this.angulartics2.userTimings
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(x => this.userTimings(x));
    }
    pageTrack(path) {
        if (typeof _gaq !== 'undefined' && _gaq) {
            _gaq.push(['_trackPageview', path]);
            for (const accountName of this.angulartics2.settings.ga.additionalAccountNames) {
                _gaq.push([accountName + '._trackPageview', path]);
            }
        }
        if (typeof ga !== 'undefined' && ga) {
            if (this.angulartics2.settings.ga.userId) {
                ga('set', '&uid', this.angulartics2.settings.ga.userId);
                for (const accountName of this.angulartics2.settings.ga.additionalAccountNames) {
                    ga(accountName + '.set', '&uid', this.angulartics2.settings.ga.userId);
                }
            }
            if (this.angulartics2.settings.ga.anonymizeIp) {
                ga('set', 'anonymizeIp', true);
                for (const accountName of this.angulartics2.settings.ga.additionalAccountNames) {
                    ga(accountName + '.set', 'anonymizeIp', true);
                }
            }
            ga('send', 'pageview', path);
            for (const accountName of this.angulartics2.settings.ga.additionalAccountNames) {
                ga(accountName + '.send', 'pageview', path);
            }
        }
    }
    /**
     * Track Event in GA
     *
     * @param action Associated with the event
     * @param properties Comprised of:
     *  - category (string) and optional
     *  - label (string)
     *  - value (integer)
     *  - noninteraction (boolean)
     *
     * @link https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide#SettingUpEventTracking
     * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/events
     */
    eventTrack(action, properties) {
        // Google Analytics requires an Event Category
        if (!properties || !properties.category) {
            properties = properties || {};
            properties.category = 'Event';
        }
        // GA requires that eventValue be an integer, see:
        // https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#eventValue
        // https://github.com/luisfarzati/angulartics/issues/81
        if (properties.value) {
            const parsed = parseInt(properties.value, 10);
            properties.value = isNaN(parsed) ? 0 : parsed;
        }
        if (typeof ga !== 'undefined') {
            const eventOptions = Object.assign({ eventCategory: properties.category, eventAction: action, eventLabel: properties.label, eventValue: properties.value, nonInteraction: properties.noninteraction, page: properties.page || location.hash.substring(1) || location.pathname, userId: this.angulartics2.settings.ga.userId, hitCallback: properties.hitCallback }, this.angulartics2.settings.ga.transport && { transport: this.angulartics2.settings.ga.transport });
            // add custom dimensions and metrics
            this.setDimensionsAndMetrics(properties);
            ga('send', 'event', eventOptions);
            for (const accountName of this.angulartics2.settings.ga.additionalAccountNames) {
                ga(accountName + '.send', 'event', eventOptions);
            }
        }
        else if (typeof _gaq !== 'undefined') {
            _gaq.push([
                '_trackEvent',
                properties.category,
                action,
                properties.label,
                properties.value,
                properties.noninteraction,
            ]);
        }
    }
    /**
     * Exception Track Event in GA
     *
     * @param properties Comprised of the optional fields:
     *  - fatal (string)
     *  - description (string)
     *
     * @https://developers.google.com/analytics/devguides/collection/analyticsjs/exceptions
     *
     * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/events
     */
    exceptionTrack(properties) {
        if (properties.fatal === undefined) {
            console.log('No "fatal" provided, sending with fatal=true');
            properties.fatal = true;
        }
        properties.exDescription = properties.description;
        const eventOptions = {
            exFatal: properties.fatal,
            exDescription: properties.description,
        };
        ga('send', 'exception', eventOptions);
        for (const accountName of this.angulartics2.settings.ga.additionalAccountNames) {
            ga(accountName + '.send', 'exception', eventOptions);
        }
    }
    /**
     * User Timings Event in GA
     *
     * @param properties Comprised of the mandatory fields:
     *  - timingCategory (string)
     *  - timingVar (string)
     *  - timingValue (number)
     * Properties can also have the optional fields:
     *  - timingLabel (string)
     *
     * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/user-timings
     */
    userTimings(properties) {
        if (!properties ||
            !properties.timingCategory ||
            !properties.timingVar ||
            !properties.timingValue) {
            console.error('Properties timingCategory, timingVar, and timingValue are required to be set.');
            return;
        }
        if (typeof ga !== 'undefined') {
            ga('send', 'timing', properties);
            for (const accountName of this.angulartics2.settings.ga.additionalAccountNames) {
                ga(accountName + '.send', 'timing', properties);
            }
        }
    }
    setUsername(userId) {
        this.angulartics2.settings.ga.userId = userId;
        if (typeof ga === 'undefined') {
            return;
        }
        ga('set', 'userId', userId);
    }
    setUserProperties(properties) {
        this.setDimensionsAndMetrics(properties);
    }
    setDimensionsAndMetrics(properties) {
        if (typeof ga === 'undefined') {
            return;
        }
        // clean previously used dimensions and metrics that will not be overriden
        this.dimensionsAndMetrics.forEach(elem => {
            if (!properties.hasOwnProperty(elem)) {
                ga('set', elem, undefined);
                this.angulartics2.settings.ga.additionalAccountNames.forEach((accountName) => {
                    ga(`${accountName}.set`, elem, undefined);
                });
            }
        });
        this.dimensionsAndMetrics = [];
        // add custom dimensions and metrics
        Object.keys(properties).forEach(key => {
            if (key.lastIndexOf('dimension', 0) === 0 ||
                key.lastIndexOf('metric', 0) === 0) {
                ga('set', key, properties[key]);
                this.angulartics2.settings.ga.additionalAccountNames.forEach((accountName) => {
                    ga(`${accountName}.set`, key, properties[key]);
                });
                this.dimensionsAndMetrics.push(key);
            }
        });
    }
}
Angulartics2GoogleAnalytics.ɵprov = i0.ɵɵdefineInjectable({ factory: function Angulartics2GoogleAnalytics_Factory() { return new Angulartics2GoogleAnalytics(i0.ɵɵinject(i1.Angulartics2)); }, token: Angulartics2GoogleAnalytics, providedIn: "root" });
Angulartics2GoogleAnalytics.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
Angulartics2GoogleAnalytics.ctorParameters = () => [
    { type: Angulartics2 }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2EuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL3Byb3ZpZGVycy9nYS9nYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFDTCxZQUFZLEdBR2IsTUFBTSxjQUFjLENBQUM7OztBQU90QixNQUFNLE9BQU8sdUJBQXVCO0lBQXBDO1FBQ0UsMkJBQXNCLEdBQUcsRUFBRSxDQUFDO1FBQzVCLFdBQU0sR0FBRyxJQUFJLENBQUM7UUFDZCxjQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ2YsZ0JBQVcsR0FBRyxLQUFLLENBQUM7SUFDdEIsQ0FBQztDQUFBO0FBR0QsTUFBTSxPQUFPLDJCQUEyQjtJQUl0QyxZQUFvQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUg5Qyx5QkFBb0IsR0FBRyxFQUFFLENBQUM7UUFJeEIsTUFBTSxRQUFRLEdBQUcsSUFBSSx1QkFBdUIsRUFBRSxDQUFDO1FBQy9DLDJDQUEyQztRQUMzQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxFQUFFLG1DQUN4QixRQUFRLEdBQ1IsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUNqQyxDQUFDO1FBQ0YsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7UUFDOUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoRixD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QUMsQ0FBQyxDQUFDO2dCQUNqRCxDQUFDLENBQ0YsQ0FBQztnQkFDRixJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3JDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzs7O1lBcE9GLFVBQVUsU0FBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUU7OztZQWpCaEMsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtcbiAgQW5ndWxhcnRpY3MyLFxuICBHb29nbGVBbmFseXRpY3NTZXR0aW5ncyxcbiAgVXNlclRpbWluZ3MsXG59IGZyb20gJ2FuZ3VsYXJ0aWNzMic7XG5cblxuZGVjbGFyZSB2YXIgX2dhcTogR29vZ2xlQW5hbHl0aWNzQ29kZTtcbmRlY2xhcmUgdmFyIGdhOiBVbml2ZXJzYWxBbmFseXRpY3MuZ2E7XG5kZWNsYXJlIHZhciBsb2NhdGlvbjogYW55O1xuXG5leHBvcnQgY2xhc3MgR29vZ2xlQW5hbHl0aWNzRGVmYXVsdHMgaW1wbGVtZW50cyBHb29nbGVBbmFseXRpY3NTZXR0aW5ncyB7XG4gIGFkZGl0aW9uYWxBY2NvdW50TmFtZXMgPSBbXTtcbiAgdXNlcklkID0gbnVsbDtcbiAgdHJhbnNwb3J0ID0gJyc7XG4gIGFub255bWl6ZUlwID0gZmFsc2U7XG59XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgQW5ndWxhcnRpY3MyR29vZ2xlQW5hbHl0aWNzIHtcbiAgZGltZW5zaW9uc0FuZE1ldHJpY3MgPSBbXTtcbiAgc2V0dGluZ3M6IFBhcnRpYWw8R29vZ2xlQW5hbHl0aWNzU2V0dGluZ3M+O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYW5ndWxhcnRpY3MyOiBBbmd1bGFydGljczIpIHtcbiAgICBjb25zdCBkZWZhdWx0cyA9IG5ldyBHb29nbGVBbmFseXRpY3NEZWZhdWx0cygpO1xuICAgIC8vIFNldCB0aGUgZGVmYXVsdCBzZXR0aW5ncyBmb3IgdGhpcyBtb2R1bGVcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXR0aW5ncy5nYSA9IHtcbiAgICAgIC4uLmRlZmF1bHRzLFxuICAgICAgLi4udGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MuZ2EsXG4gICAgfTtcbiAgICB0aGlzLnNldHRpbmdzID0gdGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MuZ2E7XG4gICAgdGhpcy5hbmd1bGFydGljczIuc2V0VXNlcm5hbWUuc3Vic2NyaWJlKCh4OiBzdHJpbmcpID0+IHRoaXMuc2V0VXNlcm5hbWUoeCkpO1xuICAgIHRoaXMuYW5ndWxhcnRpY3MyLnNldFVzZXJQcm9wZXJ0aWVzLnN1YnNjcmliZSh4ID0+IHRoaXMuc2V0VXNlclByb3BlcnRpZXMoeCkpO1xuICB9XG5cbiAgc3RhcnRUcmFja2luZygpOiB2b2lkIHtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5wYWdlVHJhY2tcbiAgICAgIC5waXBlKHRoaXMuYW5ndWxhcnRpY3MyLmZpbHRlckRldmVsb3Blck1vZGUoKSlcbiAgICAgIC5zdWJzY3JpYmUoeCA9PiB0aGlzLnBhZ2VUcmFjayh4LnBhdGgpKTtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5ldmVudFRyYWNrXG4gICAgICAucGlwZSh0aGlzLmFuZ3VsYXJ0aWNzMi5maWx0ZXJEZXZlbG9wZXJNb2RlKCkpXG4gICAgICAuc3Vic2NyaWJlKHggPT4gdGhpcy5ldmVudFRyYWNrKHguYWN0aW9uLCB4LnByb3BlcnRpZXMpKTtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5leGNlcHRpb25UcmFja1xuICAgICAgLnBpcGUodGhpcy5hbmd1bGFydGljczIuZmlsdGVyRGV2ZWxvcGVyTW9kZSgpKVxuICAgICAgLnN1YnNjcmliZSh4ID0+IHRoaXMuZXhjZXB0aW9uVHJhY2soeCkpO1xuICAgIHRoaXMuYW5ndWxhcnRpY3MyLnVzZXJUaW1pbmdzXG4gICAgICAucGlwZSh0aGlzLmFuZ3VsYXJ0aWNzMi5maWx0ZXJEZXZlbG9wZXJNb2RlKCkpXG4gICAgICAuc3Vic2NyaWJlKHggPT4gdGhpcy51c2VyVGltaW5ncyh4KSk7XG4gIH1cblxuICBwYWdlVHJhY2socGF0aDogc3RyaW5nKSB7XG4gICAgaWYgKHR5cGVvZiBfZ2FxICE9PSAndW5kZWZpbmVkJyAmJiBfZ2FxKSB7XG4gICAgICBfZ2FxLnB1c2goWydfdHJhY2tQYWdldmlldycsIHBhdGhdKTtcbiAgICAgIGZvciAoY29uc3QgYWNjb3VudE5hbWUgb2YgdGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MuZ2EuYWRkaXRpb25hbEFjY291bnROYW1lcykge1xuICAgICAgICBfZ2FxLnB1c2goW2FjY291bnROYW1lICsgJy5fdHJhY2tQYWdldmlldycsIHBhdGhdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHR5cGVvZiBnYSAhPT0gJ3VuZGVmaW5lZCcgJiYgZ2EpIHtcbiAgICAgIGlmICh0aGlzLmFuZ3VsYXJ0aWNzMi5zZXR0aW5ncy5nYS51c2VySWQpIHtcbiAgICAgICAgZ2EoJ3NldCcsICcmdWlkJywgdGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MuZ2EudXNlcklkKTtcbiAgICAgICAgZm9yIChjb25zdCBhY2NvdW50TmFtZSBvZiB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXR0aW5ncy5nYS5hZGRpdGlvbmFsQWNjb3VudE5hbWVzKSB7XG4gICAgICAgICAgZ2EoYWNjb3VudE5hbWUgKyAnLnNldCcsICcmdWlkJywgdGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MuZ2EudXNlcklkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMuYW5ndWxhcnRpY3MyLnNldHRpbmdzLmdhLmFub255bWl6ZUlwKSB7XG4gICAgICAgIGdhKCdzZXQnLCAnYW5vbnltaXplSXAnLCB0cnVlKTtcbiAgICAgICAgZm9yIChjb25zdCBhY2NvdW50TmFtZSBvZiB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXR0aW5ncy5nYS5hZGRpdGlvbmFsQWNjb3VudE5hbWVzKSB7XG4gICAgICAgICAgZ2EoYWNjb3VudE5hbWUgKyAnLnNldCcsICdhbm9ueW1pemVJcCcsIHRydWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBnYSgnc2VuZCcsICdwYWdldmlldycsIHBhdGgpO1xuICAgICAgZm9yIChjb25zdCBhY2NvdW50TmFtZSBvZiB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXR0aW5ncy5nYS5hZGRpdGlvbmFsQWNjb3VudE5hbWVzKSB7XG4gICAgICAgIGdhKGFjY291bnROYW1lICsgJy5zZW5kJywgJ3BhZ2V2aWV3JywgcGF0aCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRyYWNrIEV2ZW50IGluIEdBXG4gICAqXG4gICAqIEBwYXJhbSBhY3Rpb24gQXNzb2NpYXRlZCB3aXRoIHRoZSBldmVudFxuICAgKiBAcGFyYW0gcHJvcGVydGllcyBDb21wcmlzZWQgb2Y6XG4gICAqICAtIGNhdGVnb3J5IChzdHJpbmcpIGFuZCBvcHRpb25hbFxuICAgKiAgLSBsYWJlbCAoc3RyaW5nKVxuICAgKiAgLSB2YWx1ZSAoaW50ZWdlcilcbiAgICogIC0gbm9uaW50ZXJhY3Rpb24gKGJvb2xlYW4pXG4gICAqXG4gICAqIEBsaW5rIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL2FuYWx5dGljcy9kZXZndWlkZXMvY29sbGVjdGlvbi9nYWpzL2V2ZW50VHJhY2tlckd1aWRlI1NldHRpbmdVcEV2ZW50VHJhY2tpbmdcbiAgICogQGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vYW5hbHl0aWNzL2Rldmd1aWRlcy9jb2xsZWN0aW9uL2FuYWx5dGljc2pzL2V2ZW50c1xuICAgKi9cbiAgZXZlbnRUcmFjayhhY3Rpb246IHN0cmluZywgcHJvcGVydGllczogYW55KSB7XG4gICAgLy8gR29vZ2xlIEFuYWx5dGljcyByZXF1aXJlcyBhbiBFdmVudCBDYXRlZ29yeVxuICAgIGlmICghcHJvcGVydGllcyB8fCAhcHJvcGVydGllcy5jYXRlZ29yeSkge1xuICAgICAgcHJvcGVydGllcyA9IHByb3BlcnRpZXMgfHwge307XG4gICAgICBwcm9wZXJ0aWVzLmNhdGVnb3J5ID0gJ0V2ZW50JztcbiAgICB9XG4gICAgLy8gR0EgcmVxdWlyZXMgdGhhdCBldmVudFZhbHVlIGJlIGFuIGludGVnZXIsIHNlZTpcbiAgICAvLyBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9hbmFseXRpY3MvZGV2Z3VpZGVzL2NvbGxlY3Rpb24vYW5hbHl0aWNzanMvZmllbGQtcmVmZXJlbmNlI2V2ZW50VmFsdWVcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vbHVpc2ZhcnphdGkvYW5ndWxhcnRpY3MvaXNzdWVzLzgxXG4gICAgaWYgKHByb3BlcnRpZXMudmFsdWUpIHtcbiAgICAgIGNvbnN0IHBhcnNlZCA9IHBhcnNlSW50KHByb3BlcnRpZXMudmFsdWUsIDEwKTtcbiAgICAgIHByb3BlcnRpZXMudmFsdWUgPSBpc05hTihwYXJzZWQpID8gMCA6IHBhcnNlZDtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGdhICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc3QgZXZlbnRPcHRpb25zID0ge1xuICAgICAgICBldmVudENhdGVnb3J5OiBwcm9wZXJ0aWVzLmNhdGVnb3J5LFxuICAgICAgICBldmVudEFjdGlvbjogYWN0aW9uLFxuICAgICAgICBldmVudExhYmVsOiBwcm9wZXJ0aWVzLmxhYmVsLFxuICAgICAgICBldmVudFZhbHVlOiBwcm9wZXJ0aWVzLnZhbHVlLFxuICAgICAgICBub25JbnRlcmFjdGlvbjogcHJvcGVydGllcy5ub25pbnRlcmFjdGlvbixcbiAgICAgICAgcGFnZTogcHJvcGVydGllcy5wYWdlIHx8IGxvY2F0aW9uLmhhc2guc3Vic3RyaW5nKDEpIHx8IGxvY2F0aW9uLnBhdGhuYW1lLFxuICAgICAgICB1c2VySWQ6IHRoaXMuYW5ndWxhcnRpY3MyLnNldHRpbmdzLmdhLnVzZXJJZCxcbiAgICAgICAgaGl0Q2FsbGJhY2s6IHByb3BlcnRpZXMuaGl0Q2FsbGJhY2ssXG4gICAgICAgIC4uLiB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXR0aW5ncy5nYS50cmFuc3BvcnQgJiYgeyB0cmFuc3BvcnQ6IHRoaXMuYW5ndWxhcnRpY3MyLnNldHRpbmdzLmdhLnRyYW5zcG9ydCB9XG4gICAgICB9O1xuXG4gICAgICAvLyBhZGQgY3VzdG9tIGRpbWVuc2lvbnMgYW5kIG1ldHJpY3NcbiAgICAgIHRoaXMuc2V0RGltZW5zaW9uc0FuZE1ldHJpY3MocHJvcGVydGllcyk7XG5cbiAgICAgIGdhKCdzZW5kJywgJ2V2ZW50JywgZXZlbnRPcHRpb25zKTtcblxuICAgICAgZm9yIChjb25zdCBhY2NvdW50TmFtZSBvZiB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXR0aW5ncy5nYS5hZGRpdGlvbmFsQWNjb3VudE5hbWVzKSB7XG4gICAgICAgIGdhKGFjY291bnROYW1lICsgJy5zZW5kJywgJ2V2ZW50JywgZXZlbnRPcHRpb25zKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBfZ2FxICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgX2dhcS5wdXNoKFtcbiAgICAgICAgJ190cmFja0V2ZW50JyxcbiAgICAgICAgcHJvcGVydGllcy5jYXRlZ29yeSxcbiAgICAgICAgYWN0aW9uLFxuICAgICAgICBwcm9wZXJ0aWVzLmxhYmVsLFxuICAgICAgICBwcm9wZXJ0aWVzLnZhbHVlLFxuICAgICAgICBwcm9wZXJ0aWVzLm5vbmludGVyYWN0aW9uLFxuICAgICAgXSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEV4Y2VwdGlvbiBUcmFjayBFdmVudCBpbiBHQVxuICAgKlxuICAgKiBAcGFyYW0gcHJvcGVydGllcyBDb21wcmlzZWQgb2YgdGhlIG9wdGlvbmFsIGZpZWxkczpcbiAgICogIC0gZmF0YWwgKHN0cmluZylcbiAgICogIC0gZGVzY3JpcHRpb24gKHN0cmluZylcbiAgICpcbiAgICogQGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL2FuYWx5dGljcy9kZXZndWlkZXMvY29sbGVjdGlvbi9hbmFseXRpY3Nqcy9leGNlcHRpb25zXG4gICAqXG4gICAqIEBsaW5rIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL2FuYWx5dGljcy9kZXZndWlkZXMvY29sbGVjdGlvbi9hbmFseXRpY3Nqcy9ldmVudHNcbiAgICovXG4gIGV4Y2VwdGlvblRyYWNrKHByb3BlcnRpZXM6IGFueSkge1xuICAgIGlmIChwcm9wZXJ0aWVzLmZhdGFsID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdObyBcImZhdGFsXCIgcHJvdmlkZWQsIHNlbmRpbmcgd2l0aCBmYXRhbD10cnVlJyk7XG4gICAgICBwcm9wZXJ0aWVzLmZhdGFsID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcm9wZXJ0aWVzLmV4RGVzY3JpcHRpb24gPSBwcm9wZXJ0aWVzLmRlc2NyaXB0aW9uO1xuXG4gICAgY29uc3QgZXZlbnRPcHRpb25zID0ge1xuICAgICAgZXhGYXRhbDogcHJvcGVydGllcy5mYXRhbCxcbiAgICAgIGV4RGVzY3JpcHRpb246IHByb3BlcnRpZXMuZGVzY3JpcHRpb24sXG4gICAgfTtcblxuICAgIGdhKCdzZW5kJywgJ2V4Y2VwdGlvbicsIGV2ZW50T3B0aW9ucyk7XG4gICAgZm9yIChjb25zdCBhY2NvdW50TmFtZSBvZiB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXR0aW5ncy5nYS5hZGRpdGlvbmFsQWNjb3VudE5hbWVzKSB7XG4gICAgICBnYShhY2NvdW50TmFtZSArICcuc2VuZCcsICdleGNlcHRpb24nLCBldmVudE9wdGlvbnMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VyIFRpbWluZ3MgRXZlbnQgaW4gR0FcbiAgICpcbiAgICogQHBhcmFtIHByb3BlcnRpZXMgQ29tcHJpc2VkIG9mIHRoZSBtYW5kYXRvcnkgZmllbGRzOlxuICAgKiAgLSB0aW1pbmdDYXRlZ29yeSAoc3RyaW5nKVxuICAgKiAgLSB0aW1pbmdWYXIgKHN0cmluZylcbiAgICogIC0gdGltaW5nVmFsdWUgKG51bWJlcilcbiAgICogUHJvcGVydGllcyBjYW4gYWxzbyBoYXZlIHRoZSBvcHRpb25hbCBmaWVsZHM6XG4gICAqICAtIHRpbWluZ0xhYmVsIChzdHJpbmcpXG4gICAqXG4gICAqIEBsaW5rIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL2FuYWx5dGljcy9kZXZndWlkZXMvY29sbGVjdGlvbi9hbmFseXRpY3Nqcy91c2VyLXRpbWluZ3NcbiAgICovXG4gIHVzZXJUaW1pbmdzKHByb3BlcnRpZXM6IFVzZXJUaW1pbmdzKSB7XG4gICAgaWYgKFxuICAgICAgIXByb3BlcnRpZXMgfHxcbiAgICAgICFwcm9wZXJ0aWVzLnRpbWluZ0NhdGVnb3J5IHx8XG4gICAgICAhcHJvcGVydGllcy50aW1pbmdWYXIgfHxcbiAgICAgICFwcm9wZXJ0aWVzLnRpbWluZ1ZhbHVlXG4gICAgKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAnUHJvcGVydGllcyB0aW1pbmdDYXRlZ29yeSwgdGltaW5nVmFyLCBhbmQgdGltaW5nVmFsdWUgYXJlIHJlcXVpcmVkIHRvIGJlIHNldC4nLFxuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGdhICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgZ2EoJ3NlbmQnLCAndGltaW5nJywgcHJvcGVydGllcyk7XG4gICAgICBmb3IgKGNvbnN0IGFjY291bnROYW1lIG9mIHRoaXMuYW5ndWxhcnRpY3MyLnNldHRpbmdzLmdhLmFkZGl0aW9uYWxBY2NvdW50TmFtZXMpIHtcbiAgICAgICAgZ2EoYWNjb3VudE5hbWUgKyAnLnNlbmQnLCAndGltaW5nJywgcHJvcGVydGllcyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2V0VXNlcm5hbWUodXNlcklkOiBzdHJpbmcpIHtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXR0aW5ncy5nYS51c2VySWQgPSB1c2VySWQ7XG4gICAgaWYgKHR5cGVvZiBnYSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZ2EoJ3NldCcsICd1c2VySWQnLCB1c2VySWQpO1xuICB9XG5cbiAgc2V0VXNlclByb3BlcnRpZXMocHJvcGVydGllczogYW55KSB7XG4gICAgdGhpcy5zZXREaW1lbnNpb25zQW5kTWV0cmljcyhwcm9wZXJ0aWVzKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0RGltZW5zaW9uc0FuZE1ldHJpY3MocHJvcGVydGllczogYW55KSB7XG4gICAgaWYgKHR5cGVvZiBnYSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gY2xlYW4gcHJldmlvdXNseSB1c2VkIGRpbWVuc2lvbnMgYW5kIG1ldHJpY3MgdGhhdCB3aWxsIG5vdCBiZSBvdmVycmlkZW5cbiAgICB0aGlzLmRpbWVuc2lvbnNBbmRNZXRyaWNzLmZvckVhY2goZWxlbSA9PiB7XG4gICAgICBpZiAoIXByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkoZWxlbSkpIHtcbiAgICAgICAgZ2EoJ3NldCcsIGVsZW0sIHVuZGVmaW5lZCk7XG5cbiAgICAgICAgdGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MuZ2EuYWRkaXRpb25hbEFjY291bnROYW1lcy5mb3JFYWNoKFxuICAgICAgICAgIChhY2NvdW50TmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBnYShgJHthY2NvdW50TmFtZX0uc2V0YCwgZWxlbSwgdW5kZWZpbmVkKTtcbiAgICAgICAgICB9LFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuZGltZW5zaW9uc0FuZE1ldHJpY3MgPSBbXTtcblxuICAgIC8vIGFkZCBjdXN0b20gZGltZW5zaW9ucyBhbmQgbWV0cmljc1xuICAgIE9iamVjdC5rZXlzKHByb3BlcnRpZXMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGlmIChcbiAgICAgICAga2V5Lmxhc3RJbmRleE9mKCdkaW1lbnNpb24nLCAwKSA9PT0gMCB8fFxuICAgICAgICBrZXkubGFzdEluZGV4T2YoJ21ldHJpYycsIDApID09PSAwXG4gICAgICApIHtcbiAgICAgICAgZ2EoJ3NldCcsIGtleSwgcHJvcGVydGllc1trZXldKTtcblxuICAgICAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXR0aW5ncy5nYS5hZGRpdGlvbmFsQWNjb3VudE5hbWVzLmZvckVhY2goXG4gICAgICAgICAgKGFjY291bnROYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGdhKGAke2FjY291bnROYW1lfS5zZXRgLCBrZXksIHByb3BlcnRpZXNba2V5XSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5kaW1lbnNpb25zQW5kTWV0cmljcy5wdXNoKGtleSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==