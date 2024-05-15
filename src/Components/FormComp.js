import React, { useState } from "react";
import 'bulma/css/bulma.css';
import { useSelector, useDispatch } from 'react-redux';
import { changeName } from '../Slices/formSlice';
import { gql, useQuery } from '@apollo/client';


const GET_CHARACTER = gql`
  query GetCharacter($name: String!) {
    characters(filter: { name: $name }) {
      results {
        name
        image
        episode {
          name
        }}}}`;

function FormComp() {
  const dispatch = useDispatch();

  const { searchTerm } = useSelector((state) => {
    return {      
      searchTerm: state.form.searchTerm,
    };
  });


  const [searchTerm1, setSearchTerm1] = useState("");
  const [numOfCheckbox, setNumOfCheckbox] = useState(0);


  const trans = (searchTerm) => {
    setSearchTerm1(searchTerm);
  };

  const { loading, error, data } = useQuery(GET_CHARACTER, {
    variables: { name: searchTerm1 },    
  });

  const handleDelete = () => {    
    setSearchTerm1("");
    dispatch(changeName(""));
    window.location.reload();
  };

  const highlightMatch = (name) => {
    const regex = new RegExp(searchTerm1, 'gi');
    return name.replace(regex, (match) => `<span style="font-weight: bold;">${match}</span>`);
  };

  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleCheckboxChange = (name) => {
    if (numOfCheckbox === 5 && !selectedCharacters.includes(name)) {
      setShowModal(true);
      return;
    }

    if (selectedCharacters.includes(name)) {
      setSelectedCharacters(selectedCharacters.filter((character) => character !== name));
      setNumOfCheckbox(numOfCheckbox - 1); 
    } else {
      setSelectedCharacters([...selectedCharacters, name]);
      setNumOfCheckbox(numOfCheckbox + 1); 
    }
  };

  const removeFromSelected = (nameToRemove) => {    
    const updatedList = selectedCharacters.filter(name => name !== nameToRemove);
    setSelectedCharacters(updatedList);
    setNumOfCheckbox(numOfCheckbox - 1); 
  };

  function Desc({ characters }) {
    return (
      <p className="selected-char">
        {selectedCharacters.map((character, index) => (
          <span key={index}>
            <div className="selected-char-aaa">
              {character}
            </div>
            <button style={{color:'white'}}onClick={() => removeFromSelected(character)}>x</button> 
          </span>
        ))}
      </p>
    );
  }

  if (loading) return <p style={{ fontSize: '50px', marginTop: '300px',color:'red' }}>LOADING...</p>;
  if (error) return <p>ERROR :</p>;

  return (
    <div className="background-image">
      <Desc characters={selectedCharacters} />
      <div className="search-area">
        <input
          className="input-search"
          onChange={(event) => {            
            dispatch(changeName(event.target.value)); 
          }}
          value={searchTerm}
          placeholder="Please write something..."
        />
        <button className="search-button" onClick={() => trans(searchTerm)}>SEARCH</button>
        <button className="delete-button1" onClick={handleDelete}>REFRESH</button>
      </div>
      <div className="table-area">
        <div className="scrollable-table-container" style={{ display: searchTerm1 === "" ? 'none' : 'block' }}>
          <table className="table is-striped is-fullwidth" >
            <thead>
              <tr>
                <th></th>
                <th style={{ paddingLeft: '0vh' }}>Images</th>
                <th style={{ paddingLeft: '10vh' }}>Name</th>
                <th style={{ paddingLeft: '5vh' }}>Total Episode</th>
              </tr>
            </thead>
            <tbody>
              {data.characters.results.map((character, index) => (
                <tr key={index}>
                  <td><input type="checkbox" onChange={() => handleCheckboxChange(character.name)} checked={selectedCharacters.includes(character.name)}  /></td>
                  <td><img src={character.image} alt={character.name} style={{ height: '60px', width: '60px' }} /></td>
                  <td dangerouslySetInnerHTML={{ __html: highlightMatch(character.name) }} />
                  <td>{character.episode.length} episodes</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-content">
            <div className="notification is-danger">
              <button className="delete" onClick={() => setShowModal(false)}></button>
              You can't select more than 5 characters! Please contact us to select more characters.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FormComp;
