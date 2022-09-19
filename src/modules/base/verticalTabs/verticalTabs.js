import { LightningElement, track } from 'lwc';

export default class VerticalTabs extends LightningElement {
    _selected;
    @track tabs = [];

    connectedCallback() {
        this.selected = window.location.hash?.substring(1);
        window.onpopstate = ({ state }) => this.selected = state?.page;
    }

    initialize(evt) {
        this.tabs = evt.target.assignedNodes();

        if(this.selected.length === 0) {
            this.selected = [...this.tabs].shift().id;
        }
    }

    select(evt) {
        this.selected = evt.currentTarget.dataset.id;
    }

    set selected(id) {
        this._selected = id;
        window.history.replaceState({ page: id }, null, '#'+id);
    }

    get selected() {
        return this._selected;
    }

    get items() {
        return [...this.tabs].map((tab) => {
            if(tab.id === this.selected) {
                tab.classList.remove('slds-hide');
            }
            else {
                tab.classList.add('slds-hide');
            }

            return {
                id: tab.id,
                label: tab.label,
                icon: tab.icon,
                badge: tab.badge,
                classes: 'slds-vertical-tabs__nav-item ' + ((tab.id === this.selected) ? 'slds-is-active' : '')
            };
        });
    }
}
