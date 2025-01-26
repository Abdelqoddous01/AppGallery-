import React,{useState} from "react";


function To_Do_List(){

    const [tasks,updateTasks] = useState([]);
    const [task,updateTask] = useState("");
    const [description,updateDescription] = useState("");
    const [date,updateDate] = useState("");
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0'); 
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
    const year = currentDate.getFullYear();
    const hours = String(currentDate.getHours()).padStart(2, '0'); 
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const created_at = `${day}/${month}/${year} ${hours}:${minutes}`;
    const [errors,updateErrors] = useState({task:'',description:'',deadline:''})

    function AddTask() {
        if (task === '') {
            updateErrors((prevErrors) => ({ ...prevErrors, task: 'Required Field!',description:'',deadline:''}));
            return; 
        }

        else if (!date) {
            updateErrors((prevErrors) => ({ ...prevErrors, task: '',description:'',deadline: 'Required Field!' }));
            return; 
        }

        else if (description.length <= 5) {
            updateErrors((prevErrors) => ({ ...prevErrors,task: '', description: 'Description must be longer than 5 characters',deadline:'' }));
            return; 
        }

        const newTask = [...tasks, { task: task, description: description, date: date, created_at: created_at, To_modifie: false }];
        updateTasks((prevTasks) => newTask);
        updateErrors((prevErrors) => ({ ...prevErrors, task:'',description:'',deadline:''}));
        resetForm();
    }

    function resetForm(){
        updateTask('');
        updateDescription('');
        updateDate('');
    }


    function DeleteTask(index){
        const updated_tasks = tasks.filter((element, i) => i !== index);
        updateTasks(updated_tasks);
    }

    function handleTask(event){
        updateTask(event.target.value);
    }

    function handleDescription(event){
        updateDescription(event.target.value);
    }

    function handleDate(event){
        updateDate(event.target.value);
    }

    function goUp(index) {
        const p_task = tasks[index];
        let updated_tasks = [...tasks]; 
    
        if (index === 0) {
            const last_task = tasks[tasks.length - 1];
            updated_tasks[0] = last_task;
            updated_tasks[tasks.length - 1] = p_task;
        } else {
           
            const prev_task = tasks[index - 1];
            updated_tasks[index - 1] = p_task;
            updated_tasks[index] = prev_task;
        }
    
        
        updateTasks(updated_tasks);
    }
    
    function goDown(index) {
        const p_task = tasks[index];
        let updated_tasks = [...tasks]; 
    
        if (index === tasks.length - 1) {
            const first_task = tasks[0];
            updated_tasks[0] = p_task;
            updated_tasks[tasks.length - 1] = first_task;
        } else {
            const next_task = tasks[index + 1];
            updated_tasks[index + 1] = p_task;
            updated_tasks[index] = next_task;
        }
    
        updateTasks(updated_tasks);
    }
    
    
    
    

    return(
        <>
           <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 py-10 ">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-3xl">

                    <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">To Do List</h1>

                    {/* Task Form */}
                    <div className="space-y-5">
                        <div>
                            <label htmlFor="task" className="block text-lg font-semibold text-gray-700 dark:text-gray-300">Task Name</label>
                            <input
                                id="task"
                                type="text"
                                className="w-full border rounded-lg p-3 mt-2 bg-gray-100 dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={task}
                                onChange={handleTask}
                                placeholder="Enter your task here"
                            />
                            
                            <p className="text-red-500">{errors.task}</p>
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-lg font-semibold text-gray-700 dark:text-gray-300">Description</label>
                            <textarea
                                id="description"
                                className="w-full border rounded-lg p-3 mt-2 bg-gray-100 dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={description}
                                onChange={handleDescription}
                                placeholder="Describe the task"
                            />
                            <p className="text-red-500">{errors.description}</p>
                        </div>

                        <div>
                            <label htmlFor="date" className="block text-lg font-semibold text-gray-700 dark:text-gray-300">To Be Done At</label>
                            <input
                                id="date"
                                type="date"
                                className="w-full border rounded-lg p-3 mt-2 bg-gray-100 dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={date}
                                onChange={handleDate}
                            />
                            <p className="text-red-500">{errors.deadline}</p>

                            <button
                                className="mx-auto mt-5 bg-blue-600 text-white px-10 py-3 rounded-full shadow-md hover:bg-blue-500 transition duration-300 focus:outline-none"
                                onClick={() => AddTask()}
                            >
                                Add Task
                            </button>
                        </div>
                    </div>

                    {/* Task Table */}
                    <div className="mt-10  max-h-[50vh] overflow-y-auto">
                        <table className="min-w-full table-auto border-collapse rounded-lg shadow-lg bg-white dark:bg-gray-800 dark:border-gray-600">
                            <thead className="bg-gray-200 dark:bg-gray-700">
                                <tr>
                                    <th className="p-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-300 dark:border-gray-600">Task</th>
                                    <th className="p-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-300 dark:border-gray-600">Description</th>
                                    <th className="p-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-300 dark:border-gray-600">To Be Done At</th>
                                    <th className="p-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-300 dark:border-gray-600">Created At</th>
                                    <th className="p-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-300 dark:border-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.map((task, index) => (
                                    <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200">
                                        <td className="p-4 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-300 dark:border-gray-600">
                                            {task.task || "------"}
                                        </td>
                                        <td className="p-4 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-300 dark:border-gray-600">
                                            {task.description || "------"}
                                        </td>
                                        <td className="p-4 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-300 dark:border-gray-600">
                                            {task.date || "------"}
                                        </td>
                                        <td className="p-4 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-300 dark:border-gray-600">{task.created_at}</td>
                                        <td className="p-4 text-center text-sm text-gray-700 dark:text-gray-300 border-b border-gray-300 dark:border-gray-600">
                                            <div className="flex items-center justify-center space-x-3">
                                                <button
                                                    className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg shadow-md transition duration-300"
                                                    onClick={() => DeleteTask(index)}
                                                >
                                                    Delete
                                                </button>
                                                <button
                                                    className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md transition duration-300"
                                                    onClick={() => goUp(index)}
                                                >
                                                    <i className="fa-solid fa-hand-point-up text-yellow-200 text-lg"></i>
                                                </button>
                                                <button
                                                    className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md transition duration-300"
                                                    onClick={() => goDown(index)}
                                                >
                                                    <i className="fa-solid fa-hand-point-down text-yellow-200 text-lg"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </>
    )
}

export default To_Do_List;