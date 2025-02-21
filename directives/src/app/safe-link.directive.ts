import { Directive, input } from "@angular/core";

@Directive({
    selector: "a[appSafeLink]",
    standalone: true,
    host: {
        "(click)": "onConfirmLeavePage($event)"
    }
})
export class SafeLinkDirective {
    path = input('myapp');
    constructor() {
        console.log("SafeLinkDirective created");
    }

    onConfirmLeavePage(event: MouseEvent) {
        const wantsToLeave = window.confirm("Do you want to leave this page?");

        if (wantsToLeave){
            const address = (event.target as HTMLAnchorElement).href;
            (event.target as HTMLAnchorElement).href = address + "?from=" + this.path();
            return true;
        }
        else
            return event.preventDefault();
    }
}