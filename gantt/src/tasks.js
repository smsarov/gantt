class Task{
    constructor(id, name, group_id, from, to, deps = []){
        this.id = id;
        this.name = name;
        this.group_id = group_id;
        this.from = from;
        this.to = to;
        this.deps = deps;
    }
}

const dates = [
    new Task(1, 'A', 1, new Date(2024, 1, 12), new Date(2024, 1, 15)),
    new Task(2, 'B', 2, new Date(2024, 1, 14), new Date(2024, 1, 16)),
    new Task(3, 'C', 1, new Date(2024, 1, 17), new Date(2024, 1, 18), [1, 2]),
    new Task(4, 'D', 3, new Date(2024, 1, 15), new Date(2024, 2, 21)),
    new Task(5, 'E', 2, new Date(2024, 1, 20), new Date(2024, 2, 5), [1]),
    new Task(6, 'F', 1, new Date(2024, 1, 22), new Date(2024, 2, 1)),
    new Task(7, 'G', 4, new Date(2024, 1, 15), new Date(2024, 1, 25)),
    new Task(8, 'H', 4, new Date(2024, 1, 27), new Date(2024, 2, 14)),
    new Task(9, 'J', 5, new Date(2024, 1, 18), new Date(2024, 2, 1)),
    new Task(10, 'K', 5, new Date(2024, 2, 3), new Date(2024, 2, 13)),
]



export default dates