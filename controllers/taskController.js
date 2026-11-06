const { v4: uuidv4 } = require('uuid');
let tasks = require('../data/taskData');

exports.createTask = (req, res) => {
    const { title, description, priority, assignee, status } = req.body;
    const newTask = {
        id: uuidv4(),
        title,
        description,
        priority,
        assignee,
        status: status || 'pending',
        createdAt: new Date().toISOString()
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
};

exports.getAllTasks = (req, res) => {
    let result = [...tasks];
    const { status, priority, page, limit, sort } = req.query;

    if (status) result = result.filter(t => t.status === status);
    if (priority) result = result.filter(t => t.priority === priority);

    if (sort === 'createdAt') {
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    if (page && limit) {
        const startIndex = (parseInt(page) - 1) * parseInt(limit);
        const endIndex = startIndex + parseInt(limit);
        result = result.slice(startIndex, endIndex);
    }

    res.status(200).json(result);
};

exports.searchTasks = (req, res) => {
    const { keyword } = req.query;
    if (!keyword) return res.status(400).json({ error: "Arama için 'keyword' parametresi gereklidir." });
    
    const result = tasks.filter(t => 
        t.title.toLowerCase().includes(keyword.toLowerCase()) || 
        t.description.toLowerCase().includes(keyword.toLowerCase())
    );
    res.status(200).json(result);
};

exports.getTasksByAssignee = (req, res) => {
    const { assignee } = req.params;
    const result = tasks.filter(t => t.assignee.toLowerCase() === assignee.toLowerCase());
    res.status(200).json(result);
};

exports.getTaskById = (req, res) => {
    const task = tasks.find(t => t.id === req.params.id);
    if (!task) return res.status(404).json({ error: "Görev bulunamadı." });
    res.status(200).json(task);
};

exports.updateTask = (req, res) => {
    const index = tasks.findIndex(t => t.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "Görev bulunamadı." });

    tasks[index] = { ...tasks[index], ...req.body };
    res.status(200).json(tasks[index]);
};

exports.deleteTask = (req, res) => {
    const index = tasks.findIndex(t => t.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "Görev bulunamadı." });

    tasks.splice(index, 1);
    res.status(200).json({ message: "Görev başarıyla silindi." });
};