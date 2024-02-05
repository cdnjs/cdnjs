import { Angulartics2 } from '../../angulartics2-core';
import * as i0 from "@angular/core";
export declare type EventTrackAction = 'setEcommerceView' | 'addEcommerceItem' | 'trackEcommerceCartUpdate' | 'trackEcommerceOrder' | 'trackLink' | 'trackGoal' | 'trackSiteSearch' | string;
export declare type ScopeMatomo = 'visit' | 'page';
export interface DimensionsMatomoProperties {
    dimension1?: string;
    dimension2?: string;
    dimension3?: string;
    dimension4?: string;
    dimension5?: string;
    dimension6?: string;
    dimension7?: string;
    dimension8?: string;
    dimension9?: string;
    dimension10?: string;
    dimension11?: string;
    dimension12?: string;
    dimension13?: string;
    dimension14?: string;
    dimension15?: string;
}
export interface SetEcommerceViewMatomoProperties {
    /** @class SetEcommerceViewMatomoProperties */
    productSKU: string;
    /** @class SetEcommerceViewMatomoProperties */
    productName: string;
    /** @class SetEcommerceViewMatomoProperties */
    categoryName: string;
    /** @class SetEcommerceViewMatomoProperties */
    price: string;
}
export interface AddEcommerceItemProperties {
    /** @class AddEcommerceItemProperties */
    productSKU: string;
    /** @class AddEcommerceItemProperties */
    productName: string;
    /** @class AddEcommerceItemProperties */
    productCategory: string;
    /** @class AddEcommerceItemProperties */
    price: string;
    /** @class AddEcommerceItemProperties */
    quantity: string;
}
export interface TrackEcommerceCartUpdateMatomoProperties {
    /** @class TrackEcommerceCartUpdateMatomoProperties */
    grandTotal: string;
}
export interface TrackEcommerceOrderMatomoProperties {
    /** @class TrackEcommerceOrderMatomoProperties */
    orderId: string;
    /** @class TrackEcommerceOrderMatomoProperties */
    grandTotal: string;
    /** @class TrackEcommerceOrderMatomoProperties */
    subTotal: string;
    /** @class TrackEcommerceOrderMatomoProperties */
    tax: string;
    /** @class TrackEcommerceOrderMatomoProperties */
    shipping: string;
    /** @class TrackEcommerceOrderMatomoProperties */
    discount: string;
}
export interface TrackLinkMatomoProperties {
    /** @class TrackLinkMatomoProperties */
    url: string;
    /** @class TrackLinkMatomoProperties */
    linkType: string;
}
export interface TrackGoalMatomoProperties {
    /** @class TrackGoalMatomoProperties */
    goalId: string;
    /** @class TrackGoalMatomoProperties */
    value: string;
}
export interface TrackSiteSearchMatomoProperties {
    /** @class TrackSiteSearchMatomoProperties */
    keyword: string;
    /** @class TrackSiteSearchMatomoProperties */
    category: string;
    /** @class TrackSiteSearchMatomoProperties */
    searchCount: string;
}
export interface TrackEventMatomoProperties {
    /** @class TrackEventMatomoProperties */
    category: string;
    /** @class TrackEventMatomoProperties */
    name?: string;
    /** @class TrackEventMatomoProperties */
    label?: string;
    /** @class TrackEventMatomoProperties */
    value?: number | string;
}
export interface SetCustomVariableMatomoProperties {
    /** @class SetCustomVariableMatomoProperties */
    index: number;
    /** @class SetCustomVariableMatomoProperties */
    name: string;
    /** @class SetCustomVariableMatomoProperties */
    value: string;
    /** @class SetCustomVariableMatomoProperties */
    scope: ScopeMatomo;
}
export interface DeleteCustomVariableMatomoProperties {
    /** @class DeleteCustomVariableMatomoProperties */
    index: number;
    /** @class DeleteCustomVariableMatomoProperties */
    scope: ScopeMatomo;
}
export declare type EventTrackactionProperties = SetEcommerceViewMatomoProperties | AddEcommerceItemProperties | TrackEcommerceCartUpdateMatomoProperties | TrackEcommerceOrderMatomoProperties | TrackLinkMatomoProperties | TrackGoalMatomoProperties | TrackSiteSearchMatomoProperties | TrackEventMatomoProperties;
export declare class Angulartics2Matomo {
    private angulartics2;
    constructor(angulartics2: Angulartics2);
    startTracking(): void;
    pageTrack(path: string, title?: string): void;
    resetUser(): void;
    eventTrack(action: 'setEcommerceView', properties: SetEcommerceViewMatomoProperties): void;
    eventTrack(action: 'addEcommerceItem', properties: AddEcommerceItemProperties): void;
    eventTrack(action: 'trackEcommerceCartUpdate', properties: TrackEcommerceCartUpdateMatomoProperties): void;
    eventTrack(action: 'trackEcommerceOrder', properties: TrackEcommerceOrderMatomoProperties): void;
    eventTrack(action: 'trackLink', properties: TrackLinkMatomoProperties): void;
    eventTrack(action: 'trackGoal', properties: TrackGoalMatomoProperties): void;
    eventTrack(action: 'trackSiteSearch', properties: TrackSiteSearchMatomoProperties): void;
    eventTrack(action: string, properties: TrackEventMatomoProperties): void;
    setUsername(userId: string | boolean): void;
    /**
     * Sets custom dimensions if at least one property has the key "dimension<n>",
     * e.g. dimension10. If there are custom dimensions, any other property is ignored.
     *
     * If there are no custom dimensions in the given properties object, the properties
     * object is saved as a custom variable.
     *
     * If in doubt, prefer custom dimensions.
     * @link https://matomo.org/docs/custom-variables/
     */
    setUserProperties(properties: SetCustomVariableMatomoProperties | DimensionsMatomoProperties): void;
    /**
     * If you created a custom variable and then decide to remove this variable from
     * a visit or page view, you can use deleteCustomVariable.
     *
     * @link https://developer.matomo.org/guides/tracking-javascript-guide#deleting-a-custom-variable
     */
    deletedUserProperties(properties: DeleteCustomVariableMatomoProperties): void;
    private setCustomDimensions;
    static ɵfac: i0.ɵɵFactoryDeclaration<Angulartics2Matomo, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<Angulartics2Matomo>;
}
