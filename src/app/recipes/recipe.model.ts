export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string; // will store the path, from the web

    constructor(name: string, desc: string, imagePath: string) {
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
    }
}