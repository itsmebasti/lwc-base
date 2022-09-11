import { LightningElement } from 'lwc';

export default class VerticalTabs extends LightningElement {
    _selected;

    connectedCallback() {
        this.selected = window.location.hash?.substring(1);
        window.onpopstate = ({ state }) => this.selected = state?.page;
    }

    select(evt) {
        this.selected = evt.target.id;
        this.querySelectorAll('base-tab').forEach((tab) => tab.show(this.selected));
    }

    set selected(id) {
        this._selected = Number(id);
        window.history.replaceState({ page: id }, null, '#'+id);
    }

    get selected() {
        return this._selected;
    }

    initItems(evt) {
        evt.target.assignedNodes().forEach((tab, id) => {
            this.selected = this.selected ?? id;
            const isContent = false;
            tab.connect(id, isContent);
            tab.show(this.selected);
        });
    }

    initContent(evt) {
        evt.target.assignedNodes().forEach((tab, id) => {
            const isContent = true;
            tab.connect(id, isContent);
            tab.show(this.selected);
        });
    }
}
