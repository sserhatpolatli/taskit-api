let tasks = require('../data/taskData');

exports.getCompletedReports = (req, res) => {
    const completedTasks = tasks.filter(t => t.status === 'completed');
    res.status(200).json({ count: completedTasks.length });
};

exports.getPendingReports = (req, res) => {
    const pendingTasks = tasks.filter(t => t.status === 'pending');
    res.status(200).json({ count: pendingTasks.length });
};

exports.getSummary = (req, res) => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const pending = tasks.filter(t => t.status === 'pending').length;
    
    res.status(200).json({
        totalTasks: total,
        completedTasks: completed,
        pendingTasks: pending
    });
};