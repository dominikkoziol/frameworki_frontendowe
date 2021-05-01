/* eslint-disable */
export default class Workspace {
    public backgroundImage: string;
    public title: string;
    public type: string;
    public update: string;
    public usersCount: number;

    constructor(backgroundImage: string,  title: string, type: string, update: string, usersCount: number) {
        this.backgroundImage = backgroundImage;
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
            case "Contract": return "description";
            default: return "home";
        }
    }
}