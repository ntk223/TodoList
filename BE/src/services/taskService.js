import redisClient from "../config/redis.js";
import { taskModel } from "../models/taskModel.js";
import {env} from "../config/environment.js";

const getAllTasks = async () => {
    // Try to get tasks from Redis cache
    const cachedTasks = await redisClient.get('all_tasks');
    if (cachedTasks) {
        console.log('Fetching tasks from Redis cache');
        return JSON.parse(cachedTasks);
    }

    // If not in cache, fetch from database
    const tasks = await taskModel.getAllTasks();

    // Store the fetched tasks in Redis cache for future requests
    await redisClient.set('all_tasks', JSON.stringify(tasks), {
        EX: env.CACHE_EXPIRATION
    });

    return tasks;
}
const getTaskByUserId = async (userId) => {
    const cachedTasks = await redisClient.get(`tasks_user_${userId}`); // return string json
    if (cachedTasks) {
        console.log(`Fetching tasks for user ${userId} from Redis cache`);
        return JSON.parse(cachedTasks); // convert string json to object
    }

    const tasks = await taskModel.getTaskByUserId(userId);

    await redisClient.set(`tasks_user_${userId}`, JSON.stringify(tasks), {
        EX: env.CACHE_EXPIRATION
    });

    return tasks;
}

const createTask = async (task) => {
    const result = await taskModel.createTask(task);
    // Invalidate the cache for all tasks and tasks by user
    // await redisClient.del('all_tasks');
    await redisClient.del(`tasks_user_${task.user_id}`);
    return result;
}

const updateTask = async (id, fields) => {
    const updatedTask = await taskModel.updateTask(id, fields);
    // Invalidate the cache for all tasks and tasks by user
    // await redisClient.del('all_tasks');
    await redisClient.del(`tasks_user_${updatedTask.user_id}`);
    return updatedTask;
}


export const taskService = {
    getAllTasks,
    getTaskByUserId,
    createTask,
    updateTask,
}
