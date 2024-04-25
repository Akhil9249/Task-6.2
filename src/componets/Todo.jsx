import React, { useEffect, useState } from "react";
import "./Todo.css";
import { Head } from "./Head/Head";
import { List } from "./List/List";

const getLocalItem = ()=>{
    let list = localStorage.getItem('list')
    
    if(list){
        return JSON.parse(localStorage.getItem('list'))
    }else{
        return []
    }
}

export const Todo = () => {
    const [inputText, setInputText] = useState("");
    const [textIndex, setTextIndex] = useState(0);
    const [editText, setEditText] = useState("");
    const [allData, setAllData] = useState(getLocalItem());
    const [show, setShow] = useState(false);

    useEffect(()=>{
        localStorage.setItem('list',JSON.stringify(allData))
    },[allData])

    const handleChange = (event) => {
        setInputText(event.target.value);
    };
    const editHandleChange = (event) => {
        setEditText(event.target.value);
    };

    const dataStore = () => {
        let result = [...allData, { text: inputText, crossLine: false }];
        setAllData(result);
        setInputText("");
    };

    const dataStoreByEnter = () => {
        let result = [...allData, inputText];
        setAllData(result);
        setInputText("");
    };

    const editDataStore = () => {
        let result = [...allData];
        result[textIndex].text = editText;
        setAllData(result);
        setEditText("");
        setShow((prev) => !prev);
    };

    const Delete = (value) => {
        let result = allData.filter((data, index) => index !== value);
        setAllData(result);
    };

    const edit = (value) => {
        setTextIndex(value);
        setShow((prev) => !prev);
        let result = allData.find((data, index) => index == value);
        setEditText(result.text);
    };
    const editDataCancel = () => {
        setShow((prev) => !prev);
        setEditText("");
    };
    const textMark = (value) => {
        setTextIndex(value);
        let result = [...allData];
        let cross = result[value];
        cross.crossLine ? (result[value].crossLine = false) : (result[value].crossLine = true);
        setAllData(result);
    };

    return (
        <div className="todo-main-container">
            <h3 className="head-section">Todo List</h3>
            <Head
                handleChange={handleChange}
                dataStore={dataStore}
                inputText={inputText}
                dataStoreByEnter={dataStoreByEnter}
            />
            <List
                allData={allData}
                Delete={Delete}
                edit={edit}
                show={show}
                editHandleChange={editHandleChange}
                editText={editText}
                editDataStore={editDataStore}
                editDataCancel={editDataCancel}
                textMark={textMark}
            />
        </div>
    );
};
