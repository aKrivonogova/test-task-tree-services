// массив услуг 

import servicesCollection from "./servicesCollection";
import './style.css'; 

const NODE = 1; 
const TREE_SERVICES_CONTAINER = 'tree-services-container'; 

        // создание элемента 
        function createElement(elementSelector){
            return document.createElement(elementSelector)
        }

        // сортировка коллекции по полю 
        function sortCollectionByField(dataCollection, field){
            return dataCollection.sort((collectionItemA, collectionItemB) => collectionItemA[field] - collectionItemB[field])
        }

        // фильтрация коллекции по условию 
        function filterCollectionByCondition(dataCollection, fieldA, conditionElement){
            return dataCollection.filter(collectionItem => collectionItem[fieldA] === conditionElement); 
        }

        // Добавление нового элемента в DOM 
        function appendChildToContainer(containerElement, childElement){
            containerElement.appendChild(childElement); 
        }

        function buildServicesList(servicesCollection, parentId, listElementContainer){
           // создать первый список
            const elementsList = createElement('ul'); 
            // Отфильтровать корневые узлы 
            let filteredServicesCollection = filterCollectionByCondition(servicesCollection, 'head',  parentId);
            // Отсортировать по возрастанию поля 
            let sorterServicesCollection = sortCollectionByField(filteredServicesCollection, 'sorthead');
         
            sorterServicesCollection.forEach((serviceItem) => {
                // Создание элемента списка 
                const listItem = createElement('li');
                // Вывод информации
                listItem.textContent = `${serviceItem.name} - (${serviceItem.price})`;
                // Добавление элемента в список 
                appendChildToContainer(elementsList,listItem)
                // Если это узел 
                if(serviceItem.node === NODE){
                    // Повторить функцию 
                    buildServicesList(servicesCollection,serviceItem.id,listItem)
                }
            });
            // Добавить список в контейнер 
            appendChildToContainer(listElementContainer,elementsList)
            return elementsList;
        }


 const listElementContainer = document.getElementById(TREE_SERVICES_CONTAINER);

buildServicesList(servicesCollection.services, null, listElementContainer);
