/* eslint-disable */

export default class Workspace {
    public backgroundImage: string;
    public frontImage: string;
    public title: string;
    public type: string;
    public update: string;
    public usersCount: number;

    constructor(backgroundImage: string, frontImage: string, title: string, type: string, update: string, usersCount: number) {
        this.backgroundImage = backgroundImage;
        this.frontImage = frontImage;
        this.title = title;
        this.type = type,
        this.update = update,
        this.usersCount = usersCount;
    }


    get typeIcon(): string {
        switch(this.type) {
            case "Client contract": return "assignment";
            case "Corporate": return "apartment";
            case "Group norms": return "book";
            default: return "home";
        }
    }
}