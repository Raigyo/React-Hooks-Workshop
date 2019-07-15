# Workshop: React Hooks

![Becode logo](https://raw.githubusercontent.com/Raigyo/react-character-manager/master/img/becode-logo.png)



*Juillet 2019*

> 🔨 Workshop: [React Hooks](https://github.com/bovealexandre/React-Hooks-Workshop) par Matthieu Jasselette & Alexandre Bove


* * *

Demo on [Github page](https://raigyo.github.io/React-Hooks-Workshop/)

## Installation

Pour installer react, lancez simplement la commande
```bash
npm install -g create-react-app
```

pour créer un nouveau projet
```
create-react-app <name-of-app>
```

remplacez <name-of-app> par le nom du fichier dans lequel vous voulez le projet.

Pour faire tourner l'app, rentrez dans le fichier nouvellement créé
```
cd <name-of-app>
```
et lancez l'app avec
```
npm start
```

Pour les besoins du projet, installez aussi uuid
```
npm install uuid --save
```

## Début du workshop
Ouvrez votre ide habituel et effacez tout le contenu d'App.js

### 1. Création de votre premier hook
On commence par importer react et le useState au début du fichier et on définit une fonction anonyme à exporter.
```javascript
import React, { useState } from 'react';

export default () => {
  //your hooks go here
  return(
    // your html goes here
  )
}
```

Voilà, vous êtes prêts à écrire votre premier hook react.

Pensez à créer un objet avec un titre à passer en argument du hook.
```javascript
const [state, setState] = useState();
```
Voilà vous avez créé un hook, bravo ! Par contre personne ne peut encore le voir donc il va falloir *l'injecter* dans votre html à l'aide des `{ }`.
Dans le `return()` de votre fonction, créez une `<div>` et à l'intérieur de cette `<div>`, *injectez* le titre de votre tâche.

<details>
<summary>Solution</summary>

```javascript
import React, { useState } from 'react';

export default () => {
  const firstTask = {
    title: "Ecrire son premier hooks"
  }
  const [tasks, setTasks] = useState(firstTask);

  return(
    <div>
      {task.title}
    </div>
  )
}
```
</details>

Si votre app tourne ça devrait vous afficher le titre donné à votre objet dans votre navigateur. C'est pas mal mais on vous a promis une liste de tâches donc changeons 2-3 choses pour afficher une vraie liste.

D'abord changez votre objet en un tableau contenant plusieurs objets similaires ayant pour structure
```javascript
{id : uuid.v4(),
title: "le nom de tâche que vous voulez"}
```
(pensez à importer uuid)
Ensuite, utilisez l'itérateur `.map()` dans le `return()`. Affichez le titre de chaque tâche dans une `div` et assignez-y l'id comme `key`.
<details>
<summary>Solution</summary>

```javascript
import React, { useState } from 'react';
import uuid from 'uuid';

export default () => {
  const firstTask = [{
    id: uuid.v4(),
    title: "Ecrire son premier hooks"
  },
  {
    id: uuid.v4(),
    title: "Ajouter une tâche"    
  }];
  const [tasks, setTasks] = useState(firstTask);

  return(
    <>
      { tasks.map(task => (
        <div key={task.id}>
          {task.title}
        </div>
        )
      )}
    </>
  )
}
```
</details>

### 2. Ajout / Suppression
Maintenant qu'on sait afficher une liste de tâches, il faudrait pouvoir la complèter.

Créez un nouveau fichier javascript au même niveau qu'App.js puis importez-y react et le useState.

Procédez de la même façon que pour l'app mais en passant les `props` en argument à votre fonction et affichez un formulaire dans le `return()` qui vous permettra de saisir l'intitulé de la nouvelle tâche.

<details>
<summary>Solution</summary>

```javascript
import React, { useState } from 'react';

export default (props) => {

  const [newTask, setNewTask] = useState('');

    return(
    <>
      <form onSubmit={onSubmit}>
        <input type="text" value={newTask} onChange={onChange}></input>
        <input type="submit" value="Add task"></input>
      </form>
    </>
  )
}
```
</details>

Une fois cela fait, retournez dans App.js pour y afficher ce que vous venez de créer. Importez votre component

```javascript
import AddTask from './AddTask';
```
puis ajoutez le à vos balises HTML dans le `return()` avant le `tasks.map()`.
```javascript
<AddToDo addTask={addTask}/>
```

Votre component AddTask est maintenant un enfant de votre component App et peut donc recevoir ses *props* (ce qu'on a mis en argument un peu plus haut).

Les props sont bien pratiques car on peut s'en servir pour passer beaucoup de choses d'un component à un autre. Dans notre cas, on voudrait passer une fonction `addTask` qui permettra de changer le state de notre App.

<details>
<summary>Solution</summary>

```javascript
const addTask = (newTask) => {
  const item = {
    id: uuid.v4(),
    title: newTask
  }
  setTasks([...tasks, item])
}
```
</details>

Maintenant, retournons dans le component AddTask où vous allez avoir besoin d'une fonction `onChange()` qui se chargera de mettre à jour dans le state les données saisies dans le formulaire et d'une `onSubmit()` qui gèrera leur envoi.

<details>
<summary>Solution </summary>

```javascript
//AddTask.js
import React, { useState } from 'react';

export default (props) => {

  const [newTask, setNewTask] = useState('');

  const onChange = (e) => {
    setNewTask(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    props.addTask(newTask);
    setNewTask('');
  }

  return(
    <>
      <form onSubmit={onSubmit}>
        <input type="text" value={newTask} onChange={onChange}></input>
        <input type="submit" value="Add task"></input>
      </form>
    </>
  )
}

//App.js
import React, { useState } from 'react';
import uuid from 'uuid';

import AddToDo from './AddToDo.js';

export default () => {
  const firstTask = [{
    id: uuid.v4(),
    title: "Ecrire son premier hooks"
  },
  {
    id: uuid.v4(),
    title: "Ajouter une tâche"
  }];
  const [tasks, setTasks] = useState(firstTask);

  const addTask = (newTask) => {
    const item = {
      id: uuid.v4(),
      title: newTask
    }
    setTasks([...tasks, item])
  }

  return(
    <>
      <AddToDo addTask={addTask}/>
      { tasks.map(task => (
        <div key={task.id}>
          {task.title}
        </div>
        )
      )}
    </>
  )
}
```
</details>

Pour la suppression c'est *un peu plus simple*, il faut écrire une fonction qui en prenant un id comme argument va retourner le tableau de tâches actuels moins celle à supprimer.
<details>
<summary>Solution</summary>

```javascript
import React, { useState } from 'react';
import uuid from 'uuid';

import AddToDo from './AddToDo.js';

export default () => {
  const firstTask = [{
    id: uuid.v4(),
    title: "Ecrire son premier hooks"
  },
  {
    id: uuid.v4(),
    title: "Ajouter une tâche"
  }];
  const [tasks, setTasks] = useState(firstTask);

  const addTask = (newTask) => {
    const item = {
      id: uuid.v4(),
      title: newTask
    }
    setTasks([...tasks, item])
  }

  const delTask = (id) => {
    setTasks([...tasks.filter(task => task.id !== id)])
  }

  return(
    <>
      <AddToDo addTask={addTask}/>
      { tasks.map(task => (
        <div key={task.id}>
          {task.title}          
          <button onClick={()=>delTask(task.id)}>X</button>
        </div>
        )
      )}
    </>
  )
}
```
</details>

### 3. Propsons nous dans les bois...
Maintenant qu'on a une vraie app qui nous permet d'afficher, ajouter et supprimer des tâches, il est temps de faire un peu de ménage. On a parlé brièvement des props et des components plus tôt dans ce workshop.

Un des avantages principaux de l'utilisation de components en développement web est de pouvoir fractionner la circulation d'information et permettre de mettre localement à jour des éléments au sein d'une page sans entraîner de modification sur le reste de celle-ci.
```javascript
<AddToDo addTask={addTask}/>
//Exemple d'appel d'un component enfant
```
L'usage de props permet de faire passer de l'information vers un component enfant qui pourra alors s'en servir. On peut propser des states ou des fonctions.
```javascript
props.addTask(newTask);
//Exemple d'utilisation d'un props
```
Afin de profiter au mieux de cette logique de components, créons un nouveau fichier que nous allons importer dans App.

Dans le `return()` de notre App, effacez le `tasks.map()` et appelez-y à la place votre nouveau component en propsant le state `tasks`.

Dans le `return()` ce nouveau component, mappez le props et affichez les titres.
<details>
<summary>Solution</summary>

```javascript
//App.js
import React, { useState } from 'react';
import uuid from 'uuid';

import AddToDo from './AddToDo.js';
import TaskMap from './TaskMap.js';

export default () => {
  const firstTask = [{
    id: uuid.v4(),
    title: "Ecrire son premier hooks"
  },
  {
    id: uuid.v4(),
    title: "Ajouter une tâche"
  }];
  const [tasks, setTasks] = useState(firstTask);

  const addTask = (newTask) => {
    const item = {
      id: uuid.v4(),
      title: newTask
    }
    setTasks([...tasks, item])
  }

  const delTask = (id) => {
    setTasks([...tasks.filter(task => task.id !== id)])
  }

  return(
    <>
      <AddToDo addTask={addTask}/>
      <TaskMap tasks={tasks}/>
    </>
  )
}

//TaskMap.js
import React from 'react';

export default (props) => {
  return(
    <>
      {props.tasks.map(task => (
        task.title
      ))}
    </>
  )
}

```
</details>
Ne nous arrêtons pas en si bon chemin. Créons encore un nouveau component qui se chargera uniquement d'afficher le titre d'une tâche et qui sera appelé par le component auquel nous venons d'assigner la responsabilité du mappage.

Une fois celà fait, il ne reste plus qu'à propser la fonction de suppression en bout de chaîne afin que chaque tâche puisse décider de son propre sort.
<details>
<summary>Solution</summary>

```javascript
//App.js
import React, { useState } from 'react';
import uuid from 'uuid';

import AddToDo from './AddToDo.js';
import TaskMap from './TaskMap.js';

export default () => {
  const firstTask = [{
    id: uuid.v4(),
    title: "Ecrire son premier hooks"
  },
  {
    id: uuid.v4(),
    title: "Ajouter une tâche"
  }];
  const [tasks, setTasks] = useState(firstTask);

  const addTask = (newTask) => {
    const item = {
      id: uuid.v4(),
      title: newTask
    }
    setTasks([...tasks, item])
  }

  const delTask = (id) => {
    setTasks([...tasks.filter(task => task.id !== id)])
  }

  return(
    <>
      <AddToDo addTask={addTask}/>
      <TaskMap tasks={tasks} onClick={delTask}/>
    </>
  )
}

//TaskMap.js
import React from 'react';

import TaskItem from './TaskItem.js';

export default (props) => {
  return(
    <>
      {props.tasks.map(task => (
        <TaskItem task={task} key={task.id} onClick={props.onClick}/>
      ))}
    </>
  )
}

//TaskItem
import React from 'react';

export default (props) => {
  return(
    <>
      <h2>{props.task.title}</h2>
      <button onClick={()=>props.onClick(props.task.id)}>x</button>
    </>
  )
}
```
</details>

Il reste encore une chose à rajouter, des cases à cocher pour faire une vraie checklist.
<details>
<summary>Solution</summary>
Je vous laisse chercher la solution, il est tard et j'ai sommeil ;)

Pensez juste à ajouter un boolean à vos objets et propsez une fonction qui gèrera la transition des inputs.
</details>

### 4. Utilisation du hooks useEffect
Maintenant qu'on a une app avec une belle checklist il ne manque plus qu'une seule chose, un compteur qui permet de savoir combien de tâches ont déjà été réalisées.

Pour celà, on va se servir d'un nouveau hook, le *useEffect*. Ce hook permet d'effectuer des actions prédéfinies à des moments clés de la vie d'un component, les *life cycles*. C'est ce qui permet de ne mettre à jour que des portions de votre page et rend ce mode de développement aussi efficace.
```javascript
useEffect(()=>{/*votre fonction*/}, [/*un tableau d'éléments à surveiller*/])
```
Commencez par importer `useEffect` à la suite de `useState`.

Il va vous falloir un nouveau state qui gardera une trace de nombre de tâches cochées.
<details>
<summary>Solution</summary>

```javascript
const [tasksRemaining, setTasksRemaining] = useState(0)
```
</details>

Afin de suivre l'exécution des tâches, utilisez le useEffect pour setState ce nouveau state à chaque changement.

<details>
<summary>Solution</summary>

```javascript
import React, { useState, useEffect } from 'react';
import uuid from 'uuid';

import AddToDo from './AddToDo.js';
import TaskMap from './TaskMap.js';

export default () => {
  const firstTask = [{
    id: uuid.v4(),
    title: "Ecrire son premier hooks"
  },
  {
    id: uuid.v4(),
    title: "Ajouter une tâche",
    isCompleted : false
  },
  {
    id: uuid.v4(),
    title: "Supprimer une tâche",
    isCompleted : false
  },
  {
    id: uuid.v4(),
    title: "Valider une tâche",
    isCompleted : false
  }];
  const [tasks, setTasks] = useState(firstTask);
  const [tasksRemaining, setTasksRemaining] = useState(0)

  const addTask = (newTask) => {
    const item = {
      id: uuid.v4(),
      title: newTask
    }
    setTasks([...tasks, item])
  }

  const delTask = (id) => {
    setTasks([...tasks.filter(task => task.id !== id)])
  }

  const toggleCompletion = (id) => {
    setTasks(tasks.map(task =>{
      if(task.id === id){
        task.isCompleted = !task.isCompleted
      }
      return task
    }));
  }

  useEffect(() => { setTasksRemaining(tasks.filter(task => task.isCompleted).length) }, [tasks]);

  return(
    <>
      <AddToDo addTask={addTask}/>
      <h2>{tasksRemaining} / {tasks.length}</h2>
      <TaskMap tasks={tasks} onClick={delTask} toggleCompletion={toggleCompletion}/>
    </>
  )
}
```
</details>

Voilà, c'est terminé. Je vais dormir.
