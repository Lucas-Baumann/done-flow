import * as SQLite from "expo-sqlite";

export type Task = {
  text: string;
  completed: boolean;
  id: number;
  addDate: string;
  editDate: string | null;
  deletedTask: string | null;
  restoreDate: string | null;
  idcategory: number | null;
  categoryName: string | null;
};

const dbtasks = SQLite.openDatabaseSync("tasks.db");
export async function creatTableTarefas() {
  await dbtasks.execAsync(`
        CREATE TABLE IF NOT EXISTS tarefas (
        id INTEGER PRIMARY KEY NOT NULL,
        text TEXT NOT NULL,
        completed BOOLEAN DEFAULT FALSE,
        addDate TEXT NOT NULL,
        editDate TEXT NULL,
        deletedTask TEXT NULL,
        restoreDate TEXT NULL,
        idcategory INTEGER NULL);
    `);
}



export async function addTask(text: string, Value: number | null) {
  await dbtasks.runAsync(
    "INSERT INTO tarefas (text, addDate,idcategory) VALUES (?,?,?)",
    text,
    new Date().toISOString(),
    Value,
  );
}

export async function getTask(): Promise<Task[]> {
  const tasks = await dbtasks.getAllAsync<any>(
    "SELECT * FROM tarefas WHERE deletedTask IS NULL",
  );
  const categories = await dbcategories.getAllAsync<any>(
    "SELECT * FROM categorias",
  );
  const categoryMap = new Map(categories.map((c) => [c.id, c.text]));

  return tasks.map((task) => ({
    ...task,
    completed: task.completed === 1,
    categoryName: task.idcategory
      ? (categoryMap.get(task.idcategory) ?? null)
      : null,
  }));
}

export function deleteTask(id: number) {
  dbtasks.runSync(
    "UPDATE tarefas SET deletedTask = ? WHERE id = ?",
    new Date().toISOString(),
    id,
  );
}

export function completeTask(id: number, completed: boolean) {
  dbtasks.runSync(
    "UPDATE tarefas SET completed = ? WHERE id = ?",
    completed ? 1 : 0,
    id,
  );
}

export function editTask(id: number, text: string, ValueEdit: number | null) {
  dbtasks.runSync(
    "UPDATE tarefas SET text = ?, editDate = ?, idcategory = ? WHERE id = ?",
    text,
    new Date().toISOString(),
    ValueEdit,
    id,
  );
}

export async function getDeletedTask(): Promise<Task[]> {
  const tasks = await dbtasks.getAllAsync<any>(
    "SELECT * FROM tarefas WHERE deletedTask IS NOT NULL",
  );
  return tasks.map((task) => ({
    ...task,
    completed: task.completed === 1,
  }));
}

export function restoreTask(id: number) {
  dbtasks.runSync(
    "UPDATE tarefas SET deletedTask = NULL, restoreDate = ? WHERE id = ?",
    new Date().toISOString(),
    id,
  );
}

export function permanentDeleteTask(id: number) {
  dbtasks.runSync("DELETE FROM tarefas WHERE id = ?", id);
}

export type Categories = {
  text: string;
  id: number;
  addDate: string;
  editDate: string | null;
  deletedTask: string | null;
};

const dbcategories = SQLite.openDatabaseSync("categories.db");

export async function createTableCategorias() {
  await dbcategories.execAsync(`
        CREATE TABLE IF NOT EXISTS categorias (
        id INTEGER PRIMARY KEY NOT NULL,
        text TEXT NOT NULL,
        addDate TEXT NOT NULL,
        editDate TEXT NULL,
        deleteDate TEXT NULL);
    `);
}

export async function getCategories(): Promise<Categories[]> {
  return await dbcategories.getAllAsync<any>(
    "SELECT * FROM categorias WHERE deleteDate IS NULL",
  );
}

export async function addCategories(text: string) {
  await dbcategories.runAsync(
    "INSERT INTO categorias (text, addDate) VALUES (?,?)",
    text,
    new Date().toISOString(),
  );
}

export function editCategories(id: number, text: string) {
  dbcategories.runSync(
    "UPDATE categorias SET text = ?, editDate = ? WHERE id = ?",
    text,
    new Date().toISOString(),
    id,
  );
}

export function deleteCategories(id: number) {
  dbcategories.runSync(
    "UPDATE categorias SET deleteDate = ? WHERE id = ?",
    new Date().toISOString(),
    id,
  );
}

export async function initDatabase() {
    await Promise.all([creatTableTarefas(), createTableCategorias()])
}