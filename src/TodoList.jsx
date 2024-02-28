import React, {useState, useEffect} from "react";
import "./TodoList.css";
import Icone from "./assets/icon-list.png"

function TodoList(){

  // Controle de memória
  const listaStorage = localStorage.getItem("Lista");

  // Controle de status
  const [lista, setLista]  = useState(listaStorage ? JSON.parse(listaStorage) : []);
  const [novoItem, setNovoItem] = useState("");

  useEffect(() => {
    localStorage.setItem("Lista", JSON.stringify(lista))
  }, [lista])

  // Adiciona tarefa a lista
  function adicionaItem(form){
    form.preventDefault();
    if(!novoItem) {
      return;
    }
    setLista([...lista, { text: novoItem, isCompleted: false}]);
    setNovoItem("");
    document.getElementById("input-entrada").focus();
  }

  // Marca tarefa como realizada
  function clicou(index) {
    const listaAux = [...lista];
    listaAux[index].isCompleted = !listaAux[index].isCompleted;
    setLista(listaAux);
  }

  // Deleta a tarefa
  function deleta(index) {
    const listaAux = [...lista];
    listaAux.splice(index, 1);
    setLista(listaAux);
  }

  // Deleta todas as tarefas
  function deletaTudo() {
    setLista([]);
  }

  return(
    <div>
      <h1>Lista de Tarefas</h1>
      <form onSubmit={adicionaItem}>
        <input
            id="input-entrada"
            type="text"
            value={novoItem}
            onChange={(e) => setNovoItem(e.target.value)}
            placeholder="Adicione sua tarefa :)"
        />
        <button className="add" type="submit">Adicionar</button>
      </form>
      <div className="listaTarefas">
        <div>
          {
            // Caso não existam tarefas
            lista.length < 1 
            ?
            <img width={250} src={Icone} />
            :
            //Caso existam tarefas
            lista.map((item, index) => (
              <div 
              key={index}
              className={item.isCompleted ? "item completo" : "item" }>
                <span onClick={ ()=>clicou(index) }>{item.text}</span>
                <button onClick={ () => {deleta(index)} }  className="del">Deletar</button>
              </div>  
          ))  
          }
          {
            lista.length > 0 && 
            <button onClick={() => deletaTudo()} className="deleteAll">Deletar Todos</button>
          }
        </div>
      </div>
    </div>
   ) 
}

export default TodoList