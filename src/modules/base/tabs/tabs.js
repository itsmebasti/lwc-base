import { LightningElement, track, api } from 'lwc';

export default class VerticalTabs extends LightningElement {
    @api vertical = false;
    @track tabs = [];
    _selected;
    mobile;

    connectedCallback() {
        this.selected = window.location.hash?.substring(1);
        window.onpopstate = ({ state }) => this.selected = state?.page;
        
        const mediaMatcher = window.matchMedia(`(max-width: 1024px)`);
        this.mobile = mediaMatcher.matches;
        mediaMatcher.addEventListener("change", ({matches}) => this.mobile = matches);
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
                classes: (this.renderVertically ? 'slds-vertical-tabs__nav-item ' : 'slds-tabs_scoped__item ') + ((tab.id === this.selected) ? 'slds-is-active' : '')
            };
        });
    }
    
    get renderVertically() {
        return this.vertical || !this.mobile;
    }
    
    get divClass() {
        return this.renderVertically ? 'slds-vertical-tabs' : 'slds-tabs_scoped';
    }
    
    get ulClass() {
        return this.renderVertically ? 'slds-vertical-tabs__nav' : 'slds-tabs_scoped__nav';
    }
    
    get linkClass() {
        return this.renderVertically ? 'slds-vertical-tabs__link' : 'slds-tabs_scoped__link';
    }
    
    get iconClass() {
        return this.renderVertically ? 'slds-vertical-tabs__left-icon' : '';
    }
}
