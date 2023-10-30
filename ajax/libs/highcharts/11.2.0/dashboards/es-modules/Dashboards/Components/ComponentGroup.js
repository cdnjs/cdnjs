/* *
 *
 *  (c) 2009 - 2023 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sebastian Bochan
 *  - Wojciech Chmiel
 *  - Gøran Slettemark
 *  - Sophie Bremer
 *
 * */
import SharedState from './SharedComponentState.js';
class ComponentGroup {
    static getComponentGroup(groupID) {
        if (this.componentGroups[groupID]) {
            return this.componentGroups[groupID];
        }
    }
    static addComponentGroup(group) {
        const { id } = group;
        if (!this.componentGroups[id]) {
            this.componentGroups[id] = group;
        }
    }
    static getGroupsFromComponent(componentID) {
        const groups = Object.keys(this.componentGroups);
        return groups.reduce((arr, groupKey) => {
            const group = this.getComponentGroup(groupKey);
            if (group && group.components.indexOf(componentID) > -1) {
                arr.push(group);
            }
            return arr;
        }, []);
    }
    constructor(id) {
        this.state = new SharedState();
        this.components = [];
        this.id = id;
        ComponentGroup.addComponentGroup(this);
    }
    addComponents(components) {
        while (components.length) {
            const id = components.pop();
            if (!id) {
                break;
            }
            if (this.components.indexOf(id) === -1) {
                this.components.push(id);
            }
        }
    }
    removeComponents(components) {
        while (components.length) {
            const id = components.pop();
            if (!id) {
                break;
            }
            const index = this.components.indexOf(id);
            if (index > -1) {
                this.components.splice(index, 1);
            }
        }
    }
    getSharedState() {
        return this.state;
    }
    on() {
        throw new Error('Method not implemented.');
    }
    emit() {
        throw new Error('Method not implemented.');
    }
}
ComponentGroup.componentGroups = {};
export default ComponentGroup;
