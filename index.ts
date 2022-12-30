#! /usr/bin/env node
import inquirer from "inquirer";


function welcome(){
    console.clear()
    console.log("***********************\n")
    console.log("Welcome to To do list\nHere you can create todo lists and work with them\n")
    console.log("***********************\n")
}

let listTitle: string[] = []
let listDescription: string[]= []
let status: string[] = []
let fwhile = true

async function todo() {
    welcome()
    let ask_todo = await inquirer.prompt([
    {
        name: "option_todo",
        type: "list",
        choices: ["Add Task", "View Task", "Update Task", "Remove Task", "Complete Task", "Task Status", "Exit"],
        message: "What you want to do: "
    }
    ])
    if(ask_todo.option_todo == "Add Task"){
        console.clear()
        welcome()
        console.log("*** Add a Task ***\n")
        let add_todo = await inquirer.prompt([
            {
                name: "add_title",
                type: "input",
                message: "Title: "
            },
            {
                name: "add_description",
                type: "input",
                message: "Description (optional): ",
                default(){
                    return " "
                }
            }
        ])
        let add_meTitle = add_todo.add_title
        listTitle.push(add_meTitle)
        let add_meDescription = add_todo.add_description
        listDescription.push(add_meDescription)
        status.push("Pending")
    }
    else if(ask_todo.option_todo=="View Task"){
        do{
        console.clear()
        welcome()
        console.log("*** Your Tasks ***\n")
        let view_todo = await inquirer.prompt([
            {
                name: "view_todo",
                type: "rawlist",
                choices:[...listTitle],
                message: "Select Task that you want to see: ",
            },
        ])
        console.clear()
        welcome()
        console.log("*** Your Tasks ***\n")
        for(let j = 0; j <= listTitle.length;j++){
            if(view_todo.view_todo == listTitle[j]){
                console.log("Title: "+listTitle[j])
                console.log("Description: "+listDescription[j])
                console.log("Status: "+status[j])
            }
        }
        await back()
    }while(back_to)
    }
    else if(ask_todo.option_todo == "Update Task"){
        console.clear()
        welcome()
        console.log("*** Update Tasks ***\n")
        let update_todo = await inquirer.prompt([
            {
                name: "update_todof",
                type: "rawlist",
                choices:[...listTitle],
                message: "Select Task that you want to Update: "
            }
        ])
        for(let k = 0; k <= listTitle.length;k++){
            if(update_todo.update_todof == listTitle[k]){
                let udate_title = await inquirer.prompt([
                    {
                        name:"title_update",
                        type:"input",
                        message: "Update your Title: ",
                        default(){
                            return listTitle[k]
                        }
                    },
                    {
                        name: "description_update",
                        type: "input",
                        message: "Update your Description: ",
                        default(){
                            return listDescription[k]
                        }
                    }
                ])
                listTitle[k] = udate_title.title_update
                listDescription[k] = udate_title.description_update
                status[k] = "Pending"
            }
        }
    }
    else if(ask_todo.option_todo == "Remove Task"){
        console.clear()
        welcome()
        console.log("*** Remove Tasks ***\n")
        let remove_todo = await inquirer.prompt([
            {
                name: "remove_todof",
                type: "rawlist",
                choices:[...listTitle],
                message: "Select Task that you want to Remove: "
            }
        ])
        for(let f = 0; f <= listTitle.length;f++){
            if(remove_todo.remove_todof == listTitle[f]){
                let reslutTitle = listTitle[f]
                let reslutDescription = listDescription[f]
                let resultStatus = status[f]
                let remove_title = await inquirer.prompt([
                    {
                        name: "remove",
                        type: "confirm",
                        message: "Do you want to remove this task: "
                    }
                ])
                if(remove_title.remove == true){
                    const indexTitle = listTitle.indexOf(reslutTitle)
                    const indexStatus = status.indexOf(resultStatus)
                    const idnexDescription = listDescription.indexOf(reslutDescription)
                    if(indexTitle > -1 && idnexDescription> -1 && indexStatus > -1){
                        listTitle.splice(indexTitle, 1)
                        status.splice(indexStatus, 1)
                        listDescription.splice(idnexDescription, 1)
                    }
                }
            }
        }
    }
    else if(ask_todo.option_todo == "Complete Task"){
        console.clear()
        welcome()
        console.log("*** Complete Tasks ***\n")
        let complete_todo = await inquirer.prompt([
            {
                name: "complete_todof",
                type: "rawlist",
                choices:[...listTitle],
                message: "Select Task that you want to Remove: "
            }
        ])
        for(let z = 0; z <= listTitle.length; z++){
            if(complete_todo.complete_todof == listTitle[z]){
                let complete_list = await inquirer.prompt([
                    {
                        name: "list_complete",
                        type: "confirm",
                        message: "Do you have complete this task: "
                    }
                ])
                if(complete_list.list_complete == true){
                    status[z] = "Completed"
                }
            }
        }
    }
    else if(ask_todo.option_todo=="Task Status"){
        do{
        console.clear()
        welcome()
        console.log("*** Your Task Status ***\n")
        for(let l = 0; l<listTitle.length; l++){
            console.log(`${l+1}) ${listTitle[l]}     Status: "${status[l]}"\n`)
          }
        await back()
    }while(back_to)
    }
    else if(ask_todo.option_todo == "Exit"){
        fwhile = false
    }
}

let back_to = false
async function back() {
    let back_todo = await inquirer.prompt([
        {
            name:"back_every",
            type: "confirm",
            message: "Back to todo: "
        }
    ])
    if(back_todo.back_every == true){
        back_to = false
    }
    else{
        back_to = true
    }
}

do{
 await todo()
}while(fwhile)