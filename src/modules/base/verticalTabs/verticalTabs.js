import { LightningElement, track } from 'lwc';

export default class VerticalTabs extends LightningElement {
    _selected;
    @track tabs = [];
    isDesktop;

    connectedCallback() {
        this.selected = window.location.hash?.substring(1);
        window.onpopstate = ({ state }) => this.selected = state?.page;
        
        window.matchMedia(`(max-width: 1000px)`).addEventListener("change", (evt) => this.isDesktop = !window.matchMedia('(max-width: 1000px)').matches)
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
                classes: (this.isDesktop ? 'slds-vertical-tabs__nav-item ' : 'slds-tabs_scoped__item ') + ((tab.id === this.selected) ? 'slds-is-active' : '')
            };
        });
    }
    
    get divClass() {
        return this.isDesktop ? 'slds-vertical-tabs slds-template__container' : 'slds-tabs_scoped slds-template__container';
    }
    
    get ulClass() {
        return this.isDesktop ? 'slds-vertical-tabs__nav' : 'slds-tabs_scoped__nav';
    }
    
    get linkClass() {
        return this.isDesktop ? 'slds-vertical-tabs__link' : 'slds-tabs_scoped__link';
    }
    
    get contentClass() {
        return this.isDesktop ? 'slds-vertical-tabs__content slds-scrollable' : 'slds-tabs_scoped__content slds-scrollable';
    }
    
    get badgeClass() {
        return this.isDesktop ? 'slds-vertical-tabs__right-icon slds-badge slds-badge_inverse' : '';
    }
    
    get iconClass() {
        return this.isDesktop ? 'slds-vertical-tabs__left-icon' : '';
    }
}
