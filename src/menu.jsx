import React, { useState } from "react";
import To_Do_List from "./apps/To-do-list";
import Tic_tac_toc from "./apps/tic-tac-toc";
import ToDoListImg from "./assets/To-Do-List.png";
import TicTacToeImg from "./assets/Tic-Tac-Toe.png";

function Menu() {
    const [selectedApp, setSelectedApp] = useState(null); 

    const apps = [
        { title: "To Do List", component: <To_Do_List />, img: ToDoListImg },
        { title: "Tic-Tac-Toe", component: <Tic_tac_toc />, img: TicTacToeImg },
    ];

   
    function chosenApp(index) {
        setSelectedApp(apps[index].component); 
    }

    return (
        <div className="m-5">
            {!selectedApp ? (
                <>
                    <h1 className="text-3xl font-bold text-center mb-5">Frivlly</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {apps.map((app, index) => (
                            <div key={index} className="text-center">
                                <img
                                    src={app.img}
                                    className="h-[35vh] w-full rounded-lg mb-3 hover:cursor-pointer hover:opacity-70"
                                    alt={app.title}
                                    onClick={() => chosenApp(index)} 
                                />
                                <h1 className="text-lg sm:text-xl font-bold">{app.title}</h1>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
              
                <div>
                    <button
                        className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-600 mb-5"
                        onClick={() => setSelectedApp(null)} 
                    >
                        Back to Menu
                    </button>
                    {selectedApp}
                </div>
            )}
        </div>
    );
}

export default Menu;
