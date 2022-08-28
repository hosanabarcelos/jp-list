import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';
import { Task } from 'src/app/model/task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    taskObj: Task = new Task();
    taskArr: Task[] = [];

    addTaskValue: string = '';
    editTaskValue: string = '';

    constructor(private crudService: CrudService) { }

    ngOnInit(): void {
        this.addTaskValue = '';
        this.editTaskValue = '';
        this.taskObj = new Task();
        this.taskArr = [];
        this.getAllTask();
    }

    getAllTask() {
        this.crudService.getAllTask().subscribe(res => {
            this.taskArr = res;
        }, err => {
            alert('Ocorreu um erro inesperado e não foi possível buscar a lista de tarefas. 😢');
        });
    }

    addTask() {
        this.taskObj.task_name = this.addTaskValue;
        this.crudService.addTask(this.taskObj).subscribe(res => {
            this.ngOnInit();
            this.addTaskValue = '';
        }, err => {
            alert(err);
        });
    }

    editTask() {
        this.taskObj.task_name = this.editTaskValue;
        this.crudService.editTask(this.taskObj).subscribe(res => {
            this.ngOnInit();
        }, err => {
            alert('Ocorreu um erro inesperado e não foi possível editar a tarefa. 😢');
        });
    }

    deleteTask(etask: Task) {
        this.crudService.deleteTask(etask).subscribe(res => {
            this.ngOnInit();
        }, err => {
            alert('Ocorreu um erro inesperado e não foi possível excluir a tarefa. 😢');
        });
    }

    call(etask: Task) {
        this.taskObj = etask;
        this.editTaskValue = etask.task_name;
    }

}
