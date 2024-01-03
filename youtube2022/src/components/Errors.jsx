import React, { useState } from 'react';
import { Button, TextField, IconButton,Select } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ZamSetsForm = ({ errors, onErrorsChange, onAddErros, onRemoveErros }) => {

    const handleZamSetChange = (index, field, value) => {
        const newZamSets = errors.map((zamSet, i) => {
          if (i === index) {
            return { ...zamSet, [field]: value };
          }
          return zamSet;
        });
        onErrorsChange(newZamSets);
      };

 

//   const removeZamSet = (index) => {
//     const newZamSets = zamSets.filter((_, i) => i !== index);
//     setZamSets(newZamSets);
//   };

  // Пример функции для сохранения данных (просто выводит текущий стейт в консоль)
  const saveZamSets = () => {
    console.log(zamSets);
    // Здесь вы можете обработать сохранение zamSets, например, отправить их на сервер
  };

  return (
    <div>
      {errors.map((zamSet, index) => (
        <div key={index}>
          <TextField 
            style={{ marginTop: '15px' }} 
            label="Number"
            value={zamSet.number}
            onChange={(e) => handleZamSetChange(index, 'number', e.target.value)}
          />
          <TextField
            style={{ marginTop: '15px' }} 
            label="Percentage Main"
            value={zamSet.percentage_main}
            onChange={(e) => handleZamSetChange(index, 'percentage_main', e.target.value)}
          />
          <TextField
            style={{ marginTop: '10px' }} 
            label="Percentage Satellite"
            value={zamSet.percentage_satellite}
            onChange={(e) => handleZamSetChange(index, 'percentage_satellite', e.target.value)}
          />
         
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={zamSet.status}
            label="Age"
            onChange={(e) => handleZamSetChange(index, 'status', e.target.value)}
            />
          <IconButton onClick={() => onRemoveZamSet(index)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ))}
      <Button style={{ margin: '0 5px' }} onClick={onAddZamSet}>Add Zam Set</Button>
      <Button style={{ margin: '0 5px' }} onClick={saveZamSets}>Save</Button>
    </div>
  );
};

export default ZamSetsForm;
