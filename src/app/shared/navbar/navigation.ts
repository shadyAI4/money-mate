import { Injectable } from "@angular/core";

export interface NavigationUrl{
    id:string,
    title: string,
    url: string,
}

const navigationItems = [
    {
        id:"dashboard",
        title: "Dashboard",
        url : "/dashboard"
    },
    {
        id:"expenses",
        title: "Add expenses",
        url : "/add-expenses"
    },
    {
        id:"logout",
        title: "Logout",
        url : "/login"
    }
]

@Injectable()
export class NavigationUrl {
    get() {
        navigationItems;
    }
}