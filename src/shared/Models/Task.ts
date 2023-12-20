import { uuid } from 'uuidv4';

export class Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;

    constructor(title: string, description: string, completed = false) {
        this.id = uuid();
        this.title = title;
        this.description = description;
        this.completed = completed;
    }

    markAsCompleted() {
        this.completed = true;
    }
}